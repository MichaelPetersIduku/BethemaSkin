import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, ShoppingBag } from "lucide-react";
import { products } from "../assets/products.json";
import { IProduct } from "../types/IProduct";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  products?: IProduct[];
}

interface QuizState {
  active: boolean;
  step: "skin" | "routine" | "sunscreen" | "sunscreen_willingness" | "notes" | "done";
  skin?: string;
  routine?: string;
  sunscreen?: string;
  sunscreenWillingness?: string;
  notes?: string;
}

const ALL_PRODUCTS: IProduct[] = products;
function recommendProducts(quiz: QuizState): IProduct[] {
  const { skin, sunscreen } = quiz;
  const s = skin?.toLowerCase() ?? "";
  const find = (id: string) => ALL_PRODUCTS.find((p) => p.id === id)!;
  let picks: IProduct[] = [];

  if (s.includes("oily") || s.includes("acne")) {
    picks = [find("blemish-rescue"), find("pore-balance"), find("hydrating-drops"), find("radiance")];
  } else if (s.includes("dark spots") || s.includes("hyperpigmentation")) {
    picks = [find("radiance"), find("glow-c-serum"), find("pore-balance"), find("hydrating-drops")];
  } else if (s.includes("dry") || s.includes("dull")) {
    picks = [find("hydrating-drops"), find("dew-point"), find("glow-c-serum"), find("radiance")];
  } else if (s.includes("sensitive")) {
    picks = [find("soft-gel-cleanser-100ml"), find("dew-point"), find("hydrating-drops"), find("radiance")];
  } else if (s.includes("combination")) {
    picks = [find("pore-balance"), find("hydrating-drops"), find("soft-gel-cleanser-100ml"), find("radiance")];
  } else {
    picks = [find("radiance"), find("hydrating-drops"), find("glow-c-serum"), find("dew-point")];
  }

  if (sunscreen === "No, I don't use sunscreen" && quiz.sunscreenWillingness?.includes("Yes")) {
    picks.push(find("glow-c-serum"));
  }

  const seen = new Set<string>();
  return picks.filter((p) => p && !seen.has(p.id) && seen.add(p.id)).slice(0, 4);
}

function getRecommendationMessage(quiz: QuizState): string {
  const skin = quiz.skin ?? "your skin";
  return `Based on what you've shared — **${skin}** — here are my top picks tailored just for you. ✨ These are formulated to work together for your best skin yet:`;
}

const QUICK_OPTIONS = [
  { label: "🚚 Shipping info", value: "What are your shipping options?" },
  // { label: "↩️ Returns & refunds", value: "How do I return a product?" },
  { label: "🌿 Ingredients", value: "What ingredients do you use?" },
  { label: "💧 My skin type", value: "How do I find the right product for my skin type?" },
  { label: "🎁 Discounts & promos", value: "Do you have any discounts or promo codes?" },
  // { label: "📦 Track my order", value: "How can I track my order?" },
  { label: "🧴 Product recommendations", value: "__quiz__" },
  { label: "📞 Contact support", value: "How do I contact customer support?" },
];

