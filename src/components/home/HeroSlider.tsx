"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export interface HeroSlide {
  key: string;
  image: { src: string; alt: string };
  kicker: string;
  title: string;
  subtitle: string;
  facts: { label: string; value: string }[];
  href: string;
  cta: string;
}

const INTERVAL_MS = 6500;

/**
 * غلاف بملء الشاشة: صورة كبيرة، اسم العقار وتفاصيله بخطوط رفيعة أسفل الصورة،
 * وشريط صور مصغّرة للانتقال بين الشرائح.
 */
export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);

  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, count]);

  const current = slides[index];
  // الصور المصغّرة: الشرائح التالية بالترتيب
  const thumbs = Array.from({ length: Math.min(3, count - 1) }, (_, k) => (index + 1 + k) % count);

  return (
    <section
      className="relative isolate h-[100svh] min-h-[620px] overflow-hidden bg-navy-950 text-ivory-100"
      aria-roledescription="carousel"
      aria-label="عقارات ومزادات أكان"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {slides.map((s, i) => (
        <div
          key={s.key}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-out ${i === index ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={s.image.src}
            alt={i === index ? s.image.alt : ""}
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover ${i === index ? "scale-100" : "scale-105"} transition-transform duration-[7000ms] ease-out`}
          />
        </div>
      ))}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/15 lg:via-black/15 lg:to-black/10" />

      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto flex max-w-[90rem] flex-col gap-6 px-4 pb-8 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:px-10 lg:pb-11">
          {/* النص والتفاصيل */}
          <div className="min-w-0 flex-1 lg:max-w-3xl" aria-live="polite">
            <p className="text-sm font-normal text-ivory-100/85">{current.kicker}</p>
            <h1 className="mt-1 text-4xl font-bold leading-tight sm:text-5xl">{current.title}</h1>
            <p className="mt-1 text-lg text-ivory-100/90">{current.subtitle}</p>

            <dl className="mt-6 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-3">
              {current.facts.map((f) => (
                <div key={f.label} className="border-t border-ivory-100/70 pt-3 sm:pt-4">
                  <dt className="text-sm font-semibold">{f.label}</dt>
                  <dd className="num mt-1 text-sm text-ivory-100/85 sm:mt-3">{f.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex items-center gap-6">
              <Link
                href={current.href}
                className="inline-flex min-h-11 items-center bg-ivory-100 px-7 text-sm font-semibold text-navy-900 transition-colors hover:bg-ivory-200"
              >
                {current.cta}
              </Link>
              <div className="flex items-center gap-2" role="tablist" aria-label="الشرائح">
                {slides.map((s, i) => (
                  <button
                    key={s.key}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`الشريحة ${i + 1}: ${s.title}`}
                    onClick={() => go(i)}
                    className="grid h-8 w-5 place-items-center"
                  >
                    <span className={`block h-1.5 w-1.5 rounded-full transition-all ${i === index ? "scale-150 bg-ivory-100" : "bg-ivory-100/45"}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* الصور المصغّرة */}
          <div className="no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4 sm:mx-0 sm:px-0 lg:shrink-0">
            {thumbs.map((i) => (
              <button
                key={slides[i].key}
                type="button"
                onClick={() => go(i)}
                aria-label={`عرض ${slides[i].title}`}
                className="group relative h-24 w-40 shrink-0 overflow-hidden sm:h-32 sm:w-52 lg:h-36 lg:w-56"
              >
                <Image src={slides[i].image.src} alt="" fill sizes="224px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/5" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2 pt-6 text-start text-xs font-semibold">
                  {slides[i].title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
