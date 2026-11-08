import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { PROJECTS_DEMO_NOTICE, projectPlaceholders } from "@/content/projects";

export const metadata: Metadata = {
  title: "المشاريع القادمة",
  description: "قسم تجريبي للمشاريع تحت الإنشاء لحين تزويدنا بالمشاريع الفعلية.",
};

export default function ProjectsPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="space-y-12">
        <SectionHeading as="h1" eyebrow="قريبًا" title="مشاريع تحت الإنشاء" lead={PROJECTS_DEMO_NOTICE} />

        <p className="border-s-2 border-sky-500 bg-sky-300/15 px-4 py-3 text-sm text-navy-800" role="note">
          قسم تجريبي — المواضع أدناه فارغة عمدًا، وتُستبدل بالمشاريع الفعلية (الاسم، الموقع، الصور، الحالة) عند توفيرها من الشركة.
        </p>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

        <div className="flex flex-col gap-4 border-t border-navy-900/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-navy-800">هل ترغب بالاطلاع على المشاريع القادمة عند الإعلان عنها؟</p>
          <ButtonLink href="/interest?property=projects" variant="outline">سجّل اهتمامك بالمشاريع القادمة</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
