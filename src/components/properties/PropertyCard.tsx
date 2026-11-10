import Image from "next/image";
import Link from "next/link";
import { PROPERTY_TYPE_LABELS, type Property } from "@/content/properties";
import { formatArea, formatSar } from "@/lib/format";

/** بطاقة عقار: صورة طولية كبيرة ثم الاسم والحي وحقائق مختصرة بخط خفيف */
export function PropertyCard({ property, priority = false }: { property: Property; priority?: boolean }) {
  const href = `/properties/${property.slug}`;
  return (
    <article className="group flex flex-col">
      <Link href={href} className="relative block aspect-[4/5] overflow-hidden bg-navy-900">
        <Image
          src={property.image.src}
          alt={property.image.alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          priority={priority}
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </Link>

      <div className="mt-4 flex items-baseline justify-between gap-3">
        <h3 className="text-lg font-bold text-navy-900">
          <Link href={href} className="hover:text-navy-600">
            {property.name}
          </Link>
        </h3>
        <p className="num shrink-0 text-sm text-muted">{formatArea(property.areaSqm)} م²</p>
      </div>
      <p className="text-sm text-muted">
        {PROPERTY_TYPE_LABELS[property.type]} · حي {property.district}، {property.city}
      </p>
      <p className="mt-2 text-sm text-navy-800">{property.frontage}</p>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 border-t border-navy-900/15 pt-3 text-sm">
        <div>
          <dt className="text-xs text-muted">سعر الافتتاح</dt>
          <dd className="num mt-0.5 font-normal text-navy-900">{formatSar(property.openingPriceSar)} ريال</dd>
        </div>
        <div>
          <dt className="text-xs text-muted">مبلغ الدخول</dt>
          <dd className="num mt-0.5 font-normal text-navy-900">{formatSar(property.depositSar)} ريال</dd>
        </div>
      </dl>

      <div className="mt-2 flex flex-wrap items-center gap-x-6 text-sm font-semibold">
        <Link href={href} className="inline-flex min-h-11 items-center text-navy-900 underline-offset-4 hover:underline">
          تفاصيل العقار
        </Link>
        <Link href={`/interest?property=${property.slug}`} className="inline-flex min-h-11 items-center text-navy-600 underline-offset-4 hover:underline">
          سجّل اهتمامك
        </Link>
      </div>
    </article>
  );
}
