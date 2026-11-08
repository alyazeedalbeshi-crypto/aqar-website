import { auction } from "@/content/auction";

/** جدول مواعيد المزاد كما في الكتيب، بخطوط فاصلة بدل البطاقات */
export function AuctionSchedule({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const label = tone === "light" ? "text-ivory-200/70" : "text-muted";
  const value = tone === "light" ? "text-ivory-50" : "text-navy-900";
  const border = tone === "light" ? "divide-ivory-50/15 border-ivory-50/15" : "divide-navy-900/15 border-navy-900/15";
  const items = [
    { k: "يبدأ المزاد", v: `${auction.startLabel} · ${auction.startTimeLabel}` },
    { k: "ينتهي المزاد", v: `${auction.endLabel} · ${auction.endTimeLabel}` },
    { k: "التاريخ الهجري", v: auction.hijriLabel },
    { k: "المنصة", v: auction.platformName },
  ];
  return (
    <dl className={`divide-y border-y ${border}`}>
      {items.map((it) => (
        <div key={it.k} className="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6">
          <dt className={`text-sm ${label}`}>{it.k}</dt>
          <dd className={`num text-lg font-medium ${value}`}>{it.v}</dd>
        </div>
      ))}
    </dl>
  );
}
