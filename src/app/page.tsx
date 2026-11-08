import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { AuctionStatusBadge } from "@/components/auction/AuctionStatus";
import { AuctionSchedule } from "@/components/auction/AuctionSchedule";
import { InterestForm } from "@/components/interest/InterestForm";
import { company, jeddahImages } from "@/content/company";
import { properties } from "@/content/properties";
import { auction } from "@/content/auction";
import { PROJECTS_DEMO_NOTICE, projectPlaceholders } from "@/content/projects";

export default function HomePage() {
  return (
    <>
      {/* الغلاف */}
      <section className="relative isolate min-h-[88svh] overflow-hidden bg-navy-900 text-ivory-50">
        <Image
          src={jeddahImages.corniche.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[60%_40%]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-navy-900/20" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-l from-navy-950/70 via-transparent to-transparent" />

        <Container className="relative flex min-h-[88svh] flex-col justify-end pb-16 pt-24 sm:pb-24">
          <div className="max-w-3xl space-y-6">
            <Eyebrow tone="light">{company.name} · {company.city}</Eyebrow>
            <h1 className="text-4xl font-semibold leading-[1.15] sm:text-5xl lg:text-6xl">
              عقارات ومزادات
              <br />
              بروح جدة
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-ivory-100/85">
              {company.tagline}. نعرض الأراضي والعقارات المطروحة في مزاداتنا، ونصلك بفريقنا لتسجيل اهتمامك بكل عقار.
            </p>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <ButtonLink href="/properties">استعرض العقارات</ButtonLink>
              <ButtonLink href="/auction" variant="outline-light">
                {auction.name}
              </ButtonLink>
            </div>
          </div>

          <div className="mt-14 grid gap-6 border-t border-ivory-50/20 pt-6 sm:grid-cols-3">
            <div>
              <p className="text-xs text-ivory-200/70">المزاد الحالي</p>
              <p className="mt-1 flex flex-wrap items-center gap-3 text-lg font-medium">
                {auction.name}
                <AuctionStatusBadge tone="light" />
              </p>
            </div>
            <div>
              <p className="text-xs text-ivory-200/70">الموعد</p>
              <p className="num mt-1 text-lg font-medium">7 – 11 نوفمبر 2026</p>
            </div>
            <div>
              <p className="text-xs text-ivory-200/70">المعروض</p>
              <p className="num mt-1 text-lg font-medium">{properties.length} أراضٍ في شمال جدة</p>
            </div>
          </div>
        </Container>
      </section>

      {/* تعريف مختصر */}
      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="نبذة عن الشركة" title="الشريك المثالي في القطاع العقاري" />
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-navy-800 lg:col-span-7">
            <p>{company.about[0]}</p>
            <p>{company.about[1]}</p>
            <ul className="grid gap-x-8 gap-y-3 border-t border-navy-900/15 pt-6 text-base sm:grid-cols-2">
              {company.services.map((s) => (
                <li key={s} className="flex items-start gap-3">
                  <span aria-hidden className="mt-3 inline-block h-px w-5 shrink-0 bg-navy-600" />
                  {s}
                </li>
              ))}
            </ul>
            <Link href="/about" className="inline-block font-medium text-navy-900 underline-offset-4 hover:underline">
              المزيد عن أكان ←
            </Link>
          </div>
        </Container>
      </section>

      {/* العقارات والمزاد */}
      <section className="border-t border-navy-900/15 bg-ivory-50 py-20 sm:py-28">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="العقارات المعروضة"
              title={<>أربع أراضٍ في أحياء الزهور والمروج والوفاء والعبير</>}
              lead="عقارات مزاد روح جدة، بالمعلومات الواردة في كتيب المزاد: المساحة والواجهة وحالة الوثيقة وسعر الافتتاح."
            />
            <ButtonLink href="/properties" variant="outline" className="self-start lg:self-auto">
              كل العقارات والتصفية
            </ButtonLink>
          </div>
          <div className="mt-14 grid gap-x-10 gap-y-14 lg:grid-cols-2">
            {properties.map((p, i) => (
              <PropertyCard key={p.slug} property={p} priority={i === 0} />
            ))}
          </div>
        </Container>
      </section>

      {/* المزاد */}
      <section className="bg-navy-900 py-20 text-ivory-50 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-6">
            <SectionHeading
              tone="light"
              eyebrow="المزاد الإلكتروني"
              title={auction.name}
              lead={`يقام المزاد إلكترونيًا عبر ${auction.platformName}، ويضم أربعة عقارات في جدة.`}
            />
            <AuctionStatusBadge tone="light" />
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/auction" variant="outline-light">
                تفاصيل المزاد والشروط
              </ButtonLink>
              <a
                href={auction.brochurePath}
                target="_blank"
                rel="noopener"
                className="inline-flex min-h-12 items-center justify-center gap-2 px-6 py-3 text-base font-medium text-ivory-50 underline-offset-4 hover:underline"
              >
                فتح كتيب المزاد (PDF)
              </a>
            </div>
          </div>
          <div className="lg:col-span-6">
            <AuctionSchedule tone="light" />
          </div>
        </Container>
      </section>

      {/* جدة */}
      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="grid grid-cols-2 gap-4 lg:col-span-6">
            <div className="relative aspect-[3/4] overflow-hidden bg-navy-900">
              <Image src={jeddahImages.babMakkah.src} alt={jeddahImages.babMakkah.alt} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
            </div>
            <div className="relative mt-10 aspect-[3/4] overflow-hidden bg-navy-900">
              <Image src={jeddahImages.alBalad.src} alt={jeddahImages.alBalad.alt} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
            </div>
          </div>
          <div className="space-y-8 lg:col-span-6">
            <SectionHeading eyebrow="المدينة" title={company.jeddah.title} lead={company.jeddah.lead} />
            <div className="space-y-6 border-t border-navy-900/15 pt-6">
              <div>
                <h3 className="text-xl font-semibold text-navy-900">{company.jeddah.vibrantTitle}</h3>
                <p className="mt-2 leading-relaxed text-navy-800">{company.jeddah.vibrant}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-navy-900">{company.jeddah.northTitle}</h3>
                <p className="mt-2 leading-relaxed text-navy-800">{company.jeddah.north}</p>
                <p className="mt-2 leading-relaxed text-navy-800">{company.jeddah.northClose}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* المشاريع القادمة (تجريبي) */}
      <section className="border-t border-navy-900/15 bg-ivory-50 py-20 sm:py-28">
        <Container>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading eyebrow="قريبًا" title="مشاريع تحت الإنشاء" lead={PROJECTS_DEMO_NOTICE} />
            <ButtonLink href="/projects" variant="outline" className="self-start lg:self-auto">
              قسم المشاريع
            </ButtonLink>
          </div>
          <ul className="mt-12 grid gap-6 sm:grid-cols-3">
            {projectPlaceholders.map((p, i) => (
              <li key={p.id} className="flex aspect-[4/3] flex-col justify-between border border-dashed border-navy-900/30 p-6">
                <span className="num text-sm tracking-[0.2em] text-navy-600">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="text-lg font-medium text-navy-900">{p.kind}</p>
                  <p className="mt-1 text-sm text-muted">{p.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* تسجيل الاهتمام */}
      <section id="interest" className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="تواصل معنا"
              title="سجّل اهتمامك"
              lead="اترك اسمك ورقم جوالك والعقار الذي يهمك، ويتواصل معك فريق أكان."
            />
            <div className="mt-8 space-y-2 border-t border-navy-900/15 pt-6 text-sm text-navy-800">
              <p className="text-muted">أو اتصل مباشرة:</p>
              {company.phones.map((phone) => (
                <a key={phone} href={`tel:${phone}`} dir="ltr" className="num block text-lg font-medium tracking-[0.12em] text-navy-900">
                  {phone}
                </a>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7">
            <Suspense fallback={null}>
              <InterestForm />
            </Suspense>
          </div>
        </Container>
      </section>
    </>
  );
}
