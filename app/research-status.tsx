import { AlertCircle, CheckCircle2, CircleDashed, CircleHelp } from "lucide-react";
import { display } from "@/lib/research-context";
import type { Translate } from "./research-context";

export function ResearchStatus({ label, value, tone = "neutral" }: {
  label?: string;
  value: unknown;
  tone?: "neutral" | "success" | "warning" | "critical";
}) {
  const text = display(value);
  const Icon = text === "UNKNOWN" ? CircleHelp : tone === "success" ? CheckCircle2
    : tone === "warning" || tone === "critical" ? AlertCircle : CircleDashed;
  return <span className="reader-status" data-tone={text === "UNKNOWN" ? "neutral" : tone}>
    <Icon size={15} aria-hidden="true"/>{label && <span>{label}</span>}<strong>{text}</strong>
  </span>;
}

export function EventStatuses({ priority, decision, direction, t }: {
  priority: string; decision: string | undefined; direction?: unknown; t: Translate;
}) {
  return <div className="reader-statuses">
    <ResearchStatus label={t("Приоритет", "Severity")} value={priority} tone={priority === "CRITICAL" ? "critical" : "warning"}/>
    <ResearchStatus label={t("Квалификация", "Qualification")} value={decision} tone={decision === "QUALIFIED" ? "success" : "neutral"}/>
    {direction !== undefined && <ResearchStatus label={t("Направление", "Direction")} value={direction}/>}
  </div>;
}

export function coverageTone(value: unknown) {
  if (value === "COMPLETE") return "success";
  if (value === "PARTIAL" || value === "INCOMPLETE" || value === "ARCHIVED_PARTIAL") return "warning";
  return "neutral";
}
