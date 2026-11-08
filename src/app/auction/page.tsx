import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { AuctionSchedule } from "@/components/auction/AuctionSchedule";
import { AuctionEndedNotice, AuctionStatusBadge } from "@/components/auction/AuctionStatus";
import { auction } from "@/content/auction";
import { getPropertyBySlug } from "@/content/properties";
import { jeddahImages } from "@/content/company";
import { formatArea, formatSar } from "@/lib/format";

export const metadata: Metadata = {
  title: auction.name,
  description: `${auction.name}: أربعة عقارات في جدة، من ${auction.startLabel} إلى ${auction.endLabel} عبر ${auction.platformName}.`,
};

export default function AuctionPage() {
  const items = auction.propertySlugs.map((slug) => getPropertyBySlug(slug)).filter((p) => p !== undefined);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy-900 text-ivory-50">
        <Image src={jeddahImages.aerialNorth.src} alt="" fill sizes="100vw" priority className="object-cover object-center opacity-50" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-900/40" />
        <Container className="relative grid gap-12 py-20 sm:py-28 lg:grid-cols-12 lg:items-end">
          <div className="space-y-6 lg:col-span-7">
            <Eyebrow tone="light">المزاد الإلكتروني</Eyebrow>
            <h1 className="text-5xl font-semibold leading-[1.1] sm:text-6xl lg:text-7xl">{auction.name}</h1>
            <p className="max-w-xl text-lg text-ivory-100/85">
              أربعة عقارات في أحياء الزهور والمروج والوفاء والعبير، تُطرح إلكترونيًا عبر {auction.platformName}.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <AuctionStatusBadge tone="light" />
            </div>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <a
                href={auction.brochurePath}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-ivory-200/70 px-6 py-3 text-base font-medium text-ivory-50 transition-colors hover:bg-ivory-50 hover:text-navy-900"
              >
                فتح كتيب المزاد الأصلي (PDF)
              </a>
              <a
                href={auction.platformUrl}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-12 items-center justify-center gap-2 px-6 py-3 text-base font-medium text-ivory-50 underline-offset-4 hover:underline"
              >
                {auction.platformName} ↗
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <AuctionSchedule tone="light" />
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="space-y-12">
          <AuctionEndedNotice />
          <SectionHeading eyebrow="عقارات المزاد" title="أربعة عقارات" lead="بترتيبها في الكتيب. افتح أي عقار للاطلاع على الحدود والأطوال وبيانات الوثيقة." />
          <ol className="divide-y divide-navy-900/15 border-y border-navy-900/15">
            {items.map((p) => (
              <li key={p.slug}>
                <Link href={`/properties/${p.slug}`} className="group grid items-center gap-6 py-6 sm:grid-cols-[4rem_10rem_1fr_auto] lg:grid-cols-[5rem_14rem_1fr_auto]">
                  <span className="num text-3xl font-light text-navy-600">{String(p.order).padStart(2, "0")}</span>
                  <span className="relative block aspect-[16/10] overflow-hidden bg-navy-900 sm:aspect-[4/3]">
                    <Image src={p.image.src} alt="" fill sizes="(min-width:1024px) 14rem, (min-width:640px) 10rem, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  </span>
                  <span className="space-y-1">
                    <span className="block text-2xl font-semibold text-navy-900 group-hover:text-navy-600">{p.name}</span>
                    <span className="block text-navy-800">{p.frontage}</span>
                    <span className="block text-sm text-muted">حي {p.district} · {p.deedStatus}</span>
                  </span>
                  <span className="num flex gap-8 text-start sm:flex-col sm:gap-1 sm:text-end">
                    <span>
                      <span className="block text-xs text-muted">المساحة</span>
                      <span className="block text-xl font-medium text-navy-900">{formatArea(p.areaSqm)} م²</span>
                    </span>
                    <span>
                      <span className="block text-xs text-muted">سعر الافتتاح</span>
                      <span className="block text-xl font-medium text-navy-900">{formatSar(p.openingPriceSar)} ريال</span>
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-t border-navy-900/15 bg-ivory-50 py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="كيف تشارك" title="خطوات المشاركة في المزاد الإلكتروني" lead={`المشاركة والمزايدة تتم عبر ${auction.platformName} وليس عبر هذا الموقع.`} />
          </div>
          <ol className="grid gap-px bg-navy-900/15 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
            {auction.steps.map((s) => (
              <li key={s.number} className="flex min-h-40 flex-col justify-between bg-ivory-50 p-6">
                <span className="num text-3xl font-light text-navy-600">{s.number}</span>
                <span className="text-lg font-medium text-navy-900">{s.title}</span>
              </li>
            ))}
            <li aria-hidden className="hidden bg-ivory-50 sm:block" />
          </ol>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="شروط المزاد" title="شروط التسجيل في منصة المزاد الإلكتروني" lead="منقولة من كتيب المزاد. النص المعتمد هو ما تنشره المنصة والجهة المنظمة." />
          </div>
          <ol className="space-y-6 lg:col-span-8">
            {auction.terms.map((t, i) => (
              <li key={i} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-navy-900/15 pb-6">
                <span className="num pt-1 text-sm font-medium tracking-[0.2em] text-navy-600">{String(i + 1).padStart(2, "0")}</span>
                <p className="leading-relaxed text-navy-800">{t}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-t border-navy-900/15 bg-navy-900 py-16 text-ivory-50 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="space-y-4 lg:col-span-8">
            <Eyebrow tone="light">كما ورد في الكتيب</Eyebrow>
            <p className="text-xl leading-relaxed text-ivory-100">{auction.approvalNote}</p>
            <p className="text-sm text-ivory-200/70">يقام المزاد إلكترونيًا عبر {auction.platformName}.</p>
          </div>
          <div className="flex flex-col gap-3 lg:col-span-4">
            <ButtonLink href="/interest" variant="outline-light">سجّل اهتمامك بعقارات المزاد</ButtonLink>
            <a href={auction.brochurePath} target="_blank" rel="noopener" className="text-center text-sm text-ivory-200 underline-offset-4 hover:underline">
              كتيب المزاد الأصلي (PDF)
            </a>
          </div>
        </Container>
      </section>
    </>
  );
}
