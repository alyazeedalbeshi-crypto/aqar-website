import Link from "next/link";
import { Wordmark } from "@/components/ui/Wordmark";
import { company } from "@/content/company";
import { auction } from "@/content/auction";
import { NAV_ITEMS } from "./nav";

export function SiteFooter() {
  return (
    <footer className="border-t border-ivory-50/10 bg-navy-950 text-ivory-200">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:px-10">
        <div className="space-y-5 lg:col-span-5">
          <Wordmark />
          <p className="max-w-md text-sm leading-relaxed text-ivory-200/80">{company.tagline}</p>
          <p className="max-w-md text-xs leading-relaxed text-ivory-200/60">
            شركة متخصصة في القطاع العقاري، مرخصة ومعتمدة لإقامة وتنظيم المزادات العقارية، وتعمل وفق الأنظمة واللوائح
            المعتمدة في المملكة العربية السعودية.
          </p>
        </div>

        <nav aria-label="روابط الموقع" className="lg:col-span-3">
          <h2 className="mb-4 text-sm font-semibold text-ivory-50">الموقع</h2>
          <ul className="space-y-0.5 text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-block py-1.5 hover:text-sky-300">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/interest" className="inline-block py-1.5 hover:text-sky-300">
                تسجيل الاهتمام
              </Link>
            </li>
            <li>
              <a href={auction.brochurePath} target="_blank" rel="noopener" className="inline-block py-1.5 hover:text-sky-300">
                كتيب مزاد روح جدة (PDF)
              </a>
            </li>
          </ul>
        </nav>

        <div className="lg:col-span-4">
          <h2 className="mb-4 text-sm font-semibold text-ivory-50">للتواصل</h2>
          <ul className="space-y-0.5 text-sm">
            {company.phones.map((phone) => (
              <li key={phone}>
                <a href={`tel:${phone}`} dir="ltr" className="num inline-block py-1.5 tracking-[0.12em] hover:text-sky-300">
                  {phone}
                </a>
              </li>
            ))}
            <li>
              <span className="text-ivory-200/60">إنستغرام و X: </span>
              <span dir="ltr" className="inline-block">
                {company.socialHandle}
              </span>
            </li>
            <li>
              <span className="text-ivory-200/60">الموقع كما ورد في الكتيب: </span>
              <span dir="ltr" className="inline-block">
                {company.websiteLabel}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory-50/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-ivory-200/55 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
          <p>© {company.name}. نسخة تجريبية للعرض الداخلي.</p>
          <p>بيانات العقارات والمزاد منقولة من كتيب «مزاد روح جدة».</p>
        </div>
      </div>
    </footer>
  );
}
