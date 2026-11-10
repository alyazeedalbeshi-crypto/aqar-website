import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink, buttonClasses } from "@/components/ui/Button";
import { HeroSlider, type HeroSlide } from "@/components/home/HeroSlider";
import { PropertyRail } from "@/components/home/PropertyRail";
import { AuctionStatusBadge } from "@/components/auction/AuctionStatus";
import { InterestForm } from "@/components/interest/InterestForm";
import { company, jeddahImages } from "@/content/company";
import { PROPERTY_TYPE_LABELS, properties } from "@/content/properties";
import { auction } from "@/content/auction";
import { PROJECTS_DEMO_NOTICE } from "@/content/projects";
import { formatArea, formatSar } from "@/lib/format";

const ORDINALS = ["الأول", "الثاني", "الثالث", "الرابع"];

export default function HomePage() {
  const slides: HeroSlide[] = [
    {
      key: "auction",
      image: { src: jeddahImages.corniche.src, alt: jeddahImages.corniche.alt },
      kicker: `${company.name} · المزاد الإلكتروني`,
      title: auction.name,
      subtitle: "أربع أراضٍ في أحياء الزهور والمروج والوفاء والعبير",
      facts: [
        { label: "الموعد", value: "7 – 11 نوفمبر 2026" },
        { label: "المنصة", value: auction.platformName },
        { label: "المعروض", value: `${properties.length} عقارات في جدة` },
      ],
      href: "/auction",
      cta: "تفاصيل المزاد",
    },
    ...properties.map((p) => ({
      key: p.slug,
      image: { src: p.image.src, alt: p.image.alt },
      kicker: `العقار ${ORDINALS[p.order - 1] ?? p.order} · ${auction.name}`,
      title: p.name,
      subtitle: p.frontage,
      facts: [
        { label: "الموقع", value: `حي ${p.district}، ${p.city}` },
        { label: "نوع العقار", value: PROPERTY_TYPE_LABELS[p.type] },
        { label: "المساحة", value: `${formatArea(p.areaSqm)} م²` },
      ],
      href: `/properties/${p.slug}`,
      cta: "تفاصيل العقار",
    })),
  ];

  const totalArea = properties.reduce((sum, p) => sum + p.areaSqm, 0);
  const stats = [
    { value: company.sinceHijri, label: ["خبرة في المجال", "العقاري منذ"] },
    { value: String(properties.length), label: ["عقارات مطروحة", `في ${auction.name}`] },
    { value: formatArea(totalArea), label: ["متر مربع", "إجمالي مساحة الأراضي"] },
    { value: formatSar(Math.min(...properties.map((p) => p.openingPriceSar))), label: ["ريال", "أقل سعر افتتاح"] },
  ];

  const tiles = [
    { href: "/auction", title: `${auction.name}: المواعيد والشروط وخطوات المشاركة`, image: jeddahImages.aerialNorth },
    { href: "/projects", title: "مشاريع تحت الإنشاء — قسم تجريبي", image: jeddahImages.sign },
    { href: "/about", title: `عن ${company.name} ووسائل التواصل`, image: jeddahImages.gateFlag },
  ];

  return (
    <>
      <HeroSlider slides={slides} />

      {/* تعريف مختصر + أرقام */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="max-w-2xl">
            <p className="text-base leading-loose text-navy-800">{company.about[0]}</p>
            <p className="mt-4 text-base leading-loose text-navy-800">{company.about[1]}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={auction.brochurePath} target="_blank" rel="noopener" className={buttonClasses("primary")}>
                حمّل كتيب المزاد
              </a>
              <ButtonLink href="/about" variant="outline">
                عن أكان
              </ButtonLink>
            </div>
          </div>

          <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:items-start">
            <dl className="grid grid-cols-2 gap-x-8 gap-y-12">
              {stats.map((s) => (
                <div key={s.label.join(" ")}>
                  <dd className="num text-[34px] font-light leading-none text-navy-900 sm:text-[40px]">{s.value}</dd>
                  <dt className="mt-3 text-sm leading-relaxed text-muted">
                    {s.label[0]}
                    <br />
                    {s.label[1]}
                  </dt>
                </div>
              ))}
            </dl>
            <div className="relative aspect-[3/2] overflow-hidden bg-navy-900">
              <Image src={jeddahImages.babMakkah.src} alt={jeddahImages.babMakkah.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </div>
        </Container>
      </section>

      {/* جدة — قسم داكن بصورة */}
      <section className="relative isolate overflow-hidden bg-navy-950 py-28 text-ivory-100 sm:py-40">
        <Image src={jeddahImages.aerialNorth.src} alt="" fill sizes="100vw" className="object-cover opacity-35" />
        <div aria-hidden className="absolute inset-0 bg-navy-950/55" />
        <Container className="relative">
          <h2 className="max-w-3xl text-[26px] font-bold leading-relaxed sm:text-[32px]">{company.jeddah.northTitle}</h2>
          <p className="mt-5 max-w-2xl text-base leading-loose text-ivory-100/85">{company.jeddah.north}</p>
          <p className="mt-3 max-w-2xl text-base leading-loose text-ivory-100/85">{company.jeddah.northClose}</p>
        </Container>
      </section>

      {/* شريط العقارات */}
      <section className="bg-ivory-50 py-24 sm:py-32">
        <Container className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-[26px] font-bold leading-snug text-navy-900 sm:text-[32px]">
            أراضٍ مختارة
            <br />
            في {auction.name}
          </h2>
          <Link href="/properties" className="inline-flex min-h-11 items-center text-sm font-semibold text-navy-900 underline underline-offset-8">
            عرض الكل
          </Link>
        </Container>
        <div className="mx-auto mt-14 max-w-[100rem]">
          <PropertyRail properties={properties} />
        </div>
      </section>

      {/* خطوات المشاركة — قسم داكن بأيقونات مرقّمة */}
      <section className="bg-navy-900 py-24 text-ivory-100 sm:py-28">
        <Container>
          <div className="flex flex-wrap items-center gap-4">
            <h2 className="text-[26px] font-bold sm:text-[32px]">خطوات المشاركة في المزاد الإلكتروني</h2>
            <AuctionStatusBadge tone="light" />
          </div>
          <ol className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {auction.steps.map((s) => (
              <li key={s.number} className="flex items-start gap-4 lg:flex-col lg:items-center lg:text-center">
                <span className="num grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ivory-100/60 text-lg font-light">
                  {s.number}
                </span>
                <span className="pt-2.5 text-[15px] leading-relaxed text-ivory-100/90 lg:pt-1">{s.title}</span>
              </li>
            ))}
          </ol>
          <p className="mt-12 text-sm text-ivory-100/65">
            المزايدة تتم عبر {auction.platformName}، من {auction.startLabel} إلى {auction.endLabel}.
          </p>
        </Container>
      </section>

      {/* روابط مصوّرة */}
      <section className="py-24 sm:py-28">
        <Container>
          <h2 className="text-[26px] font-bold text-navy-900 sm:text-[32px]">تعرّف على أكان</h2>
          <ul className="mt-12 grid gap-4 sm:grid-cols-3">
            {tiles.map((t, i) => (
              <li key={t.href} className={i === 1 ? "sm:mt-10" : ""}>
                <Link href={t.href} className="group relative block aspect-[10/9] overflow-hidden bg-navy-900">
                  <Image src={t.image.src} alt="" fill sizes="(min-width:640px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                  <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 p-5 text-base font-semibold leading-relaxed text-ivory-100">{t.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-muted">{PROJECTS_DEMO_NOTICE}</p>
          <div className="mt-8 flex justify-center">
            <ButtonLink href="/properties">تصفّح العقارات</ButtonLink>
          </div>
        </Container>
      </section>

      {/* تسجيل الاهتمام */}
      <section id="interest" className="bg-ivory-50 py-24 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading title="سجّل اهتمامك" lead="اترك اسمك ورقم جوالك والعقار الذي يهمك، ويتواصل معك فريق أكان." />
            <div className="mt-8 space-y-1 border-t border-navy-900/15 pt-6 text-sm">
              <p className="text-muted">أو اتصل مباشرة:</p>
              {company.phones.map((phone) => (
                <a key={phone} href={`tel:${phone}`} dir="ltr" className="num block py-1 text-end text-xl font-light tracking-[0.12em] text-navy-900">
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
