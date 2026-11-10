import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { DemoBanner } from "@/components/layout/DemoBanner";
import { company } from "@/content/company";

export const metadata: Metadata = {
  title: {
    default: `${company.name} | عقارات ومزادات في جدة`,
    template: `%s | ${company.name}`,
  },
  description:
    "أكان العالمية للعقارات: عرض العقارات والمزادات العقارية في جدة، ومزاد روح جدة بأربع أراضٍ في أحياء الزهور والمروج والوفاء والعبير.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0b1f3a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-ivory-100 text-ink">
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <DemoBanner />
        <SiteFooter />
      </body>
    </html>
  );
}
