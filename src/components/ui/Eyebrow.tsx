import type { ReactNode } from "react";

/** سطر تمهيدي صغير فوق العناوين، بخط فاصل قصير بأسلوب الكتيب */
export function Eyebrow({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" }) {
  const color = tone === "light" ? "text-ivory-200/80" : "text-muted";
  return (
    <p className={`flex items-center gap-3 text-[13px] font-normal tracking-wide-ar ${color}`}>
      <span aria-hidden className="inline-block h-px w-8 bg-current" />
      {children}
    </p>
  );
}
