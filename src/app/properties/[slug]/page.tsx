import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ButtonLink } from "@/components/ui/Button";
import { PropertyBoundaries, PropertyFacts } from "@/components/properties/PropertyFacts";
import { AuctionStatusBadge } from "@/components/auction/AuctionStatus";
import { PROPERTY_TYPE_LABELS, getPropertyBySlug, properties } from "@/content/properties";
import { auction } from "@/content/auction";
import { formatArea, formatSar } from "@/lib/format";

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/properties/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) return { title: "عقار غير موجود" };
  return {
    title: `${property.name} — حي ${property.district}`,
    description: `${property.name}: ${property.frontage}، المساحة ${formatArea(property.areaSqm)} م²، سعر الافتتاح ${formatSar(property.openingPriceSar)} ريال.`,
  };
}

export default async function PropertyPage({ params }: PageProps<"/properties/[slug]">) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);
  if (!property) notFound();

  const others = properties.filter((p) => p.slug !== property.slug);
  const prev = properties.find((p) => p.order === property.order - 1);
  const next = properties.find((p) => p.order === property.order + 1);

  return (
    <>
      {/* الصورة الكبيرة */}
      <section className="relative isolate bg-navy-900 text-ivory-50">
        <div className="relative h-[78svh] min-h-[520px] w-full">
          <Image
            src={property.image.src}
            alt={property.image.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/35 to-black/25" />
        </div>
        <Container className="relative -mt-44 pb-12 sm:-mt-52">
          <nav aria-label="مسار الصفحة" className="mb-6 text-sm text-ivory-200/80">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="inline-block py-2 hover:text-ivory-50">الرئيسية</Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/properties" className="inline-block py-2 hover:text-ivory-50">العقارات</Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-ivory-50">{property.name}</li>
            </ol>
          </nav>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4">
              <Eyebrow tone="light">
                العقار {["الأول", "الثاني", "الثالث", "الرابع"][property.order - 1] ?? property.order} · {PROPERTY_TYPE_LABELS[property.type]} · حي {property.district}
              </Eyebrow>
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl">{property.name}</h1>
              <p className="text-xl text-ivory-100/90">{property.frontage}</p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <AuctionStatusBadge tone="light" />
                <Link href="/auction" className="inline-flex min-h-8 items-center text-sm text-ivory-200 underline-offset-4 hover:underline">
                  ضمن {auction.name}
                </Link>
              </div>
            </div>
            <p className="num shrink-0 leading-none">
              <span className="block text-6xl font-light sm:text-7xl">{formatArea(property.areaSqm)}</span>
              <span className="mt-2 block text-sm text-ivory-200/80">متر مربع — المساحة</span>
            </p>
          </div>
        </Container>
      </section>

      {/* التفاصيل */}
      <section className="py-16 sm:py-20">
        <Container className="grid gap-14 lg:grid-cols-12">
          <div className="space-y-14 lg:col-span-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-navy-900">بيانات العقار</h2>
              <PropertyFacts property={property} />
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-navy-900">الحدود والأطوال</h2>
              <PropertyBoundaries property={property} />
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-navy-900/15 pt-6 text-sm">
              {property.externalPhotosUrl ? (
                <a href={property.externalPhotosUrl} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center font-medium text-navy-900 underline-offset-4 hover:underline">
                  صور إضافية (رابط من الكتيب) ↗
                </a>
              ) : null}
              <a href={auction.brochurePath} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center font-medium text-navy-900 underline-offset-4 hover:underline">
                كتيب المزاد الأصلي (PDF) ↗
              </a>
              <p className="inline-flex min-h-11 items-center text-muted">الموقع على الخريطة: غير متوفر في الكتيب.</p>
            </div>
          </div>

          {/* شريط الاهتمام */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-6 border border-navy-900/20 bg-ivory-50 p-6 sm:p-8">
              <div className="space-y-1">
                <p className="text-sm text-muted">سعر الافتتاح</p>
                <p className="num text-3xl font-light text-navy-900">
                  {formatSar(property.openingPriceSar)} <span className="text-base font-normal text-muted">ريال</span>
                </p>
              </div>
              <dl className="grid grid-cols-2 gap-4 border-y border-navy-900/15 py-4 text-sm">
                <div>
                  <dt className="text-muted">مبلغ الدخول</dt>
                  <dd className="num mt-0.5 font-medium text-navy-900">{formatSar(property.depositSar)} ريال</dd>
                </div>
                <div>
                  <dt className="text-muted">حالة الوثيقة</dt>
                  <dd className="mt-0.5 font-medium text-navy-900">{property.deedStatus}</dd>
                </div>
              </dl>
              <ButtonLink href={`/interest?property=${property.slug}`} className="w-full">
                سجّل اهتمامك بهذا العقار
              </ButtonLink>
              <p className="text-xs leading-relaxed text-muted">
                المزايدة تتم حصريًا عبر {auction.platformName}. تسجيل الاهتمام هنا للتواصل فقط، ولا يُعد مشاركة في المزاد.
              </p>
            </div>
          </aside>
        </Container>
      </section>

      {/* التنقل بين العقارات */}
      <section className="border-t border-navy-900/15 bg-ivory-50 py-14">
        <Container className="space-y-8">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-navy-900">عقارات أخرى في المزاد</h2>
            <div className="flex gap-4 text-sm">
              {prev ? <Link href={`/properties/${prev.slug}`} className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">→ {prev.name}</Link> : null}
              {next ? <Link href={`/properties/${next.slug}`} className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">{next.name} ←</Link> : null}
            </div>
          </div>
          <ul className="grid gap-6 sm:grid-cols-3">
            {others.map((p) => (
              <li key={p.slug}>
                <Link href={`/properties/${p.slug}`} className="group block">
                  <span className="relative block aspect-[16/10] overflow-hidden bg-navy-900">
                    <Image src={p.image.src} alt="" fill sizes="(min-width:640px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  </span>
                  <span className="mt-3 flex items-baseline justify-between gap-3">
                    <span className="font-medium text-navy-900">{p.name}</span>
                    <span className="num text-sm text-muted">{formatArea(p.areaSqm)} م²</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
