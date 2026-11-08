"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/ui/Wordmark";
import { ButtonLink } from "@/components/ui/Button";
import { NAV_ITEMS } from "./nav";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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

  return (
    <header className="sticky top-0 z-40 border-b border-ivory-50/10 bg-navy-900 text-ivory-50">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:right-2 focus:z-50 focus:bg-ivory-50 focus:px-3 focus:py-2 focus:text-navy-900"
      >
        تخطَّ إلى المحتوى
      </a>
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-10">
        <Wordmark />

        <nav aria-label="التنقل الرئيسي" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`py-2 text-[15px] transition-colors hover:text-sky-300 ${
                    isActive(item.href) ? "text-sky-300 border-b border-sky-300" : "text-ivory-100"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <ButtonLink href="/interest" variant="outline-light" className="min-h-11 px-5 py-2 text-[15px]">
            سجّل اهتمامك
          </ButtonLink>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center border border-ivory-50/30 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute inset-x-0 top-0 h-0.5 bg-current transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span className={`absolute inset-x-0 top-[7px] h-0.5 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
            <span
              className={`absolute inset-x-0 bottom-0 h-0.5 bg-current transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      {/* قائمة الجوال */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="absolute inset-x-0 top-full z-40 h-[calc(100svh-4.5rem)] overflow-y-auto border-t border-ivory-50/10 bg-navy-900 lg:hidden"
      >
        <nav aria-label="التنقل الرئيسي (جوال)" className="px-4 py-6 sm:px-6">
          <ul className="divide-y divide-ivory-50/10 border-y border-ivory-50/10">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between py-4 text-xl ${isActive(item.href) ? "text-sky-300" : "text-ivory-50"}`}
                >
                  {item.label}
                  <span aria-hidden className="text-ivory-50/40">
                    ‹
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <ButtonLink href="/interest" variant="outline-light" className="w-full" onClick={() => setOpen(false)}>
              سجّل اهتمامك
            </ButtonLink>
          </div>
        </nav>
      </div>
    </header>
  );
}
