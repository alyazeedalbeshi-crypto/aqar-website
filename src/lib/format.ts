const sarFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const areaFormatter = new Intl.NumberFormat("en-US", { maximumFractionDigits: 1 });

/** يعرض المبالغ بأرقام غربية كما في الكتيب، مع فاصل الآلاف */
export function formatSar(value: number): string {
  return sarFormatter.format(value);
}

export function formatArea(value: number): string {
  return areaFormatter.format(value);
}
