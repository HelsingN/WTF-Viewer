"use client";

import { useEffect, useRef, useState } from "react";
import { calculateChallenger, prepareChallengerInput } from "@/lib/challenger-calculation";
import type { CalculationCache, LocalCalculation } from "@/lib/challenger-calculation";
import { CalculationContext } from "./calculation-context";
import { display, interval, readCalculation } from "@/lib/research-context";
import { targetLink } from "@/lib/research-package";
import type { ResearchPackage } from "@/lib/research-package";

const cacheName = "wtf-viewer.challenger-selection.v1";
const unavailableText = {
  missing: ["В пакете нет проверенного структурированного входа Challenger.", "The package lacks a reviewed structured Challenger input."],
  posthoc: ["Исторический post-hoc replay недоступен для рабочей оценки.", "A historical post-hoc replay is unavailable for the current evaluation."],
  unsupported: ["Версия кода или политики в пакете несовместима с этим калькулятором.", "The package code or policy is incompatible with this calculator."],
  invalid: ["Даты среза и структурированного входа расходятся или имеют неверный формат.", "The cutoff and structured-input timestamps differ or have an invalid format."],
} as const;
const digest = /^[0-9a-f]{64}$/;

function readCache(): CalculationCache[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(cacheName) ?? "[]");
    if (!Array.isArray(saved)) return [];
    return saved.slice(0, 12).filter((item): item is CalculationCache =>
      item && typeof item.key === "string" && digest.test(item.key)
      && typeof item.sourceSha === "string" && digest.test(item.sourceSha)
      && typeof item.asOf === "string" && Number.isFinite(Date.parse(item.asOf))
      && typeof item.evaluatedAt === "string" && Number.isFinite(Date.parse(item.evaluatedAt)));
  } catch {
    return [];
  }
}

function remember(result: LocalCalculation, earlier: CalculationCache[]) {
  const entry: CalculationCache = {
    key: result.key, asOf: result.evaluation_as_of, evaluatedAt: result.evaluated_at, sourceSha: result.source.sha256,
  };
  const next = [entry, ...earlier.filter(item => item.key !== entry.key || item.sourceSha !== entry.sourceSha)].slice(0, 12);
  try {
    localStorage.setItem(cacheName, JSON.stringify(next));
  } catch {
    // Private or disabled storage still allows calculations in this tab.
  }
  return next;
}

function Published({ pack, lang, local }: { pack: ResearchPackage; lang: "ru" | "en"; local: boolean }) {
  const t = (ru: string, en: string) => lang === "ru" ? ru : en;
  const capture = pack.snapshot;
  const calculation = capture && readCalculation(pack, capture.path);
  const published = capture?.data.published_result;
  const score = published?.final_exact_score == null ? interval(published?.final_interval) : display(published.final_exact_score);
  return <section className="panel research-preview" aria-labelledby="challenger-published">
    <h2 id="challenger-published">{local
      ? t("Артефакт в импортированном пакете", "Artifact in imported package")
      : t("Опубликованный артефакт в пакете", "Published artifact in package")}</h2>
    {capture ? <>
      <p><strong>{score}</strong> · {capture.data.data_status} · {capture.data.review_status}</p>
      <p>{t("Срез", "Cutoff")} <time dateTime={capture.data.cutoff}>{capture.data.cutoff}</time>{" · "}
        <a href={targetLink(pack.manifest.target.commit, capture.path)} target="_blank" rel="noreferrer">
          {t("Исходный артефакт", "Source artifact")}</a></p>
      {calculation && <details className="research-attachments">
        <summary>{t("Факторы и источники артефакта", "Artifact factors and sources")}</summary>
        <CalculationContext pack={pack} path={capture.path} {...calculation} t={t}/>
      </details>}
    </> : <p>{t("В пакете нет опубликованного артефакта Challenger.", "The package has no published Challenger artifact.")}</p>}
  </section>;
}

