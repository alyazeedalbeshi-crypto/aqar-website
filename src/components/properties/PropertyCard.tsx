import Image from "next/image";
import Link from "next/link";
import { PROPERTY_TYPE_LABELS, type Property } from "@/content/properties";
import { formatArea, formatSar } from "@/lib/format";

/**
 * بطاقة عقار بأسلوب تحريري: صورة كبيرة بزوايا حادة، رقم تسلسلي كما في الكتيب، وحقائق مفصولة بخطوط رفيعة.
 */
export function PropertyCard({ property, priority = false }: { property: Property; priority?: boolean }) {
  const href = `/properties/${property.slug}`;
  return (
    <article className="group flex flex-col border-b border-navy-900/15 pb-8">
      <Link href={href} className="relative block aspect-[16/10] overflow-hidden bg-navy-900">
        <Image
          src={property.image.src}
          alt={property.image.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority={priority}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <span className="num absolute top-0 right-0 bg-navy-900/90 px-3 py-2 text-sm font-medium tracking-[0.2em] text-sky-300">
          {String(property.order).padStart(2, "0")}
        </span>
      </Link>

      <div className="mt-6 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted">
              {PROPERTY_TYPE_LABELS[property.type]} · حي {property.district}، {property.city}
            </p>
            <h3 className="mt-1 text-2xl font-semibold text-navy-900">
              <Link href={href} className="hover:text-navy-600">
                {property.name}
              </Link>
            </h3>
          </div>
          <p className="num shrink-0 text-end leading-none">
            <span className="block text-3xl font-light text-navy-900">{formatArea(property.areaSqm)}</span>
            <span className="mt-1 block text-xs text-muted">متر مربع</span>
          </p>
        </div>

        <p className="text-base text-navy-800">{property.frontage}</p>

        <dl className="grid grid-cols-2 gap-x-6 border-t border-navy-900/15 pt-4 text-sm">
          <div>
            <dt className="text-muted">سعر الافتتاح</dt>
            <dd className="num mt-0.5 font-medium text-navy-900">{formatSar(property.openingPriceSar)} ريال</dd>
          </div>
          <div>
            <dt className="text-muted">مبلغ الدخول</dt>
            <dd className="num mt-0.5 font-medium text-navy-900">{formatSar(property.depositSar)} ريال</dd>
          </div>
        </dl>

        <div className="flex flex-wrap items-center gap-x-6 text-sm font-medium">
          <Link href={href} className="inline-flex min-h-11 items-center text-navy-900 underline-offset-4 hover:underline">
            تفاصيل العقار ←
          </Link>
          <Link href={`/interest?property=${property.slug}`} className="inline-flex min-h-11 items-center text-navy-600 underline-offset-4 hover:underline">
            سجّل اهتمامك
          </Link>
        </div>
      </div>
    </article>
  );
}
