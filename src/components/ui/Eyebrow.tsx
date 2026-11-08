import type { ReactNode } from "react";

/** سطر تمهيدي صغير فوق العناوين، بخط فاصل قصير بأسلوب الكتيب */
export function Eyebrow({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" }) {
  const color = tone === "light" ? "text-sky-300" : "text-navy-600";
  return (
    <p className={`flex items-center gap-3 text-sm font-medium tracking-wide-ar ${color}`}>
      <span aria-hidden className="inline-block h-px w-8 bg-current" />
      {children}
    </p>
  );
}
