import Link from "next/link";
import { company } from "@/content/company";

/**
 * علامة نصية مؤقتة لاسم الشركة (لا يوجد شعار معتمد بعد).
 * عند اعتماد الشعار: ضع الملف في public/brand واستبدل هذا المكوّن بصورة.
 */
export function Wordmark({ tone = "light", compact = false }: { tone?: "light" | "dark"; compact?: boolean }) {
  const main = tone === "light" ? "text-ivory-50" : "text-navy-900";
  const sub = tone === "light" ? "text-sky-300" : "text-navy-600";
  return (
    <Link href="/" className="group inline-flex items-center gap-3" aria-label={`${company.name} — الصفحة الرئيسية`}>
      <span
        aria-hidden
        className={`grid h-10 w-10 place-items-center border text-lg font-semibold leading-none ${
          tone === "light" ? "border-ivory-200/60 text-ivory-50" : "border-navy-900 text-navy-900"
        }`}
      >
        أ
      </span>
      <span className="flex flex-col leading-tight">
        <span className={`text-lg font-semibold ${main}`}>{company.shortName}</span>
        {!compact ? (
          <span className={`text-[11px] tracking-[0.18em] ${sub}`}>
            {company.latinName} · العالمية للعقارات
          </span>
        ) : null}
      </span>
    </Link>
  );
}
