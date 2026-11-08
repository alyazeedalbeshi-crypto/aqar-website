import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PropertyFilters } from "@/components/properties/PropertyFilters";
import { AuctionEndedNotice } from "@/components/auction/AuctionStatus";
import { getDistricts, getPropertyTypes, properties } from "@/content/properties";

export const metadata: Metadata = {
  title: "العقارات",
  description: "قائمة عقارات أكان العالمية للعقارات مع التصفية حسب النوع والحي.",
};

export default function PropertiesPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="space-y-12">
        <SectionHeading
          as="h1"
          eyebrow="العقارات"
          title="العقارات المعروضة"
          lead="أراضي مزاد روح جدة. صفِّ حسب النوع أو الحي، وافتح أي عقار للاطلاع على الحدود والأطوال وبيانات الوثيقة."
        />
        <AuctionEndedNotice />
        <Suspense fallback={<p className="text-muted">جارٍ تحميل العقارات…</p>}>
          <PropertyFilters properties={properties} districts={getDistricts()} types={getPropertyTypes()} />
        </Suspense>
      </Container>
    </section>
  );
}
