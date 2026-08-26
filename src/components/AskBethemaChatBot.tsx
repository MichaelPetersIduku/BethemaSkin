import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, ShoppingBag } from "lucide-react";
import { products } from "../assets/products.json";
import { IProduct } from "../types/IProduct";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Concern,
  SkinType,
  DarkMarksAnswer,
  Sensitivity,
  TonerPreference,
  QuizAnswers,
  QuizResult,
  CONCERN_OPTIONS,
  SKIN_TYPE_OPTIONS,
  DARK_MARKS_OPTIONS,
  SENSITIVITY_OPTIONS,
  TONER_OPTIONS,
  getSkinQuizRecommendation,
} from "../utils/skinQuiz";
import { resolveGuidedFourPrice } from "../utils/guidedFourPricing";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  products?: IProduct[];
  // For a recommended "The Guided Four" card: which serum it was pre-set with,
  // so tapping the card deep-links into that variant on the product page.
  kitSerumId?: string;
}

type QuizStep = "concerns" | "skinType" | "darkMarks" | "sensitivity" | "toner" | "done";

interface QuizState {
  active: boolean;
  step: QuizStep;
  concerns: Concern[];
  skinType?: SkinType;
  darkMarks?: DarkMarksAnswer;
  sensitivity?: Sensitivity;
  wantsToner?: TonerPreference;
}

const ALL_PRODUCTS: IProduct[] = products;
const find = (id: string) => ALL_PRODUCTS.find((p) => p.id === id)!;

function productForCleanserStep(result: QuizResult): { text: string; items: IProduct[] } {
  if (result.cleanser.type === "single") {
    const p = find(result.cleanser.productId);
    return { text: `**Cleanser:** ${p.name}`, items: [p] };
  }
  const am = find(result.cleanser.amProductId);
  const pm = find(result.cleanser.pmProductId);
  return { text: `**Cleanser:** Alternate — ${am.name} in the AM, ${pm.name} in the PM`, items: [am, pm] };
}

function buildQuizResultMessage(result: QuizResult): { text: string; products: IProduct[]; kitSerumId?: string } {
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
  const products: IProduct[] = [];

  const cleanserInfo = productForCleanserStep(result);
  lines.push(cleanserInfo.text);
  products.push(...cleanserInfo.items);

  if (result.toner) {
    const toner = find(result.toner.productId);
    lines.push(`**Toner:** ${toner.name}${result.toner.note ? ` (${result.toner.note})` : ""}`);
    products.push(toner);
  }

  if (result.serumIds.length > 0) {
    const serumNames = result.serumIds.map((serumId) => find(serumId).name).join(", ");
    lines.push(`**Treatment:** ${serumNames}`);
    products.push(...result.serumIds.map(find));
  }

  const moisturizer = find(result.moisturizerId);
  lines.push(`**Moisturiser:** ${moisturizer.name}`);
  products.push(moisturizer);

  return { text: lines.join("\n"), products };
}

const QUICK_OPTIONS = [
  { label: "Shipping info", value: "What are your shipping options?" },
  // { label: "↩️ Returns & refunds", value: "How do I return a product?" },
  { label: "Ingredients", value: "What ingredients do you use?" },
  { label: "My skin type", value: "How do I find the right product for my skin type?" },
  // { label: "Discounts & promos", value: "Do you have any discounts or promo codes?" },
  // { label: "📦 Track my order", value: "How can I track my order?" },
  { label: "Product recommendations", value: "__quiz__" },
  { label: "Contact support", value: "How do I contact customer support?" },
];

const RESPONSES: Record<string, string> = {
  shipping:
    "We offer **free standard shipping** on all orders over ₦75,000. Standard delivery takes 3–5 business days. International shipping is available to select countries.",
  return:
    "We have a **30-day hassle-free return policy**. If you're not completely satisfied, return any unused product in its original packaging for a full refund. Visit our Contact page to initiate a return.",
  ingredient:
    "All Bethema products are formulated with **clean, natural ingredients** — free from parabens, sulfates, and synthetic fragrances. Each product page lists the full ingredient breakdown.",
  skin: "We have products tailored to **all skin types**. I recommend taking our Skin Quiz below — just tap **🧴 Product recommendations** and I'll guide you through it!",
  discount: "New customers get **10% off their first order** by signing up for our newsletter! Follow us on Instagram @BethemaSkin for seasonal promotions.",
  track: "Once your order ships, you'll receive a **tracking email** with a real-time link. Orders typically ship within 1–2 business days.",
  contact:
    "Our support team is available **Monday–Friday, 9am–6pm WAT**. Reach us via the Contact page or email **hello@bethemaskin.com** — we respond within 24 hours!",
  fallback:
    "That's a great question! For anything specific, reach our team at **hello@bethemaskin.com** — or choose a topic below and I'll help right away. 💛",
};

