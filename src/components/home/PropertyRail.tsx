"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Property } from "@/content/properties";
import { formatArea } from "@/lib/format";

/** شريط أفقي من بطاقات طولية (صورة، اسم، حي) مع مؤشر تقدّم رفيع */
export function PropertyRail({ properties }: { properties: Property[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const [bar, setBar] = useState<{ size: number; offset: number } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 4) return setBar(null);
      const size = el.clientWidth / el.scrollWidth;
      const progress = Math.min(1, Math.abs(el.scrollLeft) / max);
      setBar({ size, offset: progress * (1 - size) });
    };
    const raf = window.requestAnimationFrame(update);
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.cancelAnimationFrame(raf);
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div>
      <ul ref={ref} className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 sm:px-6 lg:px-5">
        {properties.map((p) => (
          <li key={p.slug} className="w-[72vw] shrink-0 snap-start sm:w-[42vw] lg:w-[calc((100%-60px)/4)]">
            <Link href={`/properties/${p.slug}`} className="group block">
              <span className="relative block aspect-[3/5] overflow-hidden bg-navy-900">
                <Image
                  src={p.image.src}
                  alt={p.image.alt}
                  fill
                  sizes="(min-width:1024px) 25vw, (min-width:640px) 42vw, 72vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </span>
              <span className="mt-4 flex items-baseline justify-between gap-3">
                <span className="text-lg font-bold text-navy-900">{p.name}</span>
                <span className="num text-sm text-muted">{formatArea(p.areaSqm)} م²</span>
              </span>
              <span className="block text-sm text-muted">
                حي {p.district}، {p.city}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {bar ? (
        <div aria-hidden className="relative mx-auto mt-10 h-[3px] w-2/5 max-w-xl overflow-hidden rounded-full bg-navy-900/10">
          <span
            className="absolute inset-y-0 rounded-full bg-navy-900/60"
            style={{ width: `${bar.size * 100}%`, insetInlineStart: `${bar.offset * 100}%` }}
          />
        </div>
      ) : null}
    </div>
  );
}
