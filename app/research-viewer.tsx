"use client";

import { useEffect, useRef, useState } from "react";
import { Activity, ArrowUpRight, CalendarDays, ChartNoAxesCombined, ClipboardList, Clock3, Download, FileText, FolderOpen, LayoutDashboard, Menu, Upload } from "lucide-react";
import {
  bundledPackageUrl, comparePackages, decodeBase64, indexPath, maxPackageBytes, migrationPath, PackageError, readPackage, registryPath, targetLink,
} from "@/lib/research-package";
import type { ResearchPackage } from "@/lib/research-package";
import { ReviewEvidence, OpenResearchChecks, WorkflowEvidence, WeeklyCoverage } from "./research-context";
import { CalculationContext } from "./calculation-context";
import { MacroContext } from "./macro-context";
import { display, isCalculation, readCalculation } from "@/lib/research-context";
import { publicUrl, ResearchDocument } from "./research-document";
import { EventRegister } from "./event-register";
import { EventStatuses, ResearchStatus, coverageTone } from "./research-status";
import { ChallengerPanel } from "./challenger-panel";
import { LocalPackageConflict, readLocalPackage, writeLocalPackage } from "@/lib/research-package-cache";

type Lang = "ru" | "en";
type Active = { text: string; data: ResearchPackage; selectedAt?: string };
type Preview = Active & { name: string; same: boolean };
const sections = [
  ["overview", "Обзор", "Overview"],
  ["challenger", "Challenger", "Challenger"],
  ["daily", "Ежедневные", "Daily reports"],
  ["weekly", "Еженедельные", "Weekly reports"],
  ["research", "Исследования", "Research"],
  ["events", "Реестр событий", "Event registry"],
  ["calendar", "Календарь событий", "Event calendar"],
  ["history", "История расчётов", "Calculation history"],
  ["macro", "Макроанализ", "Macro analysis"],
] as const;
type Section = typeof sections[number][0];
const sectionIcons = {
  overview: LayoutDashboard, challenger: Activity, daily: FileText, weekly: CalendarDays,
  research: FolderOpen, events: ClipboardList, calendar: CalendarDays, history: Clock3, macro: ChartNoAxesCombined,
};
const emptyFilters = { period: "", origin: "", status: "", priority: "" };

function reportCompleteness(status: string | null | undefined) {
  return status?.match(/\b(ARCHIVED_PARTIAL|PARTIAL|INCOMPLETE|COMPLETE)\b/)?.[0] ?? "UNKNOWN";
}

function restoreFocus(element: HTMLElement | null | undefined) {
  requestAnimationFrame(() => {
    if (element?.isConnected) element.focus();
  });
}
const errorLabels = {
  size: ["Пакет превышает лимит 10 МБ.", "The package exceeds the 10 MB limit."],
  json: ["Не удалось прочитать JSON.", "Could not read the JSON."],
  schema: ["Формат или версия пакета не поддерживается.", "The package format or version is unsupported."],
  hash: ["Контрольная сумма не совпадает.", "The checksum does not match."],
  files: ["Нарушен заявленный состав файлов.", "The declared file inventory does not match."],
  registry: ["Некорректный идентификатор или даты события.", "An event has an invalid identity or dates."],
  history: ["Нарушена история событий или ревью.", "An event or review history failed validation."],
  stale: ["Коммит пакета старше активного коммита.", "The package commit predates the active commit."],
  conflict: ["Обнаружен конфликт идентификаторов или версий.", "An identity or version conflict was found."],
} as const;

function sectionFromHash(): Section {
  const hash = window.location.hash.slice(1);
  return sections.find(([key]) => key === hash)?.[0] ?? "overview";
}

function download(name: string, body: BlobPart, mime = "application/json") {
  const url = URL.createObjectURL(new Blob([body], { type: mime }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 30_000);
}

function csvCell(value: string) {
  const safe = /^\s*[=+@-]|^[\t\r\n]/.test(value) ? "'" + value : value;
  return '"' + safe.replaceAll('"', '""') + '"';
}

async function loadBundled(): Promise<Active> {
  const response = await fetch(bundledPackageUrl);
  if (!response.ok || !response.body) throw Error("Bundled package unavailable");
  const reader = response.body.pipeThrough(new DecompressionStream("gzip")).getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  const chunks: string[] = [];
  let bytes = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > maxPackageBytes) throw new PackageError("size");
      chunks.push(decoder.decode(value, { stream: true }));
    }
    chunks.push(decoder.decode());
  } finally {
    await reader.cancel();
  }
  const text = chunks.join("");
  return { text, data: await readPackage(text) };
}

