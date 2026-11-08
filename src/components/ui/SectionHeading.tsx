import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "dark",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "dark" | "light";
  as?: "h1" | "h2" | "h3";
}) {
  const titleColor = tone === "light" ? "text-ivory-50" : "text-navy-900";
  const leadColor = tone === "light" ? "text-ivory-200/85" : "text-muted";
  return (
    <div className="max-w-3xl space-y-4">
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <Tag className={`text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl ${titleColor}`}>{title}</Tag>
      {lead ? <p className={`text-lg leading-relaxed ${leadColor}`}>{lead}</p> : null}
    </div>
  );
}
