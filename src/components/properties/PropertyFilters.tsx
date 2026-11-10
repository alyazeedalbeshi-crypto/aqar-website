"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { PROPERTY_TYPE_LABELS, type Property, type PropertyType } from "@/content/properties";
import { PropertyCard } from "./PropertyCard";

const ALL = "all";

export function PropertyFilters({
  properties,
  districts,
  types,
}: {
  properties: Property[];
  districts: string[];
  types: PropertyType[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const type = searchParams.get("type") ?? ALL;
  const district = searchParams.get("district") ?? ALL;

  const filtered = useMemo(
    () =>
      properties.filter(
        (p) => (type === ALL || p.type === type) && (district === ALL || p.district === district),
      ),
    [properties, type, district],
  );

  function update(key: "type" | "district", value: string) {
    const next = new URLSearchParams(searchParams.toString());
    if (value === ALL) next.delete(key);
    else next.set(key, value);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  function reset() {
    router.replace(pathname, { scroll: false });
  }

  const hasFilters = type !== ALL || district !== ALL;

  return (
    <div className="space-y-10">
      <form
        className="flex flex-col gap-6 border-y border-navy-900/15 py-6 md:flex-row md:items-end md:justify-between"
        onSubmit={(e) => e.preventDefault()}
        aria-label="تصفية العقارات"
      >
        <div className="grid flex-1 gap-6 sm:grid-cols-2 md:max-w-xl">
          <label className="flex flex-col gap-2 text-sm">
            <span className="text-muted">النوع</span>
            <select
              value={type}
              onChange={(e) => update("type", e.target.value)}
              className="min-h-12 border border-navy-900/30 bg-ivory-50 px-3 text-base text-navy-900"
            >
              <option value={ALL}>كل الأنواع</option>
              {types.map((t) => (
                <option key={t} value={t}>
                  {PROPERTY_TYPE_LABELS[t]}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm">
            <span className="text-muted">الحي</span>
            <select
              value={district}
              onChange={(e) => update("district", e.target.value)}
              className="min-h-12 border border-navy-900/30 bg-ivory-50 px-3 text-base text-navy-900"
            >
              <option value={ALL}>كل الأحياء</option>
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex items-center justify-between gap-4 text-sm md:justify-end">
          <p className="num text-muted" aria-live="polite">
            {filtered.length} من {properties.length} عقارات
          </p>
          {hasFilters ? (
            <button type="button" onClick={reset} className="min-h-11 text-navy-900 underline underline-offset-4">
              مسح التصفية
            </button>
          ) : null}
        </div>
      </form>

      {filtered.length === 0 ? (
        <p className="border border-dashed border-navy-900/30 p-10 text-center text-muted">
          لا توجد عقارات مطابقة لهذه التصفية.
        </p>
      ) : (
        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((p, i) => (
            <PropertyCard key={p.slug} property={p} priority={i < 2} />
          ))}
        </div>
      )}
    </div>
  );
}