function LocalResult({ value, pack, lang, download }: {
  pack: ResearchPackage;
  value: LocalCalculation;
  lang: "ru" | "en";
  download: (name: string, body: string) => void;
}) {
  const t = (ru: string, en: string) => lang === "ru" ? ru : en;
  const result = value.result;
  const input = readCalculation(pack, value.source.path);
  return <section className="panel research-preview" aria-labelledby="challenger-local">
    <h2 id="challenger-local">LOCAL / UNPUBLISHED</h2>
    <p><strong>{result.final_exact_score ?? result.final_interval.join(" – ")}</strong>{" · "}
      {result.status} · {result.review_status}</p>
    <dl className="research-facts">
      <div><dt>{t("Дата оценки UTC", "Evaluation time UTC")}</dt><dd>{value.evaluation_as_of}</dd></div>
      <div><dt>{t("Первый локальный расчёт", "First local calculation")}</dt><dd>{value.evaluated_at}</dd></div>
      <div><dt>{t("Покрытие основных факторов", "Core coverage")}</dt><dd>{result.core_coverage_pct}%</dd></div>
      <div><dt>{t("Событийная поправка", "Event adjustment")}</dt><dd>{result.event_total_adjustment}</dd></div>
    </dl>
    <details className="research-attachments">
      <summary>{t("Факторы, исключения и происхождение", "Factors, exclusions and provenance")}</summary>
      {input && <CalculationContext pack={pack} path={value.source.path} artifact={input.artifact}
        snapshot={input.snapshot} result={result} asOf={value.evaluation_as_of} t={t} local/>}
      <dl className="research-facts">
        <div><dt>{t("Версия расчёта", "Calculator version")}</dt><dd>{value.versions.calculator}</dd></div>
        <div><dt>{t("Модель и политика", "Model and policy")}</dt><dd>{value.versions.model} · {value.versions.policy}</dd></div>
        <div><dt>{t("Хеш входа SHA-256", "Input SHA-256")}</dt><dd><code>{value.input_hash}</code></dd></div>
        <div><dt>{t("Хеш кода Python и политики", "Python code and policy hashes")}</dt>
          <dd><code>{value.versions.code}</code><br /><code>{value.versions.policyCode}</code></dd></div>
      </dl>
    </details>
    <div className="research-actions">
      <button type="button" onClick={() => download(`challenger-local-${value.key.slice(0, 12)}.json`, JSON.stringify(value, null, 2) + "\n")}>
        {t("Скачать локальный JSON", "Download local JSON")}
      </button>
    </div>
  </section>;
}

export function ChallengerPanel({ pack, lang, local, download }: {
  pack: ResearchPackage;
  lang: "ru" | "en";
  local: boolean;
  download: (name: string, body: string) => void;
}) {
  const t = (ru: string, en: string) => lang === "ru" ? ru : en;
  const prepared = prepareChallengerInput(pack);
  const [requested, setRequested] = useState(prepared.state === "ready" ? prepared.cutoff : "");
  const [result, setResult] = useState<LocalCalculation>();
  const [error, setError] = useState<string>();
  const [busy, setBusy] = useState(false);
  const changes = useRef({ sequence: 0 });
  const cache = useRef<CalculationCache[]>([]);

  useEffect(() => {
    const control = changes.current;
    const sequence = ++control.sequence;
    const input = prepareChallengerInput(pack);
    cache.current = readCache();
    if (input.state === "ready") {
      const saved = cache.current.find(item => item.sourceSha === input.sourceSha);
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
      if (saved || navigation?.type === "reload") void calculateChallenger(input, saved?.asOf ?? input.cutoff, cache.current).then(value => {
        if (control.sequence !== sequence || (saved && value.key !== saved.key)) return;
        cache.current = remember(value, cache.current);
        setResult(value);
        setRequested(value.evaluation_as_of);
      }).catch(() => {
        // Reopen the form with the package cutoff if the local cache cannot be validated.
      });
    }
    return () => { control.sequence++; };
  }, [pack]);

  async function run() {
    if (prepared.state !== "ready") return;
    const sequence = ++changes.current.sequence;
    setError(undefined);
    setBusy(true);
    try {
      const cached = [...readCache(), ...cache.current];
      const value = await calculateChallenger(prepared, requested, cached);
      if (changes.current.sequence !== sequence) return;
      cache.current = remember(value, cached.filter((item, i, all) =>
        all.findIndex(other => other.key === item.key && other.sourceSha === item.sourceSha) === i));
      setResult(value);
    } catch (reason) {
      if (changes.current.sequence === sequence) setError(reason instanceof Error ? reason.message : "Calculation failed");
    } finally {
      if (changes.current.sequence === sequence) setBusy(false);
    }
  }

  return <>
    <Published pack={pack} lang={lang} local={local} />
    <section className="panel research-preview" aria-labelledby="challenger-form">
      <h2 id="challenger-form">{t("Пересчёт Challenger", "Challenger calculation")}</h2>
      {prepared.state === "ready" ? <form className="challenger-form" onSubmit={event => { event.preventDefault(); void run(); }}>
        <p id="challenger-date-help">{t(
          "Расчёт использует наблюдения и события исходного snapshot. Для другой даты укажите время с часовым поясом.",
          "The calculation uses observations and events in the source snapshot. For another date, enter a time with a timezone.",
        )}</p>
        <label className="research-search">
          <span>{t("Дата оценки", "Evaluation time")}</span>
          <input type="text" autoComplete="off" spellCheck={false} maxLength={40} value={requested}
            aria-describedby={error ? "challenger-date-help challenger-error" : "challenger-date-help"}
            onChange={event => { changes.current.sequence++; setRequested(event.target.value); }} disabled={busy} />
        </label>
        <div className="research-actions">
          <button type="submit" disabled={busy}>{t("Пересчитать Challenger", "Recalculate Challenger")}</button>
          {busy && <span role="status">{t("Вычисление…", "Calculating…")}</span>}
        </div>
        {error && <p id="challenger-error" className="alert error" role="alert">{t("Расчёт отклонён.", "Calculation rejected.")} {error}</p>}
      </form> : <p role="status">{unavailableText[prepared.state][lang === "ru" ? 0 : 1]}</p>}
    </section>
    {result && <LocalResult value={result} pack={pack} lang={lang} download={download} />}
  </>;
}
