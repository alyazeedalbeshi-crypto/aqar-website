"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/ui/Wordmark";
import { company } from "@/content/company";
import { NAV_ITEMS } from "./nav";

/**
 * هيدر ثابت شفاف فوق صورة الغلاف، يتحول إلى خلفية كحلية عند التمرير.
 * كل صفحة تبدأ بقسم داكن (غلاف أو شريط عنوان) ليبقى النص الأبيض مقروءًا.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    const raf = window.requestAnimationFrame(onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 text-ivory-100 transition-colors duration-300 ${
        solid ? "bg-navy-900/95 shadow-[0_1px_0_rgba(255,255,255,0.08)] backdrop-blur" : "bg-gradient-to-b from-black/45 to-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:right-2 focus:z-50 focus:bg-ivory-100 focus:px-3 focus:py-2 focus:text-navy-900"
      >
        تخطَّ إلى المحتوى
      </a>
      <div className="mx-auto flex h-20 max-w-[90rem] items-center justify-between gap-6 px-4 sm:px-6 lg:px-10">
        <Wordmark />

        <nav aria-label="التنقل الرئيسي" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`relative py-2 text-[15px] font-normal transition-opacity hover:opacity-100 ${
                    isActive(item.href) ? "opacity-100 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-current" : "opacity-85"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a href={`tel:${company.phones[0]}`} dir="ltr" className="num text-sm tracking-[0.1em] opacity-90 hover:opacity-100">
            {company.phones[0]}
          </a>
          <Link
            href="/interest"
            className="inline-flex min-h-10 items-center border border-ivory-100/70 px-5 text-sm font-semibold transition-colors hover:bg-ivory-100 hover:text-navy-900"
          >
            سجّل اهتمامك
          </Link>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-4 w-6">
            <span className={`absolute inset-x-0 top-0 h-px bg-current transition-transform ${open ? "translate-y-[7.5px] rotate-45" : ""}`} />
            <span className={`absolute inset-x-0 top-[7.5px] h-px bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`absolute inset-x-0 bottom-0 h-px bg-current transition-transform ${open ? "-translate-y-[7.5px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {/* قائمة الجوال */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="absolute inset-x-0 top-full h-[calc(100svh-5rem)] overflow-y-auto border-t border-ivory-100/10 bg-navy-900 lg:hidden"
      >
        <nav aria-label="التنقل الرئيسي (جوال)" className="px-6 py-8">
          <ul className="divide-y divide-ivory-100/10">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`block py-4 text-xl font-normal ${isActive(item.href) ? "text-ivory-100" : "text-ivory-100/75"}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/interest"
            onClick={() => setOpen(false)}
            className="mt-8 flex min-h-12 items-center justify-center border border-ivory-100/70 text-base font-semibold"
          >
            سجّل اهتمامك
          </Link>
          <div className="mt-8 space-y-1 text-ivory-100/80">
            {company.phones.map((phone) => (
              <a key={phone} href={`tel:${phone}`} dir="ltr" className="num block py-2 text-end tracking-[0.12em]">
                {phone}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
