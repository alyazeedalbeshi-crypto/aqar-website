import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="py-24">
      <Container className="space-y-8">
        <SectionHeading as="h1" eyebrow="404" title="الصفحة غير موجودة" lead="ربما تغيّر الرابط أو حُذف العقار من القائمة." />
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/">الرئيسية</ButtonLink>
          <ButtonLink href="/properties" variant="outline">العقارات</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
