import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InterestForm } from "@/components/interest/InterestForm";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: "تسجيل الاهتمام",
  description: "سجّل اهتمامك بعقار من عقارات أكان العالمية للعقارات.",
};

export default function InterestPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading
            as="h1"
            eyebrow="تواصل معنا"
            title="سجّل اهتمامك"
            lead="اختر العقار واترك بياناتك، ويتواصل معك فريق أكان. الميزانية وموعد الشراء اختياريان."
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
          <Suspense fallback={<p className="text-muted">جارٍ تحميل النموذج…</p>}>
            <InterestForm />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}
