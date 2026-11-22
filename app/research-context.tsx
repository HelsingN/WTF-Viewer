import type { ReactNode } from "react";
import { indexPath, registryPath, targetLink } from "@/lib/research-package";
import type { Report, ResearchPackage } from "@/lib/research-package";
import { artifactOrigin, display, fields, researchJson, readWorkflowEvidence, strings } from "@/lib/research-context";
import type { ResearchFields } from "@/lib/research-context";
import { publicUrl } from "./research-document";

export type Translate = (ru: string, en: string) => string;

export function Facts({ rows }: { rows: [string, ReactNode][] }) {
  return <dl className="research-facts">{rows.map(([label, value]) =>
    <div key={label}><dt>{label}</dt><dd>{value ?? "UNKNOWN"}</dd></div>)}</dl>;
}

export function SourceLinks({ refs, pack, fromPath }: { refs: string[]; pack: ResearchPackage; fromPath?: string }) {
  const proposal = fromPath?.match(/^research\/proposed\/pr-\d+\//)?.[0];
  return refs.length ? <ul className="context-sources">{[...new Set(refs)].map(ref => {
    const migrated = [...pack.original.values()].find(item => item.source_path === ref && (proposal ? item.target_path.startsWith(proposal) : item.origin === "MAIN"));
    const href = publicUrl(ref) ?? (pack.entries.has(ref) ? targetLink(pack.manifest.target.commit, ref)
      : migrated ? targetLink(pack.manifest.target.commit, migrated.target_path) : undefined);
    return <li key={ref}>{href ? <a href={href} target="_blank" rel="noreferrer">{ref}</a> : ref}</li>;
  })}</ul> : <>UNKNOWN</>;
}

function refFields(item: ResearchFields) {
  return [...strings(item.source_refs), ...strings(item.sources_checked), ...strings(item.evidence_refs),
    ...[item.source_url, item.publication_proof_url, fields(item.observable_outcome).corroboration_url]
      .filter((value): value is string => typeof value === "string" && Boolean(value.trim()))];
}

export function ArtifactSource({ pack, path }: { pack: ResearchPackage; path: string }) {
  const origin = pack.original.get(path);
  const branch = artifactOrigin(pack, path);
  return <p className="context-origin">{branch}{branch === "PROPOSED" && path.startsWith("research/proposed/pr-")
    ? " · PR #" + path.split("/")[2].slice(3) : ""} · <a href={targetLink(pack.manifest.target.commit, path)} target="_blank" rel="noreferrer">
      GitHub <code>{pack.manifest.target.commit.slice(0, 12)}</code></a>
    {origin && <> · <a href={`https://github.com/${origin.source_repository}/blob/${origin.source_commit}/${origin.source_path.split("/").map(encodeURIComponent).join("/")}`}
      target="_blank" rel="noreferrer"><code>{origin.source_ref} · {origin.source_commit.slice(0, 12)}</code></a></>}
  </p>;
}

export function ReviewEvidence({ review, pack, t }: {
  review: ResearchPackage["events"][number]["reviews"][number]; pack: ResearchPackage; t: Translate;
}) {
  const scored = fields(review.scored_event);
  const triggers = strings(review.qualification_triggers);
  return <li>
    <p><time dateTime={review.reviewed_at}>{review.reviewed_at}</time> · {review.decision} · {review.factor ?? "UNKNOWN"} · {review.reviewer}</p>
    <p>{review.reason}</p>
    <Facts rows={[
      [t("Срок применимости", "Validity limit"), display(scored.review_by ?? scored.expires_at)],
      [t("Следующая проверка", "Next review"), display(review.next_review_at)],
      [t("Контрдоказательства", "Counterevidence"), display(review.counterevidence ?? scored.counterevidence)],
      [t("Источники проверки", "Review sources"), <SourceLinks key="sources" pack={pack} refs={[...refFields(review), ...refFields(scored)]}/>],
    ]}/>
    {triggers.length > 0 && <ul>{triggers.map(trigger => <li key={trigger}>{trigger}</li>)}</ul>}
  </li>;
}

export function WorkflowEvidence({ report, pack, t }: { report: Report; pack: ResearchPackage; t: Translate }) {
  return <details className="research-attachments">
    <summary>{t("Статусы PR из пакета", "PR status observations in package")}</summary>
    <ArtifactSource pack={pack} path={indexPath}/>
    <Facts rows={[
      [t("Ревизия исходного отчёта", "Original report revision"), display(report.source_commit)],
      [t("Состояние PR в индексе", "Indexed PR state"), display(report.source_pr_state)],
    ]}/>
    {(["ci", "review", "merge"] as const).map(key => {
      const evidence = readWorkflowEvidence(report, key);
      return <section key={key}>
        <h4>{{ ci: "CI", review: t("Ревью", "Review"), merge: t("Слияние", "Merge") }[key]}</h4>
        <Facts rows={[
          [t("Статус для ревизии отчёта", "Status for report revision"), evidence.status],
          [t("Когда наблюдался", "Observed at"), display(evidence.observed_at)],
          [t("Проверенный SHA", "Inspected SHA"), display(evidence.inspected_sha)],
          ...(evidence.priorStatus ? [[t("Наблюдение для другой ревизии", "Observation for another revision"), evidence.priorStatus] as [string, ReactNode]] : []),
        ]}/>
      </section>;
    })}
  </details>;
}

export function OpenResearchChecks({ pack, t, open, openEvent }: {
  pack: ResearchPackage; t: Translate; open: (path: string) => void; openEvent: (id: string) => void;
}) {
  const capture = pack.snapshot;
  const checks = Object.keys(capture?.data.unresolved ?? {}).length;
  const reviews = pack.events.flatMap(event => {
    const review = event.reviews.at(-1);
    return review && (review.decision === "PENDING_REVIEW" || review.decision === "EARLY_WARNING") ? [{ event, review }] : [];
  });
  return <section className="panel research-preview" aria-labelledby="research-checks">
    <h2 id="research-checks">{t("Открытые проверки Challenger", "Open Challenger checks")}</h2>
    {capture && <ArtifactSource pack={pack} path={capture.path}/>}
    {checks > 0 && capture && <>
      <ArtifactChecks unresolved={capture.data.unresolved} result={capture.data.published_result} pack={pack} t={t}/>
      <button onClick={() => open(capture.path)}>{t("Открыть артефакт", "Open artifact")}</button>
    </>}
    {reviews.length > 0 && <details className="research-attachments">
      <summary>{t("Ожидающие проверки и ранние сигналы", "Pending reviews and early warnings")} ({reviews.length})</summary>
      <ArtifactSource pack={pack} path={registryPath}/>
      <ul className="research-list">{reviews.map(({ event, review }) => <li key={event.id}>
        <button className="research-file" onClick={() => openEvent(event.id)}>{event.title}</button>
        <p><code>{event.id}</code> · {review.decision} · {review.reviewed_at}</p>
        <p>{review.reason}</p>
        <Facts rows={[
          [t("Следующее действие", "Next action"), strings(review.qualification_triggers).join(" · ") || "UNKNOWN"],
          [t("Следующая проверка", "Next review"), display(review.next_review_at)],
          [t("Источники", "Sources"), <SourceLinks key="sources" pack={pack} refs={[...refFields(review), ...event.source_refs]}/>],
        ]}/>
      </li>)}</ul>
    </details>}
    {!checks && !reviews.length && <p>{t("Записей об открытых проверках в пакете нет.", "The package contains no open-check records.")}</p>}
  </section>;
}

export function ArtifactChecks({ unresolved, result, pack, t }: {
  unresolved: ResearchFields; result: ResearchFields; pack: ResearchPackage; t: Translate;
}) {
  return <ul className="research-list">{Object.entries(unresolved).map(([id, raw]) => {
    const [factor, issuer] = id.split("/");
    const core = fields(fields(result.core_factors)[factor]);
    const check = fields(raw);
    return <li key={id}><strong>{id}</strong>
      <Facts rows={[
        [t("Статус", "Status"), display(check.status ?? fields(core.missing_or_stale)[issuer])],
        [t("Причина", "Reason"), display(check.reason)],
        [t("Следующее действие", "Next action"), display(check.next_action)],
        [t("Следующая проверка", "Next review"), display(check.next_review)],
        [t("Проверенные источники", "Sources checked"), <SourceLinks key="sources" pack={pack} refs={refFields(check)}/>],
      ]}/>
    </li>;
  })}</ul>;
}

export function WeeklyCoverage({ pack, path, t }: { pack: ResearchPackage; path: string; t: Translate }) {
  const data = researchJson(pack, path);
  if (data.schema !== "ai-capex.weekly-coverage-manifest.v1") return null;
  return <section className="weekly-coverage">
    <h3>{t("Покрытие исследований", "Research coverage")}</h3>
    <ArtifactSource pack={pack} path={path}/>
    <Facts rows={[
      [t("Комплектность", "Completeness"), display(data.data_status)],
      [t("Срез", "Cutoff"), display(data.cutoff)],
      [t("Изменения к предыдущему срезу", "Change from previous cutoff"), display(data.change_vs_previous)],
    ]}/>
    <ul className="research-list">{Object.entries(fields(data.blocks)).map(([name, value]) => {
      const block = fields(value);
      return <li key={name}><strong>{name}</strong>
        <Facts rows={[
          [t("Статус", "Status"), display(block.status)],
          [t("Актуальность по источнику", "Freshness from source"), display(block.freshness)],
          [t("Пробелы", "Coverage gaps"), Array.isArray(block.unknowns) ? strings(block.unknowns).join(" · ") || "—" : "UNKNOWN"],
        ]}/>
      </li>;
    })}</ul>
  </section>;
}
