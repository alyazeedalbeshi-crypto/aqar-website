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
    <div className="max-w-2xl space-y-4">
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <Tag className={`text-[26px] font-bold leading-snug sm:text-[32px] ${titleColor}`}>{title}</Tag>
      {lead ? <p className={`text-base leading-loose ${leadColor}`}>{lead}</p> : null}
    </div>
  );
}
