import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { PageBanner } from "@/components/ui/PageBanner";
import { InterestForm } from "@/components/interest/InterestForm";
import { company, jeddahImages } from "@/content/company";

export const metadata: Metadata = {
  title: "تسجيل الاهتمام",
  description: "سجّل اهتمامك بعقار من عقارات أكان العالمية للعقارات.",
};

export default function InterestPage() {
  return (
    <>
    <PageBanner
      title="سجّل اهتمامك"
      lead="اختر العقار واترك بياناتك، ويتواصل معك فريق أكان. الميزانية وموعد الشراء اختياريان."
      image={jeddahImages.sign}
    />
    <section className="py-16 sm:py-20">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="space-y-2 text-sm text-navy-800">
            <p className="text-muted">للتواصل المباشر:</p>
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
    </>
  );
}
