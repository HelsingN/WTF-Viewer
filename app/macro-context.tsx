import { display, fields, interval, records, researchJson, strings } from "@/lib/research-context";
import type { ResearchPackage } from "@/lib/research-package";
import { ArtifactSource, Facts, SourceLinks } from "./research-context";
import type { Translate } from "./research-context";

export function MacroContext({ pack, t, openEvent }: {
  pack: ResearchPackage; t: Translate; openEvent: (id: string) => void;
}) {
  const sources = pack.manifest.files.filter(({ path }) => /\/(?:macro_event_comparison|event_strength_coverage)_[\w-]+\.json$/.test(path))
    .map(({ path }) => ({ path, data: researchJson(pack, path) }));
  const comparisons = sources.filter(({ data }) => data.schema === "AI_CAPEX_MACRO_COMPARISON_V1")
    .sort((left, right) => display(right.data.cutoff).localeCompare(display(left.data.cutoff)));
  const updates = sources.filter(({ data }) => data.schema === "AI_CAPEX_EVENT_STRENGTH_CURRENT_COVERAGE_V1" && Array.isArray(data.macro_added_unranked))
    .sort((left, right) => display(right.data.as_of).localeCompare(display(left.data.as_of)));
  const eventIds = new Set(pack.events.map(event => event.id));
  const eventLink = (id: string) => eventIds.has(id)
    ? <button type="button" className="context-event-link" onClick={() => openEvent(id)}><code>{id}</code></button> : <code>{id}</code>;
  return <section className="panel research-preview" aria-labelledby="macro-title">
    <h2 id="macro-title">{t("Макроанализ", "Macro analysis")}</h2>
    {!comparisons.length && !updates.length && <p>{t("Макроанализ в пакете", "Macro analysis in package")} · UNKNOWN</p>}
    {comparisons.map(({ path, data }) => {
      const aggregate = fields(data.aggregate);
      const rows = records(data.rows).sort((a, b) => (typeof a.rank === "number" ? a.rank : Infinity) - (typeof b.rank === "number" ? b.rank : Infinity));
      return <details key={path} className="research-attachments">
        <summary>{t("Сравнение макрособытий", "Macro event comparison")} · {display(data.cutoff)}</summary>
        <ArtifactSource pack={pack} path={path}/>
        <p>{display(fields(data.method).purpose)}</p>
        <p>{display(data.source_scope)}</p>
        <div className="research-table-scroll context-table" tabIndex={0} role="region" aria-label={t("Ранги макрособытий", "Macro event ranks")}>
          <table><thead><tr>{[
            t("Ранг", "Rank"), t("Событие", "Event"), t("Приоритет", "Priority index"), t("Передача и пересечение", "Transmission and overlap"), t("Сопоставимость и ограничения", "Comparability and limits"),
          ].map(label => <th key={label} scope="col">{label}</th>)}</tr></thead>
          <tbody>{rows.map((row, i) => <tr key={i}>
            <td>{display(row.rank)}</td>
            <td>{display(row.title)}<br/>{eventLink(display(row.id))}</td>
            <td>{display(row.priority_index)} · {display(row.tier)}</td>
            <td>{display(row.channel)} · {display(row.overlap_group)}<p>{display(row.financing_path)} · {display(row.demand_path)}</p></td>
            <td>{display(row.saved_observation)}<p>{display(row.comparability)}</p><p>{display(row.dependence_limit)}</p></td>
          </tr>)}</tbody></table>
        </div>
        <h3>{t("Совокупный эффект по источнику", "Joint effect from source")}</h3>
        <Facts rows={[
          [t("Статус", "Status"), display(aggregate.status)],
          [t("Потенциальное направление", "Potential direction"), display(aggregate.potential_direction)],
          [t("Числовая оценка совокупного эффекта", "Numeric estimate of joint effect"), display(aggregate.numeric_aggregate_estimate)],
          [t("Интервал Macro Pain в отдельном артефакте", "Macro Pain interval in separate artifact"), interval(aggregate.approved_macro_pain_interval)],
          [t("Источник Macro Pain", "Macro Pain source"), <SourceLinks key="sources" pack={pack} fromPath={path} refs={strings([aggregate.approved_macro_pain_source])}/>],
        ]}/>
        <ul className="research-list">{records(aggregate.channels).map((channel, i) => <li key={i}>
          <strong>{display(channel.channel)} · {display(channel.state)}</strong>
          <p>{display(channel.economic_path)}</p><p>{display(channel.effect_size)}</p>
          <Facts rows={[
            [t("Опорные события", "Anchors"), strings(channel.anchors).join(", ") || "UNKNOWN"],
            [t("Подтверждения", "Corroborating events"), strings(channel.reinforcing).join(", ") || "—"],
            [t("Контрдоказательства", "Counterevidence"), strings(channel.counterevidence).join(", ") || "—"],
          ]}/>
        </li>)}</ul>
        <h3>{t("Пересечения и ограничения", "Overlaps and limitations")}</h3>
        <ul>{strings(aggregate.causal_overlaps).map(note => <li key={note}>{note}</li>)}</ul>
        <p>{display(aggregate.macro_pain_note)}</p>
        <h3>{t("Сценарии из источника", "Scenarios from source")}</h3>
        <ul className="research-list">{records(aggregate.scenarios).map((scenario, i) =>
          <li key={i}><strong>{display(scenario.name)}</strong><p>{display(scenario.premises)}</p>
            <p>{display(scenario.potential_effect)}</p><p>{display(scenario.missing_trigger)}</p></li>)}</ul>
      </details>;
    })}
    {updates.map(({ path, data }) => <details key={path} className="research-attachments">
      <summary>{t("Покрытие и события без ранга", "Coverage and unranked events")} · {display(data.as_of)}</summary>
      <ArtifactSource pack={pack} path={path}/>
      <p>{display(data.macro_joint_effect)}</p><p>{display(data.limits)}</p>
      <ul className="research-list">{records(data.macro_added_unranked).map((row, i) => <li key={i}>
        <strong>{display(row.entity)} · {display(row.event_date)}</strong> {eventLink(display(row.id))}
        <Facts rows={[
          [t("Ранг", "Rank"), display(row.relative_macro_rank)],
          [t("Источники", "Sources"), <SourceLinks key="sources" pack={pack} fromPath={path} refs={strings(row.source_refs)}/>],
        ]}/>
      </li>)}</ul>
    </details>)}
  </section>;
}