export default function ResearchViewer() {
  const [lang, setLang] = useState<Lang>("ru");
  const [section, setSection] = useState<Section>("overview");
  const [navOpen, setNavOpen] = useState(false);
  const [bundle, setBundle] = useState<Active>();
  const [selected, setSelected] = useState<Active>();
  const [preview, setPreview] = useState<Preview>();
  const [cache, setCache] = useState<{ text?: string; available: boolean }>({ available: false });
  const [phase, setPhase] = useState<"loading" | "busy" | "ready">("loading");
  const [hasBundleError, setBundleError] = useState(false);
  const [error, setError] = useState<"read" | "cache" | "cache-conflict" | PackageError>();
  const [notice, setNotice] = useState<"selected" | "reset">();
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState(emptyFilters);
  const [openPath, setOpenPath] = useState("");
  const [eventId, setEventId] = useState("");
  const eventTitle = useRef<HTMLHeadingElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const main = useRef<HTMLElement>(null);
  const previewTitle = useRef<HTMLHeadingElement>(null);
  const importDialog = useRef<HTMLDialogElement>(null);
  const importButton = useRef<HTMLButtonElement>(null);
  const fileOpener = useRef<HTMLElement | null>(null);
  const eventOpener = useRef<HTMLElement | null>(null);
  const openFileTitle = useRef<HTMLHeadingElement>(null);
  const active = selected ?? bundle;
  const data = active?.data;
  const t = (ru: string, en: string) => lang === "ru" ? ru : en;

  useEffect(() => {
    const updateSection = () => {
      setSection(sectionFromHash());
      setOpenPath("");
      setEventId("");
      setQuery("");
      setFilters(emptyFilters);
    };
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      updateSection();
      try {
        if (localStorage.getItem("capex-lang") === "en") setLang("en");
      } catch {
        // The reader also works with storage disabled.
      }
    });
    window.addEventListener("hashchange", updateSection);
    Promise.allSettled([loadBundled(), readLocalPackage()]).then(async ([base, local]) => {
      if (cancelled) return;
      const built = base.status === "fulfilled" ? base.value : undefined;
      setBundle(built);
      setBundleError(!built);
      if (local.status === "fulfilled") {
        setCache({ text: local.value?.text, available: true });
        if (local.value) {
          try {
            const saved = await readPackage(local.value.text);
            if (!built || comparePackages(built.data, saved) === "update") {
              if (!cancelled) setSelected({ ...local.value, data: saved });
            }
          } catch (reason) {
            if (!cancelled) setError(reason instanceof PackageError ? reason : "cache");
          }
        }
      }
      if (!cancelled) setPhase("ready");
    });
    return () => {
      cancelled = true;
      window.removeEventListener("hashchange", updateSection);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const hasPreview = Boolean(preview);
  useEffect(() => {
    const dialog = importDialog.current;
    if (hasPreview && dialog && !dialog.open) {
      dialog.showModal();
      previewTitle.current?.focus();
    } else if (!hasPreview && dialog?.open) {
      dialog.close();
      restoreFocus(importButton.current);
    }
  }, [hasPreview]);
  useEffect(() => {
    if (openPath) openFileTitle.current?.focus();
  }, [openPath]);
  useEffect(() => {
    if (eventId) eventTitle.current?.focus();
  }, [eventId]);

  function openFile(path: string) {
    const focused = document.activeElement;
    if (focused instanceof HTMLElement && !focused.closest("#research-file-panel")) fileOpener.current = focused;
    setOpenPath(path);
    if (path === openPath) openFileTitle.current?.focus();
  }

  function openEvent(id: string) {
    const focused = document.activeElement;
    if (focused instanceof HTMLElement && !focused.closest("#research-event-panel")) eventOpener.current = focused;
    setEventId(id);
    if (id === eventId) eventTitle.current?.focus();
  }

  function closeFile() {
    setOpenPath("");
    restoreFocus(fileOpener.current);
  }

  function closeEvent() {
    setEventId("");
    restoreFocus(eventOpener.current);
  }

  async function stage(file: File) {
    setPhase("busy");
    setError(undefined);
    setNotice(undefined);
    setPreview(undefined);
    try {
      if (file.size > maxPackageBytes) throw new PackageError("size");
      const text = new TextDecoder("utf-8", { fatal: true }).decode(await file.arrayBuffer());
      const candidate = await readPackage(text);
      const same = data ? comparePackages(data, candidate) === "same" : false;
      setPreview({ name: file.name, text, data: candidate, same });
    } catch (reason) {
      setError(reason instanceof PackageError ? reason : "read");
    } finally {
      setPhase("ready");
    }
  }

  async function apply() {
    if (!preview || preview.same) return;
    setPhase("busy");
    const next = { text: preview.text, selectedAt: new Date().toISOString() };
    try {
      if (cache.available) {
        await writeLocalPackage(cache.text, next);
        setCache({ text: next.text, available: true });
      }
      setSelected({ ...next, data: preview.data });
      setPreview(undefined);
      setOpenPath("");
      setNotice("selected");
      setError(undefined);
    } catch (reason) {
      setError(reason instanceof LocalPackageConflict ? "cache-conflict" : "cache");
    } finally {
      setPhase("ready");
    }
  }

  async function reset() {
    setPhase("busy");
    try {
      if (cache.text !== undefined) {
        await writeLocalPackage(cache.text);
        setCache({ available: true });
      }
      setSelected(undefined);
      setPreview(undefined);
      setOpenPath("");
      setError(undefined);
      setNotice("reset");
    } catch (reason) {
      setError(reason instanceof LocalPackageConflict ? "cache-conflict" : "cache");
    } finally {
      setPhase("ready");
    }
  }

  function exportCsv() {
    if (!data) return;
    const eventExport = section === "events" || section === "calendar";
    const rows = eventExport
      ? [["id", "event_key", "event_date", "entity", "title", "priority", "decision", "commit"],
        ...events.map(event => [event.id, event.event_key, event.event_date, event.entity, event.title, event.priority,
          event.reviews.at(-1)?.decision ?? "", data.manifest.target.commit])]
      : [["kind", "date", "title", "origin", "status", "github"],
        ...(reportSection ? reports : indexedReports).map(report => [report.kind, report.date, report.title, report.origin,
          report.status ?? "", targetLink(data.manifest.target.commit, report.target)])];
    download(`research-${eventExport ? "events" : "reports"}-${data.manifest.target.commit.slice(0, 7)}.csv`,
      "\uFEFF" + rows.map(row => row.map(csvCell).join(",")).join("\r\n"), "text/csv;charset=utf-8");
  }

  function facts(pack: ResearchPackage) {
    const { target, versions, workspace, workspaceVersion } = pack.manifest;
    return <dl className="research-facts">
      <div><dt>{t("Коммит пакета", "Package commit")}</dt>
        <dd><a href={targetLink(target.commit)} target="_blank" rel="noreferrer"><code>{target.commit}</code></a></dd></div>
      <div><dt>{t("Ветка и время коммита", "Ref and commit time")}</dt><dd>{target.ref} · {target.committedAt}</dd></div>
      <div><dt>{t("Состав", "Contents")}</dt><dd>{pack.manifest.files.length} {t("файлов", "files")} · {pack.reports.length + pack.archiveNotes.length} {t("отчётов и архивных записей", "reports and archive records")} · {pack.events.length} {t("событий", "events")}</dd></div>
      <div><dt>{t("Рабочее пространство", "Workspace")}</dt><dd>{workspace} · v{workspaceVersion}</dd></div>
      <div><dt>{t("Модель и политика", "Model and policy")}</dt><dd><code>{versions.model}</code><br/><code>{versions.policy}</code></dd></div>
      <div><dt>{t("Код Python · SHA-256", "Python code · SHA-256")}</dt><dd><code>{versions.code}</code></dd></div>
      <div><dt>{t("Срез Challenger", "Challenger cutoff")}</dt><dd>{pack.snapshot
        ? <><a href={targetLink(target.commit, pack.snapshot.path)} target="_blank" rel="noreferrer">{pack.snapshot.data.cutoff}</a> · <strong>{pack.snapshot.data.data_status}</strong> · {pack.snapshot.data.review_status}</>
        : t("В пакете отсутствует", "Missing from package")}</dd></div>
      {pack.snapshot && Object.keys(pack.snapshot.data.unresolved).length > 0 &&
        <div><dt>{t("Пробелы Challenger", "Challenger gaps")}</dt><dd>{Object.keys(pack.snapshot.data.unresolved).join(", ")}</dd></div>}
      <div><dt>{t("Недоступные ссылки", "Unavailable links")}</dt><dd>{pack.unavailable.length}
        {[...new Set(pack.unavailable.map(edge => edge.link))].map(link => <small key={link}>{link}</small>)}</dd></div>
    </dl>;
  }

  const matches = (...parts: string[]) => parts.join(" ").toLowerCase().includes(query.trim().toLowerCase());
  const commit = data?.manifest.target.commit;
  const indexedReports = data ? [
    ...data.reports.map(report => ({ ...report, status: report.status_text_from_source, target: report.path })),
    ...data.archiveNotes.map(note => ({ ...note, date: note.period, target: note.path, origin: "ARCHIVED" as const,
      title: t("Архивная запись за неполный день", "Archived partial daily record"), source_pr: null })),
  ] : [];
  const reportSection = section === "daily" || section === "weekly";
  const eventSection = section === "events" || section === "calendar";
  const reportSet = indexedReports.filter(report => report.kind === (section === "daily" ? "daily_report" : "weekly_report"));
  const reports = reportSet.filter(report =>
    (!filters.period || report.date.startsWith(filters.period))
    && (!filters.origin || report.origin === filters.origin)
    && (!filters.status || reportCompleteness(report.status) === filters.status)
    && matches(report.title, report.date, report.origin, report.status ?? "", data?.files[report.target] ?? ""))
    .sort((a, b) => b.date.localeCompare(a.date) || a.origin.localeCompare(b.origin));
  const research = data?.manifest.files.filter(file => /\.md$/.test(file.path) && !data.reports.some(report => report.path === file.path)
    && !data.archiveNotes.some(note => note.path === file.path) && matches(file.path, data.files[file.path] ?? "")) ?? [];
  const eventSet = data?.events ?? [];
  const events = eventSet.filter(event => (!filters.period || event.event_date.startsWith(filters.period))
    && (!filters.priority || event.priority === filters.priority)
    && (!filters.status || (event.reviews.at(-1)?.decision ?? "UNKNOWN") === filters.status)
    && matches(event.id, event.entity, event.title, event.event_date, event.reviews.at(-1)?.decision ?? ""))
    .toSorted((a, b) => b.event_date.localeCompare(a.event_date));
  const periods = [...new Set((eventSection ? eventSet.map(event => event.event_date) : reportSet.map(report => report.date))
    .map(date => date.slice(0, 7)))].sort().reverse();
  const statuses = [...new Set(eventSection ? eventSet.map(event => event.reviews.at(-1)?.decision ?? "UNKNOWN")
    : reportSet.map(report => reportCompleteness(report.status)))].sort();
  const mainDailyDates = new Set(indexedReports.filter(report => report.kind === "daily_report" && report.origin === "MAIN").map(report => report.date));
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jerusalem", dateStyle: "short" }).format(new Date());
  const exportLabel = eventSection ? t("Экспорт событий CSV", "Export events CSV") : t("Экспорт отчётов CSV", "Export reports CSV");
  const [, titleRu, titleEn] = sections.find(([key]) => key === section) ?? sections[0];
  const sectionTitle = t(titleRu, titleEn);
  const originLabel = (origin: string) => ({
    MAIN: t("Основной набор", "Main dataset"),
    PROPOSED: t("Предложено в PR", "Proposed in PR"),
    ARCHIVED: t("Архив", "Archive"),
  }[origin] ?? origin);
  const openedEvent = data?.events.find(event => event.id === eventId);
  const openReport = indexedReports.find(report => report.target === openPath);
  const sourceReport = data?.reports.find(report => report.path === openPath);
  const openText = data?.files[openPath];
  const metadata = (label: RegExp) => openText?.split("\n").slice(0, 24)
    .map(line => line.replaceAll("**", "").trim()).find(line => label.test(line));
  const cutoff = metadata(/^(?:Economic |Evidence |Observation |Research )?Cutoff:/i)
    ?? (openReport && "cutoff_text_from_source" in openReport ? openReport.cutoff_text_from_source?.replaceAll("**", "") : undefined);
  const session = metadata(/^(?:Last completed |Last )?(?:US|NYSE\/Nasdaq|New York|NY) (?:regular |equity )?session:/i);
  const completeness = metadata(/^(?:Data |Report )?Completeness:/i) ?? openReport?.status;
  const openArtifactEvent = data?.events.find(event => openPath.startsWith("research/challenger/calculations/" + event.id + "_"));
  const artifactFiles = data?.manifest.files.filter(({ path }) => isCalculation(path) && matches(path))
    .toSorted((a, b) => b.path.localeCompare(a.path)) ?? [];
  const openedCalculation = data && isCalculation(openPath) ? readCalculation(data, openPath) : undefined;
  const unavailable = t("Недоступно в пакете", "Unavailable in package");
  const savedOrigin = data?.original.get(openPath);
  const openBinary = data?.entries.get(openPath)?.encoding === "base64";
  const weeklyAttachments = openReport?.kind === "weekly_report" ? data?.manifest.files.filter(({ path }) => {
    const base = path.split("/").at(-1) ?? "";
    const match = /^weekly_(?:capture|challenger_v2|coverage|institutional|macro_pain)_([\d-]+)_r\d+\.json$/.exec(base);
    if (match?.[1] !== openReport.date) return false;
    if (openReport.origin === "PROPOSED") return path.startsWith(`research/proposed/pr-${openReport.source_pr}/`);
    if (openReport.origin === "ARCHIVED") return path.startsWith("research/reports/attachments/") && path.includes("/archive/");
    return path.startsWith("research/reports/attachments/") && !path.includes("/archive/");
  }).map(({ path }) => path) : undefined;
  const attachments = data && openPath ? [...new Set([
    ...(weeklyAttachments ?? []),
    ...(data.reports.find(report => report.path === openPath)?.attachments ?? []),
    ...(savedOrigin?.links.flatMap(edge => edge.resolution === "target" && edge.target_path !== openPath
      && Object.hasOwn(data.files, edge.target_path) ? [edge.target_path] : []) ?? []),
  ])] : [];
  const noResults = <p role="status" className="alert research-message">{t("По этому запросу записей нет.", "No records match your search.")}</p>;

  function selectFilter(key: keyof typeof filters, label: string, options: string[], name = (value: string) => value) {
    const id = `reader-filter-${key}`;
    return <div className="reader-filter">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={filters[key]} onChange={event => setFilters(current => ({ ...current, [key]: event.target.value }))}>
        <option value="">{t("Все", "All")}</option>
        {options.map(value => <option key={value} value={value}>{name(value)}</option>)}
      </select>
    </div>;
  }

  const errorNotice = error && <p role="alert" className="alert error">
        {error instanceof PackageError ? <>
          {errorLabels[error.code][lang === "ru" ? 0 : 1]}
          {error.message !== error.code && <small>{error.message}</small>}
        </> : error === "cache-conflict"
          ? t("Пакет изменился в другой вкладке. Обновите страницу и повторите действие.", "The package changed in another tab. Reload the page and try again.")
          : error === "cache" ? t("Не удалось прочитать или сохранить локальный пакет.", "Could not read or save the local package.")
            : t("Не удалось прочитать файл.", "Could not read the file.")}
      </p>;

  return <div className="research-shell">
    <a className="skip" href="#main" onClick={event => {
      event.preventDefault();
      main.current?.focus();
    }}>{t("К содержимому", "Skip to content")}</a>
    <header className="research-header">
      <a className="brand" href="#overview"><span className="brandmark"><Activity size={22}/></span>
        <span>WTF VIEWER<span className="brand-sub">AI CAPEX SIGNALS</span></span></a>
      <div className="research-header-actions">
        <a href="/legacy">{t("Исторический рабочий стол", "Historical desk")}</a>
        <div className="language" role="group" aria-label={t("Язык", "Language")}>
          {(["ru", "en"] as const).map(value => <button key={value} aria-pressed={lang === value}
            className={lang === value ? "active" : ""} onClick={() => {
              setLang(value);
              try { localStorage.setItem("capex-lang", value); } catch {}
            }}>{value.toUpperCase()}</button>)}
        </div>
      </div>
    </header>
    <nav className="research-nav" aria-label={t("Разделы исследований", "Research sections")} data-open={navOpen}>
      <button type="button" className="reader-nav-toggle" aria-controls="reader-nav-links"
        aria-expanded={navOpen} onClick={() => setNavOpen(open => !open)}>
        <Menu size={18} aria-hidden="true"/>{t("Разделы", "Sections")} · {sectionTitle}
      </button>
      <div className="reader-nav-links" id="reader-nav-links">
        {sections.map(([key, ru, en]) => {
          const Icon = sectionIcons[key];
          return <a key={key} href={`#${key}`} aria-current={section === key ? "page" : undefined}>
            <Icon size={17} aria-hidden="true"/>{t(ru, en)}</a>;
        })}
      </div>
    </nav>
    <main id="main" className="research-main" tabIndex={-1} ref={main}>
      <div className="page-intro">
        <div><div className="eyebrow">CHALLENGER 2.1</div><h1>{t("Исследовательская панель", "Research desk")}</h1></div>
        <div className="research-actions">
          <button className="reader-primary" ref={importButton} onClick={() => input.current?.click()} disabled={phase !== "ready"}><Upload size={16}/>{t("Выбрать пакет JSON", "Choose JSON package")}</button>
          <button disabled={!active} onClick={() => active && download(`research-${commit?.slice(0, 7)}.json`, active.text)}><Download size={16}/>JSON</button>
          <button disabled={!data || (reportSection && !reports.length) || (eventSection && !events.length)} onClick={exportCsv} aria-label={exportLabel} title={exportLabel}><Download size={16}/>CSV</button>
          <input ref={input} type="file" accept=".json,application/json" hidden onChange={event => {
            const file = event.currentTarget.files?.[0];
            event.currentTarget.value = "";
            if (file) void stage(file);
          }}/>
        </div>
      </div>
      {hasBundleError && <p role="alert" className="alert error">{t("Встроенный пакет недоступен. Можно выбрать JSON вручную.", "The bundled package is unavailable. You can choose a JSON file.")}</p>}
      {!hasPreview && errorNotice}
      {phase !== "ready" && <p role="status" className="research-message">{phase === "loading" ? t("Загрузка пакета…", "Loading package…") : t("Проверка пакета…", "Checking package…")}</p>}
      {notice && <p role="status" className="alert success">{notice === "selected"
        ? t("Локальный просмотр обновлён.", "Local preview updated.")
        : t("Локальный выбор сброшен.", "Local selection cleared.")}</p>}
      {active && <div className="research-source" data-local={Boolean(selected)}>
        <div><strong>{selected ? t("Локальный просмотр", "Local preview") : t("Пакет из сборки сайта", "Site bundle")}</strong>
          <span> · <a href={targetLink(active.data.manifest.target.commit)} target="_blank" rel="noreferrer">
            <code>{active.data.manifest.target.commit.slice(0, 12)}</code></a> · {active.data.manifest.target.committedAt}</span>
          {selected && <small>{cache.available
            ? t("Сохранён в этом браузере.", "Stored in this browser.")
            : t("Действует до перезагрузки. После неё выберите JSON снова.", "Active until reload. Choose the JSON file again after reloading.")}
          {selected.selectedAt && <> · {selected.selectedAt}</>}</small>}
        </div>
        {(selected || cache.text !== undefined) && <button disabled={phase !== "ready"} onClick={() => void reset()}>{t("Сбросить локальный выбор", "Clear local selection")}</button>}
      </div>}
      <dialog ref={importDialog} className="research-import" aria-labelledby="preview-title" onCancel={event => {
        event.preventDefault();
        if (phase === "ready") setPreview(undefined);
      }}>
        {preview && <>
          <h2 id="preview-title" tabIndex={-1} ref={previewTitle}>{t("Предпросмотр импорта", "Import preview")}</h2>
          <p>{preview.name} · SHA-256 <code>{preview.data.hash}</code></p>
          {facts(preview.data)}
          {preview.same ? <p role="status">{t("Этот пакет уже активен. Данные не изменятся.", "This package is already active. The data will stay the same.")}</p>
            : <p>{cache.available
              ? t("Пакет будет доступен в этом браузере после перезагрузки.", "The package will be available in this browser after reload.")
              : t("Хранилище браузера недоступно. После перезагрузки выберите JSON снова.", "Browser storage is unavailable. Choose the JSON file again after reload.")}</p>}
          {errorNotice}
          {phase === "busy" && <p role="status">{t("Подготовка локального просмотра…", "Preparing local preview…")}</p>}
          <div className="research-actions">
            <button className="reader-primary" disabled={preview.same || phase !== "ready"} onClick={() => void apply()}>{t("Открыть локальный набор", "Open local dataset")}</button>
            <button disabled={phase !== "ready"} onClick={() => setPreview(undefined)}>{t("Закрыть предпросмотр", "Close preview")}</button>
          </div>
        </>}
      </dialog>
      {data && <>
        {section === "overview" && <div className="reader-overview">
          <ChallengerPanel key={data.hash} pack={data} lang={lang} local={Boolean(selected)} download={download} />
          <OpenResearchChecks pack={data} t={t} open={openFile} openEvent={openEvent}/>
        </div>}
        {section === "overview" ? <section className="panel research-preview" aria-labelledby="dataset-title">
          <h2 id="dataset-title">{t("Пакет исследований", "Research package")}</h2>
          <p>{t("Обновление вручную из GitHub WTF-Viewer.", "Updated manually from GitHub WTF-Viewer.")}</p>
          {facts(data)}
          <p><a href={targetLink(data.manifest.target.commit, indexPath)} target="_blank" rel="noreferrer">{t("Индекс отчётов", "Report index")} <ArrowUpRight size={14}/></a>
            {" · "}<a href={targetLink(data.manifest.target.commit, migrationPath)} target="_blank" rel="noreferrer">{t("Происхождение перенесённых файлов", "Provenance of migrated files")} <ArrowUpRight size={14}/></a></p>
        </section> : section === "challenger"
          ? <ChallengerPanel key={data.hash} pack={data} lang={lang} local={Boolean(selected)} download={download} />
          : section === "macro" ? <MacroContext pack={data} t={t} openEvent={openEvent}/>
          : <section className="panel research-preview" id={section}>
          <h2>{sectionTitle}</h2>
          <div className="reader-filters">
            <label className="research-search"><span>{t("Поиск", "Search")}</span><input type="search" value={query}
              onChange={event => setQuery(event.target.value)}/></label>
            {(reportSection || eventSection) && selectFilter("period", t("Период", "Period"), periods)}
            {reportSection && selectFilter("origin", t("Происхождение", "Origin"), ["MAIN", "PROPOSED", "ARCHIVED"], originLabel)}
            {eventSection && selectFilter("priority", t("Приоритет", "Severity"), ["HIGH", "CRITICAL"])}
            {(reportSection || eventSection) && selectFilter("status", eventSection ? t("Квалификация", "Qualification") : t("Комплектность", "Completeness"), statuses)}
            {(query || Object.values(filters).some(Boolean)) && <button onClick={() => {
              setQuery(""); setFilters(emptyFilters);
            }}>{t("Сбросить фильтры", "Clear filters")}</button>}
          </div>
          {(section === "daily" || section === "weekly") && (reports.length ? <ul className="research-list reader-records">{reports.map(report =>
            <li key={report.target} data-selected={openPath === report.target}>
              <button className="research-file" onClick={() => openFile(report.target)} aria-expanded={openPath === report.target}><FileText size={18}/>{report.title}</button>
              <small>{report.date} · {originLabel(report.origin)}{report.source_pr ? ` #${report.source_pr}` : ""} · <a href={targetLink(commit!, report.target)} target="_blank" rel="noreferrer">GitHub</a></small>
              <div className="reader-statuses"><ResearchStatus label={t("Комплектность", "Completeness")} value={reportCompleteness(report.status)}
                tone={coverageTone(reportCompleteness(report.status))}/></div>
              <small>{report.status || t("Статус в индексе отсутствует", "Status absent from index")}</small>
            </li>)}</ul> : noResults)}
          {section === "research" && (research.length ? <ul className="research-list">{research.map(file =>
            <li key={file.path}>
              <button className="research-file" onClick={() => openFile(file.path)} aria-expanded={openPath === file.path}><FileText size={18}/>{file.path.split("/").at(-1)}</button>
              <small>{originLabel(file.path.startsWith("research/proposed/") ? "PROPOSED" : file.path.startsWith("research/archive/") ? "ARCHIVED" : "MAIN")} · <a href={targetLink(commit!, file.path)} target="_blank" rel="noreferrer">GitHub</a></small>
            </li>)}</ul> : noResults)}
          {section === "events" && (events.length ? <EventRegister events={events} selected={eventId} t={t} open={openEvent}/> : noResults)}
          {section === "calendar" && (events.length ? <ul className="research-list reader-records">{events.map((event, i) =>
            <li key={event.id} data-selected={eventId === event.id}>
              {events[i - 1]?.event_date !== event.event_date && <div className="reader-statuses">
                <h3><time dateTime={event.event_date} aria-current={event.event_date === today ? "date" : undefined}>{event.event_date}</time></h3>
                {event.event_date === today && <span>{t("Сегодня", "Today")}</span>}
                {!mainDailyDates.has(event.event_date) && <small>{t("Основного дневного отчёта нет в пакете", "Main daily report absent from package")}</small>}
              </div>}
              <button className="research-file" onClick={() => openEvent(event.id)} aria-expanded={eventId === event.id}>{event.entity} · {event.title}</button>
              <small><code>{event.id}</code> · <time dateTime={event.event_date}>{event.event_date}</time></small>
              <EventStatuses priority={event.priority} decision={event.reviews.at(-1)?.decision} t={t}/>
            </li>)}</ul> : noResults)}
          {section === "history" && (artifactFiles.length ? <ul className="research-list">{artifactFiles.map(({ path }) =>
            <li key={path}><button className="research-file" onClick={() => openFile(path)}>{path.split("/").at(-1)}</button>
              <small>{originLabel(path.includes("/proposed/") ? "PROPOSED" : path.includes("/archive/") ? "ARCHIVED" : "MAIN")} · <a href={targetLink(commit!, path)} target="_blank" rel="noreferrer">GitHub</a></small>
            </li>)}</ul> : noResults)}
        </section>}
        {openedEvent && <section id="research-event-panel" className="panel research-preview reader-selected" aria-labelledby="event-title"
          onKeyDown={event => { if (event.key === "Escape") closeEvent(); }}>
          <h2 id="event-title" tabIndex={-1} ref={eventTitle}>{openedEvent.title}</h2>
          <p><code>{openedEvent.id}</code> · {openedEvent.source_precision} · <a href={targetLink(commit!, registryPath)} target="_blank" rel="noreferrer">GitHub</a></p>
          <EventStatuses priority={openedEvent.priority} decision={openedEvent.reviews.at(-1)?.decision}
            direction={display(openedEvent.reviews.at(-1)?.direction)} t={t}/>
          {openedEvent.reviews.at(-1)?.reason && <p>{openedEvent.reviews.at(-1)?.reason}</p>}
          <dl className="research-facts">
            {[
              [t("Дата события", "Event date"), openedEvent.event_date],
              [t("Первая публикация", "First published"), openedEvent.first_public_at],
              [t("Публично не позднее", "Known public by"), openedEvent.known_public_by_at],
              [t("Дата регистрации", "Registered"), openedEvent.registered_at],
            ].map(([label, date]) => <div key={label}><dt>{label}</dt><dd>{date ? <time dateTime={date}>{date}</time> : "UNKNOWN"}</dd></div>)}
          </dl>
          <h3>{t("Источники", "Sources")}</h3>
          <ul>{openedEvent.source_refs.map(ref => <li key={ref}>{publicUrl(ref) ? <a href={publicUrl(ref)} target="_blank" rel="noreferrer">{ref}</a> : ref}</li>)}</ul>
          <h3>{t("История проверок", "Review history")}</h3>
          <ol className="research-list">{openedEvent.reviews.map((review, index) =>
            <ReviewEvidence key={index} review={review} pack={data} t={t}/>)}</ol>
          {data.manifest.files.filter(({ path }) => path.startsWith("research/challenger/calculations/") && path.split("/").at(-1)?.startsWith(openedEvent.id + "_")).map(({ path }) =>
            <p key={path}><button onClick={() => openFile(path)}>{path.split("/").at(-1)}</button></p>)}
          <button onClick={closeEvent}>{t("Закрыть событие", "Close event")}</button>
        </section>}
        {openPath && <section id="research-file-panel" className="panel research-preview reader-selected" aria-labelledby="research-file-title"
          onKeyDown={event => { if (event.key === "Escape") closeFile(); }}>
          <h2 id="research-file-title" tabIndex={-1} ref={openFileTitle}>{openReport?.title ?? openPath.split("/").at(-1)}</h2>
          {openReport && <dl className="research-facts">
            <div><dt>{t("Дата отчёта", "Report date")}</dt><dd><time dateTime={openReport.date}>{openReport.date}</time></dd></div>
            <div><dt>{t("Происхождение", "Origin")}</dt><dd>{originLabel(openReport.origin)}{openReport.source_pr ? ` #${openReport.source_pr}` : ""}</dd></div>
            <div><dt>{t("Файл", "File")}</dt><dd>{openText ? t("В пакете", "In package") : unavailable}</dd></div>
            <div><dt>{t("Комплектность", "Completeness")}</dt><dd><ResearchStatus value={reportCompleteness(completeness)} tone={coverageTone(reportCompleteness(completeness))}/></dd></div>
            <div><dt>{t("Статус по источнику", "Source workflow status")}</dt><dd>{"source_pr_state" in openReport && openReport.source_pr_state ? `${openReport.source_pr_state} · ` : ""}{openReport.status?.replaceAll("**", "") ?? "UNKNOWN"}</dd></div>
            <div><dt>{t("Срез по источнику", "Source cutoff")}</dt><dd>{cutoff ?? "UNKNOWN"}</dd></div>
            <div><dt>{t("Торговая сессия Нью-Йорка", "New York trading session")}</dt><dd>{session ?? (cutoff && /session|regular (?:close|hours)/i.test(cutoff) ? cutoff : "UNKNOWN")}</dd></div>
          </dl>}
          {sourceReport?.source_pr && <WorkflowEvidence report={sourceReport} pack={data} t={t}/>}
          <div className="research-actions">
            <a href={targetLink(commit!, openPath)} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14}/></a>
            <button disabled={openText === undefined} onClick={() => download(openPath.split("/").at(-1)!, openBinary ? decodeBase64(data.files[openPath]) : data.files[openPath],
              openBinary ? "application/octet-stream" : "text/plain;charset=utf-8")}>{t("Скачать файл", "Download file")}</button>
            <button onClick={closeFile}>{t("Закрыть файл", "Close file")}</button>
          </div>
          {openArtifactEvent && <button onClick={() => openEvent(openArtifactEvent.id)}>{openArtifactEvent.id}</button>}
          {savedOrigin && <p className="research-path">
            <a href={`https://github.com/${savedOrigin.source_repository}/blob/${savedOrigin.source_commit}/${savedOrigin.source_path.split("/").map(encodeURIComponent).join("/")}`}
              target="_blank" rel="noreferrer">{t("Исходный материал", "Original material")}</a>
            {" · "}{savedOrigin.source_ref} · <code>{savedOrigin.source_commit}</code>
          </p>}
          {attachments.length > 0 && <details className="research-attachments"><summary>{t("Связанные файлы", "Related files")} ({attachments.length})</summary>
            <ul>{attachments.map(path => <li key={path}><button onClick={() => openFile(path)}>{path.split("/").at(-1)}</button></li>)}</ul>
          </details>}
          {openedCalculation && <CalculationContext pack={data} path={openPath} {...openedCalculation} t={t}/>}
          {/\/weekly_coverage_[\d-]+_r\d+\.json$/.test(openPath) && <WeeklyCoverage pack={data} path={openPath} t={t}/>}
          {openText === undefined ? <p role="alert">{unavailable}</p>
            : openPath.endsWith(".md") && !openBinary ? <ResearchDocument pack={data} path={openPath} open={openFile} unavailable={unavailable} text={openText} />
              : !openBinary && <pre className="research-text">{openText}</pre>}
        </section>}
      </>}
    </main>
  </div>;
}
