import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { company, jeddahImages } from "@/content/company";

export const metadata: Metadata = {
  title: "عن الشركة",
  description: "نبذة عن شركة أكان العالمية للعقارات ووسائل التواصل.",
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy-900 py-20 text-ivory-50 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="space-y-6 lg:col-span-7">
            <Eyebrow tone="light">نبذة عن الشركة</Eyebrow>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">{company.name}</h1>
            <p className="max-w-xl text-xl text-ivory-100/85">{company.tagline}</p>
          </div>
          <dl className="grid grid-cols-2 gap-6 border-t border-ivory-50/15 pt-6 lg:col-span-5 lg:border-t-0 lg:pt-0">
            <div>
              <dt className="text-xs text-ivory-200/70">الخبرة في المجال العقاري</dt>
              <dd className="num mt-1 text-2xl font-light">منذ {company.sinceHijri}</dd>
            </div>
            <div>
              <dt className="text-xs text-ivory-200/70">المدينة</dt>
              <dd className="mt-1 text-2xl font-light">{company.city}</dd>
            </div>
          </dl>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="من نحن" title="الشريك المثالي" />
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-navy-800 lg:col-span-8">
            {company.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-navy-900/15 bg-ivory-50 py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="ماذا نقدم" title="خدماتنا" />
            <ul className="mt-8 divide-y divide-navy-900/15 border-y border-navy-900/15">
              {company.services.map((s, i) => (
                <li key={s} className="flex items-center gap-5 py-4">
                  <span className="num text-sm tracking-[0.2em] text-navy-600">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-lg text-navy-900">{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-navy-900 lg:col-span-7">
            <Image src={jeddahImages.gateFlag.src} alt={jeddahImages.gateFlag.alt} fill sizes="(min-width:1024px) 58vw, 100vw" className="object-cover" />
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="للتواصل" title="تواصل معنا" lead="وسائل التواصل كما وردت في كتيب المزاد." />
          </div>
          <div className="lg:col-span-8">
            <dl className="divide-y divide-navy-900/15 border-y border-navy-900/15">
              <div className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr]">
                <dt className="text-sm text-muted">الهاتف</dt>
                <dd className="flex flex-col gap-1">
                  {company.phones.map((phone) => (
                    <a key={phone} href={`tel:${phone}`} dir="ltr" className="num inline-block self-end text-2xl font-light tracking-[0.12em] text-navy-900 hover:text-navy-600">
                      {phone}
                    </a>
                  ))}
                </dd>
              </div>
              <div className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr]">
                <dt className="text-sm text-muted">إنستغرام و X</dt>
                <dd dir="ltr" className="text-end text-xl text-navy-900">{company.socialHandle}</dd>
              </div>
              <div className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr]">
                <dt className="text-sm text-muted">الموقع الإلكتروني (كما طُبع في الكتيب)</dt>
                <dd dir="ltr" className="text-end text-xl text-navy-900">{company.websiteLabel}</dd>
              </div>
            </dl>
            <div className="mt-8">
              <ButtonLink href="/interest">سجّل اهتمامك</ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
