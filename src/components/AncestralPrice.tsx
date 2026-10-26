import { TicketPercent } from "lucide-react";
import redCrystal from "@/assets/ancestrals/red-crystal.png";
import {
  ANCESTRAL_RED_CRYSTAL_PRICE,
  ANCESTRAL_BUYER_COUPON_DISCOUNT,
  ANCESTRAL_COUPON_PRICE,
} from "@/lib/ancestral-pricing";

const formatPrice = (price: number) => price.toLocaleString("en-US");

export function AncestralPrice({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="flex w-full flex-col items-center gap-1 border-t border-primary-foreground/15 px-2 py-3">
        <span className="flex items-center gap-1.5 font-pixel text-[9px] text-primary-foreground">
          <img src={redCrystal} alt="" width={816} height={816} loading="lazy" className="h-8 w-8 shrink-0 object-contain" />
          {formatPrice(ANCESTRAL_RED_CRYSTAL_PRICE)}
        </span>
        <span className="text-xs text-primary-foreground/70">Red crystals</span>
        <span className="mt-1 flex items-center gap-1 text-xs text-secondary">
          <TicketPercent className="h-3.5 w-3.5 shrink-0" />
          {ANCESTRAL_BUYER_COUPON_DISCOUNT}% off with buyer coupon
        </span>
      </div>
    );
  }

  return (
    <div className="grid items-center gap-4 border-y-2 border-secondary/40 bg-secondary/5 px-3 py-5 sm:grid-cols-[112px_1fr] sm:px-5">
      <img src={redCrystal} alt="Glowing red crystal" width={816} height={816} loading="lazy" className="ancestral-crystal mx-auto h-28 w-28 object-contain" />
      <div className="min-w-0 text-center sm:text-left">
        <p className="mb-2 font-pixel text-[8px] leading-relaxed text-primary-foreground/60">EACH ANCESTRAL · RED CRYSTALS</p>
        <p className="font-pixel text-lg leading-relaxed text-primary-foreground">{formatPrice(ANCESTRAL_RED_CRYSTAL_PRICE)}</p>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:justify-start">
          <span className="flex items-center gap-2 border border-secondary/60 px-2 py-1 font-pixel text-[9px] text-secondary">
            <TicketPercent className="h-4 w-4 shrink-0" /> {ANCESTRAL_BUYER_COUPON_DISCOUNT}% OFF
          </span>
          <span className="text-sm text-primary-foreground">{formatPrice(ANCESTRAL_COUPON_PRICE)} red crystals with coupon</span>
        </div>
        <p className="mt-2 text-sm text-primary-foreground/70">Use a coupon from another buyer to get the discount.</p>
      </div>
    </div>
  );
}