import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "./Container";

/** شريط عنوان داكن بصورة خلفية لصفحات الموقع الداخلية (يقع تحت الهيدر الشفاف) */
export function PageBanner({
  title,
  lead,
  image,
  children,
}: {
  title: ReactNode;
  lead?: ReactNode;
  image: { src: string; alt?: string };
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 text-ivory-100">
      <Image src={image.src} alt="" fill priority sizes="100vw" className="object-cover opacity-45" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-navy-950/50" />
      <Container className="relative pb-14 pt-40 sm:pb-16 sm:pt-48">
        <h1 className="text-3xl font-bold leading-snug sm:text-[40px]">{title}</h1>
        {lead ? <p className="mt-4 max-w-2xl text-base leading-loose text-ivory-100/85">{lead}</p> : null}
        {children ? <div className="mt-6">{children}</div> : null}
      </Container>
    </section>
  );
}
