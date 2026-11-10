import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PageBanner } from "@/components/ui/PageBanner";
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
      <PageBanner title={company.name} lead={company.tagline} image={jeddahImages.corniche} />

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
