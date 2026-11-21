"use client";

import { useEffect, useRef, useState } from "react";
import { Activity, ArrowUpRight, Download, FileText, Upload } from "lucide-react";
import {
  bundledPackageUrl, comparePackages, decodeBase64, indexPath, maxPackageBytes, migrationPath, PackageError, readPackage, targetLink,
} from "@/lib/research-package";
import type { ResearchPackage } from "@/lib/research-package";
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
] as const;
type Section = typeof sections[number][0];
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
  const [bundle, setBundle] = useState<Active>();
  const [selected, setSelected] = useState<Active>();
  const [preview, setPreview] = useState<Preview>();
  const [cache, setCache] = useState<{ text?: string; available: boolean }>({ available: false });
  const [phase, setPhase] = useState<"loading" | "busy" | "ready">("loading");
  const [hasBundleError, setBundleError] = useState(false);
  const [error, setError] = useState<"read" | "cache" | "cache-conflict" | PackageError>();
  const [notice, setNotice] = useState<"selected" | "reset">();
  const [query, setQuery] = useState("");
  const [openPath, setOpenPath] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const main = useRef<HTMLElement>(null);
  const previewTitle = useRef<HTMLHeadingElement>(null);
  const openFileTitle = useRef<HTMLHeadingElement>(null);
  const active = selected ?? bundle;
  const data = active?.data;
  const t = (ru: string, en: string) => lang === "ru" ? ru : en;

  useEffect(() => {
    const updateSection = () => {
      setSection(sectionFromHash());
      setOpenPath("");
      setQuery("");
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
  useEffect(() => {
    if (preview) previewTitle.current?.focus();
  }, [preview]);
  useEffect(() => {
    if (openPath) openFileTitle.current?.focus();
  }, [openPath]);

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
    const rows = section === "events"
      ? [["id", "event_key", "event_date", "entity", "title", "priority", "decision", "commit"],
        ...data.events.map(event => [event.id, event.event_key, event.event_date, event.entity, event.title, event.priority,
          event.reviews.at(-1)?.decision ?? "", data.manifest.target.commit])]
      : [["kind", "date", "title", "origin", "status", "github"],
        ...data.reports.map(report => [report.kind, report.date, report.title, report.origin,
          report.status_text_from_source ?? "", targetLink(data.manifest.target.commit, report.path)]),
        ...data.archiveNotes.map(note => [note.kind, note.period, note.path, "ARCHIVED", note.status, targetLink(data.manifest.target.commit, note.path)])];
    download(`research-${section === "events" ? "events" : "reports"}-${data.manifest.target.commit.slice(0, 7)}.csv`,
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
  const reports = data ? [
    ...data.reports.map(report => ({ ...report, status: report.status_text_from_source, target: report.path })),
    ...data.archiveNotes.map(note => ({ ...note, date: note.period, target: note.path, origin: "ARCHIVED" as const,
      title: t("Архивная запись за неполный день", "Archived partial daily record"), source_pr: null })),
  ].filter(report => report.kind === (section === "daily" ? "daily_report" : "weekly_report")
    && matches(report.title, report.date, report.origin, report.status ?? ""))
    .sort((a, b) => b.date.localeCompare(a.date) || a.origin.localeCompare(b.origin)) : [];
  const research = data?.manifest.files.filter(file => /\.md$/.test(file.path) && !data.reports.some(report => report.path === file.path)
    && !data.archiveNotes.some(note => note.path === file.path) && matches(file.path)) ?? [];
  const events = data?.events.filter(event => matches(event.id, event.entity, event.title, event.event_date, event.reviews.at(-1)?.decision ?? ""))
    .toSorted((a, b) => b.event_date.localeCompare(a.event_date)) ?? [];
  const originLabel = (origin: string) => ({
    MAIN: t("Основной набор", "Main dataset"),
    PROPOSED: t("Предложено в PR", "Proposed in PR"),
    ARCHIVED: t("Архив", "Archive"),
  }[origin] ?? origin);
  const savedOrigin = data?.original.get(openPath);
  const openBinary = data?.entries.get(openPath)?.encoding === "base64";
  const attachments = data && openPath ? [...new Set([
    ...(data.reports.find(report => report.path === openPath)?.attachments ?? []),
    ...(savedOrigin?.links.flatMap(edge => edge.resolution === "target" && edge.target_path !== openPath
      && Object.hasOwn(data.files, edge.target_path) ? [edge.target_path] : []) ?? []),
  ])] : [];
  const noResults = <p className="research-message">{t("По этому запросу записей нет.", "No records match your search.")}</p>;

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
        <div className="language" aria-label={t("Язык", "Language")}>
          {(["ru", "en"] as const).map(value => <button key={value} aria-pressed={lang === value}
            className={lang === value ? "active" : ""} onClick={() => {
              setLang(value);
              try { localStorage.setItem("capex-lang", value); } catch {}
            }}>{value.toUpperCase()}</button>)}
        </div>
      </div>
    </header>
    <main id="main" className="research-main" tabIndex={-1} ref={main}>
      <div className="page-intro">
        <div><div className="eyebrow">CHALLENGER 2.1</div><h1>{t("Исследовательская панель", "Research desk")}</h1></div>
        <div className="research-actions">
          <button onClick={() => input.current?.click()} disabled={phase !== "ready"}><Upload size={16}/>{t("Выбрать пакет JSON", "Choose JSON package")}</button>
          <button disabled={!active} onClick={() => active && download(`research-${commit?.slice(0, 7)}.json`, active.text)}><Download size={16}/>JSON</button>
          <button disabled={!data} onClick={exportCsv}><Download size={16}/>CSV</button>
          <input ref={input} type="file" accept=".json,application/json" hidden onChange={event => {
            const file = event.currentTarget.files?.[0];
            event.currentTarget.value = "";
            if (file) void stage(file);
          }}/>
        </div>
      </div>
      {hasBundleError && <p role="alert" className="alert error">{t("Встроенный пакет недоступен. Можно выбрать JSON вручную.", "The bundled package is unavailable. You can choose a JSON file.")}</p>}
      {error && <p role="alert" className="alert error">
        {error instanceof PackageError ? <>
          {errorLabels[error.code][lang === "ru" ? 0 : 1]}
          {error.message !== error.code && <small>{error.message}</small>}
        </> : error === "cache-conflict"
          ? t("Пакет изменился в другой вкладке. Обновите страницу и повторите действие.", "The package changed in another tab. Reload the page and try again.")
          : error === "cache" ? t("Не удалось прочитать или сохранить локальный пакет.", "Could not read or save the local package.")
            : t("Не удалось прочитать файл.", "Could not read the file.")}
      </p>}
      {phase !== "ready" && <p role="status" className="research-message">{phase === "loading" ? t("Загрузка пакета…", "Loading package…") : t("Проверка пакета…", "Checking package…")}</p>}
      {notice && <p role="status" className="alert success">{notice === "selected"
        ? t("Локальный просмотр обновлён.", "Local preview updated.")
        : t("Локальный выбор сброшен.", "Local selection cleared.")}</p>}
      {active && <div className="research-source">
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
      {preview && <section className="panel research-preview" aria-labelledby="preview-title">
        <h2 id="preview-title" tabIndex={-1} ref={previewTitle}>{t("Предпросмотр импорта", "Import preview")}</h2>
        <p>{preview.name} · SHA-256 <code>{preview.data.hash}</code></p>
        {facts(preview.data)}
        {preview.same ? <p role="status">{t("Этот пакет уже активен. Данные не изменятся.", "This package is already active. The data will stay the same.")}</p>
          : <p>{cache.available
            ? t("Пакет будет доступен в этом браузере после перезагрузки.", "The package will be available in this browser after reload.")
            : t("Хранилище браузера недоступно. После перезагрузки выберите JSON снова.", "Browser storage is unavailable. Choose the JSON file again after reload.")}</p>}
        <div className="research-actions">
          <button disabled={preview.same || phase !== "ready"} onClick={() => void apply()}>{t("Открыть локальный набор", "Open local dataset")}</button>
          <button disabled={phase !== "ready"} onClick={() => setPreview(undefined)}>{t("Закрыть предпросмотр", "Close preview")}</button>
        </div>
      </section>}
      <nav className="research-nav" aria-label={t("Разделы исследований", "Research sections")}>
        {sections.map(([key, ru, en]) => <a key={key} href={`#${key}`} aria-current={section === key ? "page" : undefined}>{t(ru, en)}</a>)}
      </nav>
      {data && <>
        {section === "overview" ? <section className="panel research-preview" aria-labelledby="dataset-title">
          <h2 id="dataset-title">{t("Пакет исследований", "Research package")}</h2>
          <p>{t("Обновление вручную из GitHub WTF-Viewer.", "Updated manually from GitHub WTF-Viewer.")}</p>
          {facts(data)}
          <p><a href={targetLink(data.manifest.target.commit, indexPath)} target="_blank" rel="noreferrer">{t("Индекс отчётов", "Report index")} <ArrowUpRight size={14}/></a>
            {" · "}<a href={targetLink(data.manifest.target.commit, migrationPath)} target="_blank" rel="noreferrer">{t("Происхождение перенесённых файлов", "Provenance of migrated files")} <ArrowUpRight size={14}/></a></p>
        </section> : section === "challenger"
          ? <ChallengerPanel key={data.hash} pack={data} lang={lang} local={Boolean(selected)} download={download} />
          : <section className="panel research-preview" id={section}>
          <h2>{sections.find(([key]) => key === section)?.[lang === "ru" ? 1 : 2]}</h2>
          <label className="research-search"><span>{t("Поиск", "Search")}</span><input value={query} onChange={e => setQuery(e.target.value)}/></label>
          {(section === "daily" || section === "weekly") && (reports.length ? <ul className="research-list">{reports.map(report =>
            <li key={report.target}>
              <button className="research-file" onClick={() => setOpenPath(report.target)}><FileText size={18}/>{report.title}</button>
              <small>{report.date} · {originLabel(report.origin)}{report.source_pr ? ` #${report.source_pr}` : ""} · <a href={targetLink(commit!, report.target)} target="_blank" rel="noreferrer">GitHub</a></small>
              <small className="research-status">{report.status || t("Статус в индексе отсутствует", "Status absent from index")}</small>
            </li>)}</ul> : noResults)}
          {section === "research" && (research.length ? <ul className="research-list">{research.map(file =>
            <li key={file.path}>
              <button className="research-file" onClick={() => setOpenPath(file.path)}><FileText size={18}/>{file.path.split("/").at(-1)}</button>
              <small>{originLabel(file.path.startsWith("research/proposed/") ? "PROPOSED" : file.path.startsWith("research/archive/") ? "ARCHIVED" : "MAIN")} · <a href={targetLink(commit!, file.path)} target="_blank" rel="noreferrer">GitHub</a></small>
            </li>)}</ul> : noResults)}
          {section === "events" && (events.length ? <ul className="research-list">{events.map(event =>
            <li key={event.id}>
              <strong>{event.entity} · {event.title}</strong>
              <small><code>{event.id}</code> · {event.event_date} · {event.priority} · {event.reviews.at(-1)?.decision}</small>
            </li>)}</ul> : noResults)}
        </section>}
        {openPath && Object.hasOwn(data.files, openPath) && <section className="panel research-preview" aria-labelledby="research-file-title">
          <h2 id="research-file-title" tabIndex={-1} ref={openFileTitle}>{openPath.split("/").at(-1)}</h2>
          <div className="research-actions">
            <a href={targetLink(commit!, openPath)} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14}/></a>
            <button onClick={() => download(openPath.split("/").at(-1)!, openBinary ? decodeBase64(data.files[openPath]) : data.files[openPath],
              openBinary ? "application/octet-stream" : "text/plain;charset=utf-8")}>{t("Скачать файл", "Download file")}</button>
            <button onClick={() => setOpenPath("")}>{t("Закрыть файл", "Close file")}</button>
          </div>
          {savedOrigin && <p className="research-path">
            <a href={`https://github.com/${savedOrigin.source_repository}/blob/${savedOrigin.source_commit}/${savedOrigin.source_path.split("/").map(encodeURIComponent).join("/")}`}
              target="_blank" rel="noreferrer">{t("Исходный материал", "Original material")}</a>
            {" · "}{savedOrigin.source_ref} · <code>{savedOrigin.source_commit}</code>
          </p>}
          {attachments.length > 0 && <details className="research-attachments"><summary>{t("Связанные файлы", "Related files")} ({attachments.length})</summary>
            <ul>{attachments.map(path => <li key={path}><button onClick={() => setOpenPath(path)}>{path.split("/").at(-1)}</button></li>)}</ul>
          </details>}
          {!openBinary && <pre className="research-text">{data.files[openPath]}</pre>}
        </section>}
      </>}
    </main>
  </div>;
}
