"use client";

import { useSyncExternalStore } from "react";
import { auction } from "@/content/auction";
import { AUCTION_PHASE_LABELS, getAuctionPhase, type AuctionPhase } from "@/lib/auction-status";

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(id);
}

/**
 * حالة المزاد (قادم / جارٍ / منتهٍ) تُحتسب في المتصفح من تاريخ اليوم،
 * حتى لا يُعرض المزاد باعتباره جاريًا بعد انتهائه. على الخادم تُعاد null.
 */
export function useAuctionPhase(): AuctionPhase | null {
  return useSyncExternalStore(
    subscribe,
    () => getAuctionPhase(auction, new Date()),
    () => null,
  );
}

export function AuctionStatusBadge({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const phase = useAuctionPhase();

  const palette: Record<AuctionPhase, string> =
    tone === "light"
      ? {
          upcoming: "border-sky-300/60 text-sky-300",
          live: "border-emerald-300/70 text-emerald-200",
          ended: "border-ivory-200/40 text-ivory-200/70",
        }
      : {
          upcoming: "border-navy-600/50 text-navy-600",
          live: "border-emerald-700/50 text-emerald-800",
          ended: "border-navy-900/30 text-muted",
        };

  if (!phase) {
    return (
      <span
        aria-hidden
        className={`inline-flex min-h-8 items-center border px-3 text-xs ${
          tone === "light" ? "border-ivory-200/30 text-transparent" : "border-navy-900/15 text-transparent"
        }`}
      >
        حالة المزاد
      </span>
    );
  }

  return (
    <span className={`inline-flex min-h-8 items-center gap-2 border px-3 text-xs font-medium tracking-wide-ar ${palette[phase]}`}>
      {phase === "live" ? (
        <span aria-hidden className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
        </span>
      ) : null}
      {AUCTION_PHASE_LABELS[phase]}
    </span>
  );
}

export function AuctionEndedNotice() {
  const phase = useAuctionPhase();
  if (phase !== "ended") return null;
  return (
    <p className="border border-navy-900/20 bg-ivory-50 p-4 text-sm text-navy-800" role="status">
      انتهى هذا المزاد بتاريخ {auction.endLabel}. تُعرض بيانات العقارات هنا للاطلاع والأرشفة، ويمكنك تسجيل اهتمامك للتواصل
      بشأن فرص مشابهة.
    </p>
  );
}