const RESPONSES: Record<string, string> = {
  shipping:
    "We offer **free standard shipping** on all orders over $50. Standard delivery takes 3–5 business days, and express shipping (1–2 days) is available at checkout. International shipping is available to select countries.",
  return:
    "We have a **30-day hassle-free return policy**. If you're not completely satisfied, return any unused product in its original packaging for a full refund. Visit our Contact page to initiate a return.",
  ingredient:
    "All Bethema products are formulated with **clean, natural ingredients** — free from parabens, sulfates, and synthetic fragrances. Each product page lists the full ingredient breakdown.",
  skin: "We have products tailored to **all skin types**. I recommend taking our Skin Quiz below — just tap **🧴 Product recommendations** and I'll guide you through it!",
  discount: "New customers get **10% off their first order** by signing up for our newsletter! Follow us on Instagram @BethemaBeauty for seasonal promotions.",
  track: "Once your order ships, you'll receive a **tracking email** with a real-time link. Orders typically ship within 1–2 business days.",
  contact:
    "Our support team is available **Monday–Friday, 9am–6pm EST**. Reach us via the Contact page or email **hello@bethema.com** — we respond within 24 hours!",
  fallback: "That's a great question! For anything specific, reach our team at **hello@bethema.com** — or choose a topic below and I'll help right away. 💛",
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

const SKIN_OPTIONS = [
  "Oily and acne-prone — breakouts are my biggest concern",
  "Dealing with dark spots, hyperpigmentation, or post-acne marks",
  "Dry, dull, or dehydrated — I want glow and bounce back",
  "Sensitive or easily irritated — I need gentle, calming care",
  "Combination — oily in some areas, dry in others",
  "Honestly, a bit of everything",
];

const ROUTINE_OPTIONS = [
  "I have a full routine I follow daily",
  "I have a simple routine (cleanser + moisturizer)",
  "I use products inconsistently",
  "I'm starting fresh — barely any routine right now",
];

const SUNSCREEN_OPTIONS = ["Yes, daily", "Yes, but not consistently", "No, I don't use sunscreen"];

const WILLINGNESS_OPTIONS = ["Yes, definitely", "Maybe — depends on the price and feel", "No, sunscreen isn't a priority for me right now"];

export function AskBethemaChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [quiz, setQuiz] = useState<QuizState>({ active: false, step: "skin" });
  const bottomRef = useRef<HTMLDivElement>(null);

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
              "Hi there! ✨ I'm **Bethema AI**, your personal beauty assistant. I'm here to help you find the perfect products, answer questions, and support your skincare journey. What can I help you with today?",
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
    setQuiz({ active: true, step: "skin" });
    pushBot("I'd love to find your perfect match! Let me ask you a few quick questions. 💛\n\n**Which of these best describes your skin right now?**", 1000);
  }

  function handleQuizAnswer(answer: string) {
    pushUser(answer);
    setShowOptions(false);

    if (quiz.step === "skin") {
      const updated = { ...quiz, skin: answer, step: "routine" as const };
      setQuiz(updated);
      pushBot("Got it! 📝\n\n**How would you describe your current skincare routine?** (Optional — skip if you prefer)", 1100);
    } else if (quiz.step === "routine") {
      const updated = { ...quiz, routine: answer, step: "sunscreen" as const };
      setQuiz(updated);
      pushBot("Thanks for sharing! 🙌\n\n**Do you currently use sunscreen?**", 1000);
    } else if (quiz.step === "sunscreen") {
      const noSunscreen = answer === "No, I don't use sunscreen";
      const updated = { ...quiz, sunscreen: answer, step: noSunscreen ? ("sunscreen_willingness" as const) : ("notes" as const) };
      setQuiz(updated);
      if (noSunscreen) {
        pushBot("Noted! SPF is such an important step. ☀️\n\n**If no, would you be willing to purchase one to complete your routine?**", 1000);
      } else {
        pushBot(
          "Amazing — SPF is the best anti-aging product out there! ☀️\n\n**Anything you'd love us to know before recommending products?** (e.g. sensitivities, allergies, things that haven't worked, or anything else — feel free to skip!)",
          1100,
        );
      }
    } else if (quiz.step === "sunscreen_willingness") {
      const updated = { ...quiz, sunscreenWillingness: answer, step: "notes" as const };
      setQuiz(updated);
      pushBot(
        "Appreciate your honesty! 😊\n\n**Anything you'd love us to know before recommending products?** (Skin sensitivities, allergies, things you've tried that didn't work, or anything else — feel free to skip!)",
        1100,
      );
    } else if (quiz.step === "notes") {
      const finalQuiz = { ...quiz, notes: answer, step: "done" as const };
      setQuiz(finalQuiz);
      const products = recommendProducts(finalQuiz);
      const msg = getRecommendationMessage(finalQuiz);
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMessages((prev) => [...prev, { id: Date.now(), role: "assistant", content: msg, products }]);
        setTimeout(() => {
          pushBot(
            "These products work beautifully together as a complete routine. Would you like more details on any of them, or is there anything else I can help you with? 💛",
            800,
          );
          setTimeout(() => setShowOptions(true), 1800);
        }, 600);
      }, 1400);
    }
  }

  function skipQuizStep() {
    handleQuizAnswer("Skipped");
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
    quiz.active && quiz.step === "skin"
      ? SKIN_OPTIONS
      : quiz.active && quiz.step === "routine"
        ? ROUTINE_OPTIONS
        : quiz.active && quiz.step === "sunscreen"
          ? SUNSCREEN_OPTIONS
          : quiz.active && quiz.step === "sunscreen_willingness"
            ? WILLINGNESS_OPTIONS
            : null;

  const isNotesStep = quiz.active && quiz.step === "notes";

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
              <p className="text-white font-semibold text-sm leading-tight">Bethema AI</p>
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
                      <div key={p.id} className="bg-white border border-stone-100 rounded-xl p-3 shadow-sm">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-gray-800 leading-tight">{p.name}</p>
                            <p className="text-xs text-[#b5987a] mt-0.5">{p.category}</p>
                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{p.description}</p>
                          </div>
                          <span className="text-sm font-bold text-gray-800 shrink-0">₦{p.price}</span>
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
                  </div>
                )}
              </div>
            ))}

            {typing && <TypingIndicator />}

            {/* Quiz option buttons */}
            {!typing && currentQuizOptions && (
              <div className="pl-8 space-y-1.5">
                {currentQuizOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleQuizAnswer(opt)}
                    className="w-full text-left text-xs bg-white border border-stone-200 hover:border-[#b5987a] hover:text-[#b5987a] text-gray-600 rounded-xl px-3 py-2 transition shadow-sm"
                  >
                    {opt}
                  </button>
                ))}
                {quiz.step === "routine" && (
                  <button onClick={skipQuizStep} className="w-full text-left text-xs text-gray-400 hover:text-[#b5987a] px-3 py-1 transition">
                    Skip this question →
                  </button>
                )}
              </div>
            )}

            {/* Notes step — free text prompt */}
            {!typing && isNotesStep && (
              <div className="pl-8">
                <p className="text-xs text-gray-400 mb-1.5">Type your answer below, or:</p>
                <button onClick={skipQuizStep} className="text-xs text-gray-400 hover:text-[#b5987a] transition">
                  Skip and see recommendations →
                </button>
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
              placeholder={isNotesStep ? "Share any notes or skip above…" : "Ask me anything…"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (isNotesStep) handleQuizAnswer(input.trim() || "No additional notes");
                  else sendMessage(input);
                }
              }}
            />
            <button
              onClick={() => {
                if (isNotesStep) handleQuizAnswer(input.trim() || "No additional notes");
                else sendMessage(input);
              }}
              disabled={!isNotesStep && !input.trim()}
              className="w-8 h-8 rounded-full bg-[#b5987a] disabled:opacity-40 flex items-center justify-center text-white transition hover:opacity-90"
              aria-label="Send"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}
      <div className="fixed bottom-3 right-4 z-50 flex flex-col items-center gap-1">
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
      </div>
    </>
  );
}
