import { BOUNDARY_SIDE_LABELS, type Property } from "@/content/properties";
import { formatSar } from "@/lib/format";

/** جدول حقائق مفصول بخطوط رفيعة، بترتيب الكتيب */
export function PropertyFacts({ property }: { property: Property }) {
  const rows: { label: string; value: string; ltr?: boolean }[] = [
    { label: "الحي", value: `${property.district}، ${property.city}` },
    { label: "الواجهة", value: property.frontage },
    { label: "حالة الوثيقة", value: property.deedStatus },
    { label: "سعر الافتتاح", value: `${formatSar(property.openingPriceSar)} ريال` },
    { label: "مبلغ الدخول", value: `${formatSar(property.depositSar)} ريال` },
    ...property.identifiers.map((i) => ({ label: i.label, value: i.value, ltr: /\d/.test(i.value) && !/[؀-ۿ]{3,}/.test(i.value) })),
  ];

  return (
    <dl className="grid grid-cols-1 border-t border-navy-900/15 sm:grid-cols-2">
      {rows.map((row) => (
        <div key={row.label} className="flex flex-col gap-1 border-b border-navy-900/15 py-4 sm:odd:pe-8 sm:even:ps-8">
          <dt className="text-sm text-muted">{row.label}</dt>
          <dd className={`text-lg font-medium text-navy-900 ${row.ltr ? "num" : ""}`}>
            {row.ltr ? (
              <span dir="ltr" className="inline-block">
                {row.value}
              </span>
            ) : (
              row.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function PropertyBoundaries({ property }: { property: Property }) {
  const glyph: Record<string, string> = { north: "↑", south: "↓", east: "→", west: "←" };
  return (
    <ol className="divide-y divide-navy-900/15 border-y border-navy-900/15">
      {property.boundaries.map((b) => (
        <li key={b.side} className="grid grid-cols-[auto_1fr] items-baseline gap-4 py-4 sm:grid-cols-[7rem_1fr]">
          <span className="flex items-center gap-2 text-sm font-medium text-navy-600">
            <span aria-hidden className="num text-navy-900/50">
              {glyph[b.side]}
            </span>
            {BOUNDARY_SIDE_LABELS[b.side]}
          </span>
          <span className="text-base text-navy-900">{b.text}</span>
        </li>
      ))}
    </ol>
  );
}
