import { artifactOrigin, display, fields, interval, records, strings } from "@/lib/research-context";
import type { ResearchFields } from "@/lib/research-context";
import { timestamp } from "@/lib/challenger-engine";
import { registryPath } from "@/lib/research-package";
import type { ResearchPackage } from "@/lib/research-package";
import { ArtifactChecks, ArtifactSource, Facts, ReviewEvidence, SourceLinks } from "./research-context";
import type { Translate } from "./research-context";

function atCutoff(reviewedAt: string, asOf: unknown) {
  try {
    const review = timestamp(reviewedAt, "reviewed_at");
    const cutoff = timestamp(asOf, "cutoff");
    return review !== null && cutoff !== null && review <= cutoff;
  } catch {
    return false;
  }
}

export function CalculationContext({ pack, path, artifact, snapshot, result, asOf, t, local = false }: {
  pack: ResearchPackage; path: string; artifact: ResearchFields; snapshot: ResearchFields;
  result: ResearchFields; asOf: unknown; t: Translate; local?: boolean;
}) {
  const coreResults = fields(result.core_factors);
  const coreInputs = fields(snapshot.core);
  const adjustments = fields(result.event_adjustments);
  const assessments = fields(artifact.event_assessments);
  const inputEvents = records(snapshot.events);
  const included = strings(result.used_event_ids);
  const excluded = records(result.excluded_events);
  const references = pack.manifest.files.filter(file => file.path.startsWith("research/challenger/sources/"));
  const origin = artifactOrigin(pack, path);
  const unresolved = fields(artifact.unresolved);

  return <div className="calculation-context">
    <ArtifactSource pack={pack} path={path}/>
    <Facts rows={[
      [t("Срез расчёта", "Calculation cutoff"), display(asOf)],
      [t("Комплектность входного артефакта", "Input artifact completeness"), display(artifact.data_status)],
      [t("Статус результата", "Result status"), display(result.status)],
      [t("Статус проверки артефакта", "Artifact review status"), display(local ? result.review_status : artifact.review_status ?? result.review_status)],
      [t("Итоговый балл или интервал", "Final score or interval"), result.final_exact_score == null ? interval(result.final_interval) : display(result.final_exact_score)],
      [t("Покрытие основных факторов, %", "Core coverage, %"), display(result.core_coverage_pct)],
      [t("Событийная поправка", "Event adjustment"), display(result.event_total_adjustment)],
    ]}/>
    <h3>{t("Основные факторы", "Core factors")}</h3>
    {(["R1", "R2", "R4"] as const).map(factor => {
      const core = fields(coreResults[factor]);
      const input = fields(coreInputs[factor]);
      const observations = fields(input.observations);
      const roster = fields(input.roster);
      const missing = fields(core.missing_or_stale);
      const issuers = [...new Set([...Object.keys(roster), ...Object.keys(observations), ...Object.keys(missing)])];
      return <details key={factor} className="research-attachments">
        <summary>{factor} · {interval(core.level_bounds)} · {t("Покрытие", "Coverage")} {display(core.coverage_pct)}{core.coverage_pct != null && "%"}</summary>
        <Facts rows={[
          [t("Точный уровень", "Exact level"), display(core.exact_level)],
          [t("Покрытие по группам", "Coverage by stratum"), Object.entries(fields(core.strata_coverage_pct)).map(([key, value]) => `${key}: ${display(value)}%`).join(" · ") || "UNKNOWN"],
        ]}/>
        {issuers.length ? <div className="research-table-scroll context-table" tabIndex={0} role="region" aria-label={`${factor} ${t("наблюдения", "observations")}`}>
          <table>
            <thead><tr>{[
              t("Эмитент", "Issuer"), t("Уровень в расчёте", "Level in calculation"), t("Допустимость", "Eligibility"),
              t("Публичность и основание", "Availability and basis"), t("Действительно до", "Valid until"), t("Источник и измерение", "Source and measurement"),
            ].map(label => <th key={label} scope="col">{label}</th>)}</tr></thead>
            <tbody>{issuers.sort().map(issuer => {
              const obs = fields(observations[issuer]);
              const used = Object.hasOwn(core, "missing_or_stale") && !Object.hasOwn(missing, issuer) && display(obs.level) !== "UNKNOWN";
              return <tr key={issuer}><th scope="row">{issuer}</th><td>{used ? display(obs.level) : "UNKNOWN"}</td>
                <td>{used ? t("Учтён", "Included") : display(missing[issuer])}</td>
                <td>{display(obs.first_public_at ?? obs.known_public_by_at)}<br/>{display(obs.availability_basis)}</td>
                <td>{display(obs.valid_until)}</td>
                <td>{display(obs.source_class)}<SourceLinks pack={pack} fromPath={path} refs={strings([obs.source_url])}/>
                  {typeof obs.measurement === "string" && <details><summary>{t("Измерение и оговорки", "Measurement and caveats")}</summary>
                    <p>{obs.measurement}</p><p>{display(obs.rationale)}</p><p>{display(obs.counterevidence)}</p></details>}</td>
              </tr>;
            })}</tbody>
          </table>
        </div> : <p>UNKNOWN</p>}
      </details>;
    })}
    <h3>{t("Событийные факторы", "Event factors")}</h3>
    {(["R3", "R5", "R6", "R7"] as const).map(factor => {
      const assessment = fields(assessments[factor]);
      const inputs = inputEvents.filter(item => item.factor === factor);
      return <details className="research-attachments" key={factor}>
        <summary>{factor} · {display(adjustments[factor])} · {display(assessment.status)}</summary>
        <Facts rows={[
          [t("Оценка в исходном артефакте", "Assessment in source artifact"), display(assessment.reason)],
          [t("Проверено", "Reviewed at"), display(assessment.reviewed_at)],
          [t("Последний источник публичен не позднее", "Latest source public by"), display(assessment.latest_source_public_by_at)],
          [t("Контрдоказательства", "Counterevidence"), display(assessment.counterevidence)],
          [t("Источники оценки", "Assessment sources"), <SourceLinks key="sources" pack={pack} fromPath={path} refs={strings(assessment.source_refs)}/>],
        ]}/>
        {inputs.map((item, index) => {
          const id = display(item.id);
          const exclusion = excluded.find(entry => entry.id === id);
          const event = pack.events.find(entry => entry.id === id);
          // Proposed inputs may derive from a different registry revision than the active main registry.
          const reviews = origin === "PROPOSED" ? [] : event?.reviews.filter(review => atCutoff(review.reviewed_at, asOf)) ?? [];
          return <section key={`${id}-${index}`}>
            <h4>{id}</h4>
            <Facts rows={[
              [t("Учёт в результате", "Result inclusion"), included.includes(id) ? t("Учтено", "Included") : display(exclusion?.reason)],
              [t("Класс источника", "Source class"), display(item.source_class)],
              [t("Политика квалификации", "Qualification policy"), display(item.qualification_policy)],
              [t("Проверить до", "Review by"), display(item.review_by)],
              [t("Истекает", "Expires at"), display(item.expires_at)],
              [t("Числовой вход до применения правил", "Numeric input before applying rules"), display(item.impact)],
              [t("Доказательства", "Evidence"), <SourceLinks key="sources" pack={pack} fromPath={path} refs={strings([item.source_url, item.publication_proof_url, fields(item.observable_outcome).corroboration_url])}/>],
            ]}/>
            <details className="research-attachments">
              <summary>{t("Исторические ревью к срезу расчёта", "Historical reviews by calculation cutoff")}</summary>
              {reviews.length ? <><ArtifactSource pack={pack} path={registryPath}/>
                <ol>{reviews.map((review, i) => <ReviewEvidence key={i} review={review} pack={pack} t={t}/>)}</ol></> : <p>UNKNOWN</p>}
            </details>
          </section>;
        })}
      </details>;
    })}
    {!local && Object.keys(unresolved).length > 0 && <details className="research-attachments">
      <summary>{t("Незавершённые проверки в артефакте", "Unresolved checks in artifact")}</summary>
      <ArtifactChecks unresolved={unresolved} result={result} pack={pack} t={t}/>
    </details>}
    <Facts rows={[
      [t("Учтённые события по артефакту", "Included events recorded in result"), Array.isArray(result.used_event_ids) ? included.join(", ") || "—" : "UNKNOWN"],
      [t("Исключения по артефакту", "Exclusions recorded in result"), Array.isArray(result.excluded_events)
        ? excluded.map(item => `${display(item.id)}: ${display(item.reason)}`).join(" · ") || "—" : "UNKNOWN"],
      [t("Источники артефакта", "Artifact sources"), <SourceLinks key="sources" pack={pack} fromPath={path} refs={strings(artifact.source_refs)}/>],
      [t("Справочные реестры допустимости", "Reference source eligibility registers"),
        <SourceLinks key="sources" pack={pack} fromPath={path} refs={references.map(file => file.path)}/>],
    ]}/>
  </div>;
}
