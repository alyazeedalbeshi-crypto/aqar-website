import type { Auction } from "@/content/auction";

export type AuctionPhase = "upcoming" | "live" | "ended";

export function getAuctionPhase(auction: Pick<Auction, "startsAt" | "endsAt">, now: Date): AuctionPhase {
  const start = new Date(auction.startsAt).getTime();
  const end = new Date(auction.endsAt).getTime();
  const t = now.getTime();
  if (t < start) return "upcoming";
  if (t > end) return "ended";
  return "live";
}

export const AUCTION_PHASE_LABELS: Record<AuctionPhase, string> = {
  upcoming: "مزاد قادم",
  live: "المزاد جارٍ الآن",
  ended: "انتهى المزاد",
};
