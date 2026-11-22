import { display } from "@/lib/research-context";
import type { ResearchPackage } from "@/lib/research-package";
import { EventStatuses, ResearchStatus } from "./research-status";
import type { Translate } from "./research-context";

export function EventRegister({ events, selected, t, open }: {
  events: ResearchPackage["events"]; selected: string; t: Translate; open: (id: string) => void;
}) {
  return <div className="research-table-scroll event-table" role="region" tabIndex={0}
    aria-label={t("Таблица реестра событий", "Event registry table")}>
    <table role="table">
      <thead role="rowgroup"><tr role="row">
        <th scope="col" role="columnheader">{t("Дата и ID", "Date and ID")}</th>
        <th scope="col" role="columnheader">{t("Событие", "Event")}</th>
        <th scope="col" role="columnheader">{t("Приоритет и квалификация", "Severity and qualification")}</th>
        <th scope="col" role="columnheader">{t("Фактор и направление", "Factor and direction")}</th>
      </tr></thead>
      <tbody role="rowgroup">{events.map(event => {
        const review = event.reviews.at(-1);
        return <tr role="row" key={event.id} data-selected={selected === event.id}>
          <td role="cell"><time dateTime={event.event_date}>{event.event_date}</time><br/><code>{event.id}</code></td>
          <th scope="row" role="rowheader"><button className="research-file" onClick={() => open(event.id)}
            aria-expanded={selected === event.id}>{event.title}</button><small>{event.entity}</small></th>
          <td role="cell"><EventStatuses priority={event.priority} decision={review?.decision} t={t}/></td>
          <td role="cell"><ResearchStatus label={t("Фактор", "Factor")} value={display(review?.factor)}/><br/><ResearchStatus label={t("Направление", "Direction")} value={review?.direction}/></td>
        </tr>;
      })}</tbody>
    </table>
  </div>;
}
