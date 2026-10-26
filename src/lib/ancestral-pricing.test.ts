import { describe, expect, test } from "bun:test";
import {
  ANCESTRAL_RED_CRYSTAL_PRICE,
  ANCESTRAL_BUYER_COUPON_DISCOUNT,
  ANCESTRAL_COUPON_PRICE,
} from "./ancestral-pricing";

describe("Ancestral red crystal prices", () => {
  test("each Ancestral costs 30,000 red crystals", () => {
    expect(ANCESTRAL_RED_CRYSTAL_PRICE).toBe(30_000);
  });
  test("another buyer's coupon gives 50% off, totaling 15,000 crystals", () => {
    expect(ANCESTRAL_BUYER_COUPON_DISCOUNT).toBe(50);
    expect(ANCESTRAL_COUPON_PRICE).toBe(15_000);
  });
});