function getFaqReply(input: string): string | null {
  const lower = input.toLowerCase();
  if (lower.includes("ship")) return RESPONSES.shipping;
  if (lower.includes("return") || lower.includes("refund")) return RESPONSES.return;
  if (lower.includes("ingredient") || lower.includes("natural")) return RESPONSES.ingredient;
  if (lower.includes("skin") || lower.includes("type")) return RESPONSES.skin;
  if (lower.includes("discount") || lower.includes("promo")) return RESPONSES.discount;
  if (lower.includes("track") || lower.includes("order")) return RESPONSES.track;
  if (lower.includes("contact") || lower.includes("support")) return RESPONSES.contact;
  return null;
}

function formatMessage(text: string) {
  return text.split(/\*\*(.*?)\*\*/g).map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part));
}

function TypingIndicator() {
  return (
    <div className="flex justify-start items-end gap-2">
      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#b5987a] to-[#c9a882] flex items-center justify-center shrink-0">
        <Sparkles size={10} className="text-white" />
      </div>
      <div className="bg-white rounded-xl rounded-bl-none px-4 py-3 flex items-center gap-1 shadow-sm border border-stone-100">
        <span className="w-2 h-2 bg-[#b5987a] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="w-2 h-2 bg-[#b5987a] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="w-2 h-2 bg-[#b5987a] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}

export function AskBethemaChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [quiz, setQuiz] = useState<QuizState>({ active: false, step: "concerns", concerns: [] });
  const [pendingConcerns, setPendingConcerns] = useState<Concern[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent, product: IProduct) => {
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    toast.success(`${product.name} added to cart`);
  };

  const handleAddAllToCart = (recommended: IProduct[]) => {
    recommended.forEach((product) => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image }));
    toast.success(`${recommended.length} products added to cart`);
  };

  const handleViewProduct = (product: IProduct, kitSerumId?: string) => {
    const query = kitSerumId ? `?serum=${kitSerumId}` : "";
    navigate(`/product/${product.id}${query}`);
    setOpen(false);
  };

  useEffect(() => {
    if (open && messages.length === 0) {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMessages([
          {
            id: Date.now(),
            role: "assistant",
            content:
              "Hi there! ✨ I'm your personal beauty assistant. I'm here to help you find the perfect products, answer questions, and support your skincare journey. What can I help you with today?",
          },
        ]);
        setShowOptions(true);
      }, 1200);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    const openChat = () => setOpen(true);
    window.addEventListener("open-bethema-chat", openChat);
    return () => window.removeEventListener("open-bethema-chat", openChat);
  }, []);

  function pushBot(content: string, delay = 1000, products?: IProduct[]) {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { id: Date.now(), role: "assistant", content, products }]);
    }, delay);
  }

  function pushUser(content: string) {
    setMessages((prev) => [...prev, { id: Date.now(), role: "user", content }]);
  }

  function startQuiz() {
    setShowOptions(false);
    pushUser("🧴 Product recommendations");
    setPendingConcerns([]);
    setQuiz({ active: true, step: "concerns", concerns: [] });
    pushBot("I'd love to find your perfect match! Let me ask a few quick questions. 💛\n\n**What's your main skin concern?** (choose up to 2)", 1000);
  }

  function toggleConcern(concern: Concern) {
    setPendingConcerns((prev) => {
      if (prev.includes(concern)) return prev.filter((c) => c !== concern);
      if (prev.length >= 2) return prev;
      return [...prev, concern];
    });
  }

  function submitConcerns() {
    if (pendingConcerns.length === 0) return;
    const label = pendingConcerns.map((c) => CONCERN_OPTIONS.find((o) => o.value === c)!.label).join(" + ");
    pushUser(label);
    setShowOptions(false);
    setQuiz((prev) => ({ ...prev, concerns: pendingConcerns, step: "skinType" }));
    pushBot("Got it! 📝\n\n**How would you describe your skin most days?**", 1100);
  }

  function finishQuiz(finalAnswers: QuizAnswers) {
    const result = getSkinQuizRecommendation(finalAnswers);
    const { text, products, kitSerumId } = buildQuizResultMessage(result);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { id: Date.now(), role: "assistant", content: text, products, kitSerumId }]);
      setTimeout(() => {
        pushBot(
          "These work beautifully together as a complete routine. Tap a product to see more, or let me know if there's anything else I can help with! 💛",
          800,
        );
        setTimeout(() => setShowOptions(true), 1800);
      }, 600);
    }, 1400);
  }

  function handleQuizAnswer(value: string, label: string) {
    pushUser(label);
    setShowOptions(false);

    if (quiz.step === "skinType") {
      setQuiz((prev) => ({ ...prev, skinType: value as SkinType, step: "darkMarks" }));
      pushBot("Thanks! 🙌\n\n**Do you have dark marks or uneven patches on your skin?**", 1000);
    } else if (quiz.step === "darkMarks") {
      setQuiz((prev) => ({ ...prev, darkMarks: value as DarkMarksAnswer, step: "sensitivity" }));
      pushBot("Noted! 📝\n\n**How does your skin react to new products?**", 1000);
    } else if (quiz.step === "sensitivity") {
      setQuiz((prev) => ({ ...prev, sensitivity: value as Sensitivity, step: "toner" }));
      pushBot("Almost done! 😊\n\n**Want to add a toning step to your routine?**", 1000);
    } else if (quiz.step === "toner") {
      const wantsToner = value as TonerPreference;
      const finalAnswers: QuizAnswers = {
        concerns: quiz.concerns,
        skinType: quiz.skinType!,
        darkMarks: quiz.darkMarks!,
        sensitivity: quiz.sensitivity!,
        wantsToner,
      };
      setQuiz((prev) => ({ ...prev, wantsToner, step: "done", active: false }));
      finishQuiz(finalAnswers);
    }
  }

  function skipTonerStep() {
    handleQuizAnswer("no", "Skip — keep it simple");
  }

  function sendMessage(text: string) {
    if (text === "__quiz__") {
      startQuiz();
      return;
    }
    const trimmed = text.trim();
    if (!trimmed) return;
    setShowOptions(false);
    pushUser(trimmed);
    setInput("");
    const reply = getFaqReply(trimmed) ?? RESPONSES.fallback;
    const delay = 900 + Math.random() * 500;
    pushBot(reply, delay);
    setTimeout(() => setShowOptions(true), delay + 400);
  }

  const currentQuizOptions =
    quiz.active && quiz.step === "skinType"
      ? SKIN_TYPE_OPTIONS
      : quiz.active && quiz.step === "darkMarks"
        ? DARK_MARKS_OPTIONS
        : quiz.active && quiz.step === "sensitivity"
          ? SENSITIVITY_OPTIONS
          : quiz.active && quiz.step === "toner"
            ? TONER_OPTIONS
            : null;

  const isConcernsStep = quiz.active && quiz.step === "concerns";

  return (
    <>
      {open && (
        <div
          className="fixed bottom-24 right-4 z-50 w-[350px] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-stone-200 bg-white"
          style={{ maxHeight: "560px" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#b5987a] to-[#c9a882] shrink-0">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles size={18} className="text-white" />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold text-sm leading-tight">Ask Bethema</p>
              <p className="text-white/70 text-xs">Beauty assistant · Online</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white transition" aria-label="Close">
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 bg-stone-50" style={{ minHeight: 0 }}>
            {messages.map((m) => (
              <div key={m.id} className="space-y-2">
                <div className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  {m.role === "assistant" && (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#b5987a] to-[#c9a882] flex items-center justify-center mr-2 mt-1 shrink-0">
                      <Sparkles size={10} className="text-white" />
                    </div>
                  )}
                  <div
                    className={`text-sm px-3 py-2.5 rounded-2xl max-w-[80%] leading-relaxed whitespace-pre-line ${
                      m.role === "user" ? "bg-[#b5987a] text-white rounded-tr-sm" : "bg-white text-gray-800 rounded-tl-sm shadow-sm border border-stone-100"
                    }`}
                  >
                    {formatMessage(m.content)}
                  </div>
                </div>

                {/* Product cards */}
                {m.products && m.products.length > 0 && (
                  <div className="pl-8 space-y-2">
                    {m.products.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => handleViewProduct(p, p.id === "the-guided-four" ? m.kitSerumId : undefined)}
                        className="bg-white border border-stone-100 rounded-xl p-3 shadow-sm cursor-pointer hover:border-[#b5987a]/40 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-gray-800 leading-tight">{p.name}</p>
                            <p className="text-xs text-[#b5987a] mt-0.5">{p.category}</p>
                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{p.description}</p>
                          </div>
                          <span className="text-sm font-bold text-gray-800 shrink-0">₦{Number(p.price).toLocaleString()}</span>
                        </div>
                        <button
                          onClick={(e) => handleAddToCart(e, p)}
                          className="mt-2 w-full flex items-center justify-center gap-1.5 text-xs bg-[#b5987a] hover:opacity-90 text-white rounded-lg py-1.5 transition"
                        >
                          <ShoppingBag size={12} />
                          Add to Cart
                        </button>
                      </div>
                    ))}
                    {m.products.length > 1 && (
                      <button
                        onClick={() => handleAddAllToCart(m.products!)}
                        className="w-full flex items-center justify-center gap-1.5 text-xs bg-[#2b2724] hover:opacity-90 text-white rounded-lg py-2 transition"
                      >
                        <ShoppingBag size={12} />
                        Add all {m.products.length} to bag
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}

            {typing && <TypingIndicator />}

            {/* Q1 — multi-select (up to 2) */}
            {!typing && isConcernsStep && (
              <div className="pl-8 space-y-1.5">
                {CONCERN_OPTIONS.map((opt) => {
                  const selected = pendingConcerns.includes(opt.value);
                  return (
                    <button
                      key={opt.value}
                      onClick={() => toggleConcern(opt.value)}
                      className={`w-full text-left text-xs rounded-xl px-3 py-2 transition shadow-sm border ${
                        selected
                          ? "bg-[#b5987a] border-[#b5987a] text-white"
                          : "bg-white border-stone-200 text-gray-600 hover:border-[#b5987a] hover:text-[#b5987a]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
                <button
                  onClick={submitConcerns}
                  disabled={pendingConcerns.length === 0}
                  className="w-full text-center text-xs bg-[#2b2724] disabled:opacity-30 text-white rounded-xl px-3 py-2 transition mt-1"
                >
                  Continue ({pendingConcerns.length}/2 selected)
                </button>
              </div>
            )}

            {/* Single-select quiz steps */}
            {!typing && currentQuizOptions && (
              <div className="pl-8 space-y-1.5">
                {currentQuizOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleQuizAnswer(opt.value, opt.label)}
                    className="w-full text-left text-xs bg-white border border-stone-200 hover:border-[#b5987a] hover:text-[#b5987a] text-gray-600 rounded-xl px-3 py-2 transition shadow-sm"
                  >
                    {opt.label}
                  </button>
                ))}
                {quiz.step === "toner" && (
                  <button onClick={skipTonerStep} className="w-full text-left text-xs text-gray-400 hover:text-[#b5987a] px-3 py-1 transition">
                    Skip — keep it simple →
                  </button>
                )}
              </div>
            )}

            {/* General quick options */}
            {!typing && showOptions && !quiz.active && (
              <div className="pt-1 space-y-1.5">
                <p className="text-xs text-gray-400 pl-8">Choose a topic or type your question:</p>
                <div className="flex flex-wrap gap-1.5 pl-8">
                  {QUICK_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => sendMessage(opt.value)}
                      className="text-xs bg-white border border-stone-200 hover:border-[#b5987a] hover:text-[#b5987a] text-gray-600 rounded-full px-3 py-1.5 transition shadow-sm"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 border-t border-stone-100 px-3 py-2.5 bg-white shrink-0">
            <input
              className="flex-1 text-sm outline-none bg-transparent placeholder-gray-400 text-gray-800"
              placeholder="Ask me anything…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage(input);
              }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="w-8 h-8 rounded-full bg-[#b5987a] disabled:opacity-40 flex items-center justify-center text-white transition hover:opacity-90"
              aria-label="Send"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}
      {/* <div className="fixed bottom-3 right-4 z-50 flex flex-col items-center gap-1">
        <button
          onClick={() => setOpen((o) => !o)}
          className="rounded-full bg-gradient-to-br from-[#b5987a] to-[#c9a882] text-white flex items-center justify-center shadow-xl hover:scale-105 transition-transform"
          style={{ width: 52, height: 52 }}
          aria-label="Open chat"
        >
          {open ? <X size={22} /> : <MessageCircle size={22} />}
        </button>
        <span className="text-xs font-medium text-[#b5987a] bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap">
          Ask Bethema
        </span>
      </div> */}
    </>
  );
}
