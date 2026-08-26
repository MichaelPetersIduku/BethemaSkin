import { IProduct } from "../types/IProduct";
import { convertStringAmountToNumber } from "./utility";

// "The Guided Four" bundle: Cleanse/Hydrate/Moisturise stay fixed, the
// "Treat" step is whichever of these 3 serums the shopper picks.
export const GUIDED_FOUR_FIXED_IDS = ["soft-gel-cleanser-100ml", "hydro-boost", "barrier-reset"];
export const GUIDED_FOUR_SERUM_IDS = ["glow-c-serum", "pore-balance", "radiance-pro"];
export const GUIDED_FOUR_BUNDLE_DISCOUNT = 0.15;

// Pore Balance is a fixed exception to the discount formula below.
const PORE_BALANCE_ID = "pore-balance";
const PORE_BALANCE_PRICE_OVERRIDE = 43563;

/**
 * Resolves a concrete unit price for "The Guided Four" given the selected
 * treatment serum. Normally 15% off the sum of the 3 fixed items plus the
 * selected serum's real price; Pore Balance is hard-pinned to ₦43,563.
 */
export function resolveGuidedFourPrice(allProducts: IProduct[], selectedSerumId: string | undefined): number {
  if (selectedSerumId === PORE_BALANCE_ID) return PORE_BALANCE_PRICE_OVERRIDE;
  const fixedTotal = GUIDED_FOUR_FIXED_IDS.reduce((sum, id) => {
    const item = allProducts.find((p) => p.id === id);
    return sum + (item ? convertStringAmountToNumber(item.price) : 0);
  }, 0);
  const serum = allProducts.find((p) => p.id === selectedSerumId);
  const serumPrice = serum ? convertStringAmountToNumber(serum.price) : 0;
  return Math.round((fixedTotal + serumPrice) * (1 - GUIDED_FOUR_BUNDLE_DISCOUNT));
}
