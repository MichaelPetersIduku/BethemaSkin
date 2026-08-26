export type Concern = "reactivity" | "darkMarks" | "oilBreakouts" | "texture" | "dryness";
export type SkinType = "oily" | "dry" | "combination" | "normal" | "changes";
export type DarkMarksAnswer = "yes-acne" | "yes-unsure" | "little" | "not-really";
export type Sensitivity = "very-reactive" | "somewhat" | "resilient";
export type TonerPreference = "yes" | "no";

export interface QuizAnswers {
  concerns: Concern[];
  skinType: SkinType;
  darkMarks: DarkMarksAnswer;
  sensitivity: Sensitivity;
  wantsToner: TonerPreference;
}

export const CONCERN_OPTIONS: { value: Concern; label: string }[] = [
  { value: "reactivity", label: "Reactivity / sensitivity" },
  { value: "darkMarks", label: "Dark marks / uneven tone" },
  { value: "oilBreakouts", label: "Oil & breakouts" },
  { value: "texture", label: "Texture / pores" },
  { value: "dryness", label: "Dryness / dehydration" },
];

export const SKIN_TYPE_OPTIONS: { value: SkinType; label: string }[] = [
  { value: "oily", label: "Oily — shiny by midday" },
  { value: "dry", label: "Dry — tight, sometimes flaky" },
  { value: "combination", label: "Combination — oily T-zone, drier elsewhere" },
  { value: "normal", label: "Normal — pretty balanced" },
  { value: "changes", label: "Changes all the time — hard to pin down" },
];

export const DARK_MARKS_OPTIONS: { value: DarkMarksAnswer; label: string }[] = [
  { value: "yes-acne", label: "Yes — from old acne or breakouts" },
  { value: "yes-unsure", label: "Yes — but not sure what caused them" },
  { value: "little", label: "A little — not my main concern" },
  { value: "not-really", label: "Not really" },
];

export const SENSITIVITY_OPTIONS: { value: Sensitivity; label: string }[] = [
  { value: "very-reactive", label: "Very reactive — stinging or redness, often" },
  { value: "somewhat", label: "Somewhat — depends on the product" },
  { value: "resilient", label: "Pretty resilient — I can handle actives fine" },
];

export const TONER_OPTIONS: { value: TonerPreference; label: string }[] = [
  { value: "yes", label: "Yes — give me the full routine" },
  { value: "no", label: "No — keep it simple" },
];

const PRODUCT_IDS = {
  softGel: "soft-gel-cleanser-100ml",
  blemishRescue: "blemish-rescue",
  mandelicToner: "clear-skin",
  hydroBoost: "hydro-boost",
  poreBalance: "pore-balance",
  glowC: "glow-c-serum",
  radiancePro: "radiance-pro",
  barrierReset: "barrier-reset",
  guidedFour: "the-guided-four",
} as const;

export type CleanserPlan =
  | { type: "single"; productId: string }
  | { type: "alternate"; amProductId: string; pmProductId: string };

export interface QuizResult {
  cleanser: CleanserPlan;
  toner: { productId: string; note?: string } | null;
  serumIds: string[];
  moisturizerId: string;
  kit: { productId: string; selectedSerumId: string; includeToner: boolean } | null;
}

export function getSkinQuizRecommendation(answers: QuizAnswers): QuizResult {
  const { concerns, skinType, darkMarks, sensitivity, wantsToner } = answers;

  // Section 3: Toner (worked out first — the cleanser depends on it).
  const tonerAdded = concerns.includes("texture") || wantsToner === "yes";
  const tonerNote = tonerAdded && sensitivity === "very-reactive" ? "start 2–3x a week" : undefined;

  // Section 1: Cleanser
  const isOilyOrCombo = skinType === "oily" || skinType === "combination";
  let cleanser: CleanserPlan;
  if (!isOilyOrCombo) {
    cleanser = { type: "single", productId: PRODUCT_IDS.softGel };
  } else if (sensitivity === "very-reactive") {
    cleanser = { type: "single", productId: PRODUCT_IDS.softGel };
  } else if (sensitivity === "somewhat") {
    cleanser = { type: "alternate", amProductId: PRODUCT_IDS.softGel, pmProductId: PRODUCT_IDS.blemishRescue };
  } else if (tonerAdded) {
    // resilient, but a toner is present — avoid stacking two exfoliating steps
    cleanser = { type: "alternate", amProductId: PRODUCT_IDS.softGel, pmProductId: PRODUCT_IDS.blemishRescue };
  } else {
    cleanser = { type: "single", productId: PRODUCT_IDS.blemishRescue };
  }

  // Section 2: Treatment serums
  const serumIds: string[] = [];
  if (concerns.includes("darkMarks")) {
    if (darkMarks === "yes-acne" && (sensitivity === "somewhat" || sensitivity === "resilient")) {
      serumIds.push(PRODUCT_IDS.radiancePro);
    } else {
      serumIds.push(PRODUCT_IDS.glowC);
    }
  }
  if (concerns.includes("oilBreakouts")) {
    serumIds.push(PRODUCT_IDS.poreBalance);
  }
  if (concerns.includes("dryness")) {
    serumIds.push(PRODUCT_IDS.hydroBoost);
  }
  if (concerns.includes("reactivity") && serumIds.length === 0) {
    serumIds.push(PRODUCT_IDS.hydroBoost);
  }
  if (!concerns.includes("darkMarks") && (darkMarks === "yes-acne" || darkMarks === "yes-unsure") && wantsToner === "yes") {
    serumIds.push(PRODUCT_IDS.glowC);
  }
  const uniqueSerumIds = Array.from(new Set(serumIds));

  // Section 4: Moisturiser
  const moisturizerId = PRODUCT_IDS.barrierReset;

  // Section 5: Kit check
  const cleanserIsPlainSoftGel = cleanser.type === "single" && cleanser.productId === PRODUCT_IDS.softGel;
  let kit: QuizResult["kit"] = null;
  if (cleanserIsPlainSoftGel && uniqueSerumIds.length === 2 && uniqueSerumIds.includes(PRODUCT_IDS.hydroBoost)) {
    const otherSerum = uniqueSerumIds.find((serumId) => serumId !== PRODUCT_IDS.hydroBoost)!;
    kit = { productId: PRODUCT_IDS.guidedFour, selectedSerumId: otherSerum, includeToner: tonerAdded };
  }

  return {
    cleanser,
    toner: tonerAdded ? { productId: PRODUCT_IDS.mandelicToner, note: tonerNote } : null,
    serumIds: uniqueSerumIds,
    moisturizerId,
    kit,
  };
}
