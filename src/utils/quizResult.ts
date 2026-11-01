import { IProduct } from "../types/IProduct";
import { products } from "../assets/products.json";
import { resolveGuidedFourPrice } from "./guidedFourPricing";
import { QuizResult } from "./skinQuiz";

// Single source of truth for turning a QuizResult into product data — shared by
// AskBethemaChatBot.tsx (chat bubble) and QuizPage.tsx (full-page flow) so the
// two surfaces can never drift apart.
export const ALL_PRODUCTS: IProduct[] = products.map((product) => ({
  ...product,
  concerns: "concerns" in product ? product.concerns ?? [] : [],
}));

export const find = (id: string) => ALL_PRODUCTS.find((p) => p.id === id)!;

export function productForCleanserStep(result: QuizResult): { text: string; items: IProduct[] } {
  if (result.cleanser.type === "single") {
    const p = find(result.cleanser.productId);
    return { text: `**Cleanser:** ${p.name}`, items: [p] };
  }
  const am = find(result.cleanser.amProductId);
  const pm = find(result.cleanser.pmProductId);
  return { text: `**Cleanser:** Alternate — ${am.name} in the AM, ${pm.name} in the PM`, items: [am, pm] };
}

export function buildQuizResultMessage(result: QuizResult): { text: string; products: IProduct[]; kitSerumId?: string } {
  if (result.kit) {
    const guidedFour = find(result.kit.productId);
    const serum = find(result.kit.selectedSerumId);
    const price = resolveGuidedFourPrice(ALL_PRODUCTS, result.kit.selectedSerumId);
    const kitCard: IProduct = { ...guidedFour, name: `${guidedFour.name} — with ${serum.name}`, price: String(price) };

    let text = `Your answers point straight to **The Guided Four**! ✨ It's pre-set with **${serum.name}** as your treatment serum.`;
    const cards = [kitCard];
    if (result.kit.includeToner && result.toner) {
      const toner = find(result.toner.productId);
      text += ` I'd also add **${toner.name}** alongside it${result.toner.note ? ` (${result.toner.note})` : ""}.`;
      cards.push(toner);
    }
    return { text, products: cards, kitSerumId: result.kit.selectedSerumId };
  }

  const lines: string[] = ["Based on what you've shared, here's your personalized routine: 💛", ""];
  const resultProducts: IProduct[] = [];

  const cleanserInfo = productForCleanserStep(result);
  lines.push(cleanserInfo.text);
  resultProducts.push(...cleanserInfo.items);

  if (result.toner) {
    const toner = find(result.toner.productId);
    lines.push(`**Toner:** ${toner.name}${result.toner.note ? ` (${result.toner.note})` : ""}`);
    resultProducts.push(toner);
  }

  if (result.serumIds.length > 0) {
    const serumNames = result.serumIds.map((serumId) => find(serumId).name).join(", ");
    lines.push(`**Treatment:** ${serumNames}`);
    resultProducts.push(...result.serumIds.map(find));
  }

  const moisturizer = find(result.moisturizerId);
  lines.push(`**Moisturiser:** ${moisturizer.name}`);
  resultProducts.push(moisturizer);

  return { text: lines.join("\n"), products: resultProducts };
}

export interface RoutineSummaryItem {
  title: string;
  subtitle: string;
}

// The compact "Your routine:" list shown on the full-page quiz results screen —
// same underlying steps as buildQuizResultMessage, formatted as title/subtitle pairs.
export function buildRoutineSummary(result: QuizResult): RoutineSummaryItem[] {
  if (result.kit) {
    const guidedFour = find(result.kit.productId);
    const serum = find(result.kit.selectedSerumId);
    const items: RoutineSummaryItem[] = [{ title: guidedFour.name, subtitle: `Four steps + ${serum.name}` }];
    if (result.kit.includeToner && result.toner) {
      const toner = find(result.toner.productId);
      items.push({ title: toner.name, subtitle: toner.description });
    }
    return items;
  }

  const items: RoutineSummaryItem[] = [];

  if (result.cleanser.type === "single") {
    const p = find(result.cleanser.productId);
    items.push({ title: p.name, subtitle: p.description });
  } else {
    const am = find(result.cleanser.amProductId);
    const pm = find(result.cleanser.pmProductId);
    items.push({ title: `${am.name} + ${pm.name}`, subtitle: `Alternate — ${am.name} in the AM, ${pm.name} in the PM` });
  }

  if (result.toner) {
    const toner = find(result.toner.productId);
    items.push({ title: toner.name, subtitle: toner.description + (result.toner.note ? ` (${result.toner.note})` : "") });
  }

  result.serumIds.forEach((serumId) => {
    const p = find(serumId);
    items.push({ title: p.name, subtitle: p.description });
  });

  const moisturizer = find(result.moisturizerId);
  items.push({ title: moisturizer.name, subtitle: moisturizer.description });

  return items;
}
