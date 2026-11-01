import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "../contexts/CartContext";
import { Header } from "./Header";
import { MarqueeBanner } from "./MarqueeBanner";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import buildRoutineImage from "../assets/images/build_routine.jpg";
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
import { buildQuizResultMessage, buildRoutineSummary } from "../utils/quizResult";
import { IProduct } from "../types/IProduct";

type Step = "landing" | "concern1" | "concern2" | "skinType" | "darkMarks" | "sensitivity" | "toner" | "results";

const QUESTION_ORDER: Step[] = ["concern1", "concern2", "skinType", "darkMarks", "sensitivity", "toner"];
// Design has 5 equal progress segments: concerns (concern1 + concern2 together), skinType, darkMarks, sensitivity, toner.
const PROGRESS_STEP: Partial<Record<Step, number>> = {
  concern1: 1,
  concern2: 1,
  skinType: 2,
  darkMarks: 3,
  sensitivity: 4,
  toner: 5,
};

function ProgressBar({ step }: { step: Step }) {
  const current = PROGRESS_STEP[step];
  if (!current) return null;
  return (
    <div className="border border-[#2b2724] h-[6px] w-full mb-6 md:mb-10">
      <div className="h-full bg-[#2b2724] transition-all duration-300" style={{ width: `${(current / 5) * 100}%` }} />
    </div>
  );
}

function OptionButton({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-center px-2 py-3 md:py-4 rounded-sm border border-[#2b2724] font-['Syne',_sans-serif] font-semibold text-sm md:text-base transition-colors ${
        selected ? "bg-[#2b2724] text-white" : "bg-transparent text-[#2b2724] hover:bg-[#2b2724]/5"
      }`}
    >
      {label}
    </button>
  );
}

interface QuestionOption<T extends string> {
  value: T;
  label: string;
}

function QuestionScreen<T extends string>({
  step,
  question,
  options,
  selectedValue,
  onSelect,
  onBack,
  showBack = true,
  continueLabel,
  continueDisabled,
  onContinue,
}: {
  step: Step;
  question: string;
  options: QuestionOption<T>[];
  selectedValue: T | null;
  onSelect: (value: T) => void;
  onBack: () => void;
  showBack?: boolean;
  continueLabel: string;
  continueDisabled: boolean;
  onContinue: () => void;
}) {
  return (
    <div className="max-w-xl md:max-w-2xl mx-auto">
      <ProgressBar step={step} />
      <div className="text-center mb-6 md:mb-10">
        <p className="text-[#2b2724] mb-2 md:text-lg">Build your Routine</p>
        <h2 className="font-['Syne',_sans-serif] font-bold text-xl md:text-3xl text-[#2b2724]">{question}</h2>
      </div>
      <div className="flex flex-col gap-3 md:gap-4">
        {options.map((opt) => (
          <OptionButton key={opt.value} label={opt.label} selected={selectedValue === opt.value} onClick={() => onSelect(opt.value)} />
        ))}
      </div>
      <div className="flex items-center justify-between mt-6 md:mt-10">
        {showBack ? (
          <button
            onClick={onBack}
            className="border border-[#2b2724] text-[#2b2724] px-4 py-2 md:px-6 md:py-3 rounded-sm font-['Syne',_sans-serif] font-medium md:text-lg"
          >
            Back
          </button>
        ) : (
          <span />
        )}
        <button
          disabled={continueDisabled}
          onClick={onContinue}
          className="bg-[#2b2724] disabled:opacity-40 text-white px-4 py-2 md:px-6 md:py-3 rounded-sm font-['Syne',_sans-serif] font-medium md:text-lg"
        >
          {continueLabel}
        </button>
      </div>
    </div>
  );
}

function QuizCard({ product, onAddToCart, onClick }: { product: IProduct; onAddToCart: (e: React.MouseEvent) => void; onClick: () => void }) {
  return (
    <div onClick={onClick} className="flex flex-col gap-1 w-full max-w-[156px] sm:max-w-[180px] md:max-w-[200px] cursor-pointer">
      <div className="aspect-[156/178] w-full rounded-sm overflow-hidden bg-neutral-100">
        <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="text-[8px] md:text-[10px] text-[#2b2724]">{product.rating > 0 ? `★ ${product.rating}/5` : "★ New"}</p>
        <p className="font-['Syne',_sans-serif] font-medium text-sm md:text-base text-[#2b2724]">{product.name}</p>
        <p className="text-xs md:text-sm text-[#5b4f4d] line-clamp-2">{product.description}</p>
        <p className="font-['Syne',_sans-serif] font-medium text-base md:text-lg text-[#2b2724]">₦{Number(product.price).toLocaleString()}</p>
      </div>
      <button
        onClick={onAddToCart}
        className="w-full bg-[#2b2724] text-white py-2 md:py-2.5 rounded-sm flex items-center justify-center gap-1.5 font-['Syne',_sans-serif] font-semibold text-sm md:text-base"
      >
        <ShoppingBag className="w-3.5 h-3.5" />
        Add to bag
      </button>
    </div>
  );
}

export function QuizPage() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [step, setStep] = useState<Step>("landing");

  const [concern1, setConcern1] = useState<Concern | null>(null);
  const [concern2, setConcern2] = useState<Concern | null>(null);
  const [skinType, setSkinType] = useState<SkinType | null>(null);
  const [darkMarks, setDarkMarks] = useState<DarkMarksAnswer | null>(null);
  const [sensitivity, setSensitivity] = useState<Sensitivity | null>(null);
  const [wantsToner, setWantsToner] = useState<TonerPreference | null>(null);
  const [result, setResult] = useState<QuizResult | null>(null);

  const goBack = () => {
    const idx = QUESTION_ORDER.indexOf(step);
    if (idx <= 0) {
      setStep("landing");
      return;
    }
    setStep(QUESTION_ORDER[idx - 1]);
  };

  const finishQuiz = (finalWantsToner: TonerPreference) => {
    const finalAnswers: QuizAnswers = {
      concerns: [concern1, concern2].filter((c): c is Concern => c !== null),
      skinType: skinType!,
      darkMarks: darkMarks!,
      sensitivity: sensitivity!,
      wantsToner: finalWantsToner,
    };
    setWantsToner(finalWantsToner);
    setResult(getSkinQuizRecommendation(finalAnswers));
    setStep("results");
  };

  const handleAddToCart = (e: React.MouseEvent, product: IProduct) => {
    e.stopPropagation();
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
    toast.success(`${product.name} added to bag`);
  };

  const handleAddAllToCart = (recommended: IProduct[]) => {
    recommended.forEach((product) => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image }));
    toast.success(`${recommended.length} products added to bag`);
  };

  const handleViewProduct = (product: IProduct, kitSerumId?: string) => {
    const query = kitSerumId && product.id === "the-guided-four" ? `?serum=${kitSerumId}` : "";
    navigate(`/product/${product.id}${query}`);
  };

  const resultMessage = result ? buildQuizResultMessage(result) : null;
  const routineSummary = result ? buildRoutineSummary(result) : [];
  const concernLabels = [concern1, concern2].filter((c): c is Concern => c !== null).map((c) => CONCERN_OPTIONS.find((o) => o.value === c)!.label);

  return (
    <div className="min-h-screen bg-[#fbf8f3]">
      <div className="fixed top-0 left-0 right-0 z-50">
        <MarqueeBanner />
      </div>
      <Header offsetForMarquee showNavigation={false} />

      <div className="pt-[140px] px-4 sm:px-6 lg:px-8 pb-20">
        {/* Landing */}
        {step === "landing" && (
          <div className="flex flex-col md:grid md:grid-cols-2 md:items-center md:gap-16 items-center text-center md:text-left gap-8 max-w-5xl mx-auto">
            <div className="flex flex-col items-center md:items-start gap-6 w-full">
              <div className="flex flex-col gap-2 w-full">
                <h1 className="font-['Syne',_sans-serif] font-semibold text-xl md:text-4xl lg:text-5xl text-[#2b2724]">Need Recommendations?</h1>
                <p className="text-[#2b2724] md:text-lg md:max-w-md">
                  Let's find what your skin actually needs.
                  <br />
                  Four quick questions, full guided routine.
                </p>
              </div>
              <button
                onClick={() => setStep("concern1")}
                className="bg-[#2b2724] text-white px-5 py-2 md:px-8 md:py-3 rounded-sm font-['Syne',_sans-serif] font-medium text-lg md:text-xl"
              >
                Build my routine
              </button>
            </div>
            <img
              src={buildRoutineImage}
              alt="Build your personalized Bethema routine"
              className="w-full aspect-[4/5] sm:aspect-video md:aspect-[4/5] object-cover rounded-sm"
            />
          </div>
        )}

        {/* Question 1 — main concern */}
        {step === "concern1" && (
          <QuestionScreen
            step={step}
            question="What's your main skin concern?"
            options={CONCERN_OPTIONS}
            selectedValue={concern1}
            onSelect={setConcern1}
            onBack={goBack}
            showBack={false}
            continueLabel="Continue"
            continueDisabled={!concern1}
            onContinue={() => setStep("concern2")}
          />
        )}

        {/* Question 1b — second concern (optional) */}
        {step === "concern2" && (
          <QuestionScreen
            step={step}
            question="Do you have a second skin concern? (optional)"
            options={CONCERN_OPTIONS.filter((opt) => opt.value !== concern1)}
            selectedValue={concern2}
            onSelect={setConcern2}
            onBack={goBack}
            continueLabel={concern2 ? "Continue" : "Skip"}
            continueDisabled={false}
            onContinue={() => setStep("skinType")}
          />
        )}

        {/* Question 2 — skin type */}
        {step === "skinType" && (
          <QuestionScreen
            step={step}
            question="How would you describe your skin most days?"
            options={SKIN_TYPE_OPTIONS}
            selectedValue={skinType}
            onSelect={setSkinType}
            onBack={goBack}
            continueLabel="Continue"
            continueDisabled={!skinType}
            onContinue={() => setStep("darkMarks")}
          />
        )}

        {/* Question 3 — dark marks */}
        {step === "darkMarks" && (
          <QuestionScreen
            step={step}
            question="Do you have dark marks or uneven patches on your skin?"
            options={DARK_MARKS_OPTIONS}
            selectedValue={darkMarks}
            onSelect={setDarkMarks}
            onBack={goBack}
            continueLabel="Continue"
            continueDisabled={!darkMarks}
            onContinue={() => setStep("sensitivity")}
          />
        )}

        {/* Question 4 — sensitivity */}
        {step === "sensitivity" && (
          <QuestionScreen
            step={step}
            question="How does your skin react to new products?"
            options={SENSITIVITY_OPTIONS}
            selectedValue={sensitivity}
            onSelect={setSensitivity}
            onBack={goBack}
            continueLabel="Continue"
            continueDisabled={!sensitivity}
            onContinue={() => setStep("toner")}
          />
        )}

        {/* Question 5 — toner (optional) */}
        {step === "toner" && (
          <QuestionScreen
            step={step}
            question="Want to add a toner step to your routine? (optional)"
            options={TONER_OPTIONS}
            selectedValue={wantsToner}
            onSelect={setWantsToner}
            onBack={goBack}
            continueLabel={wantsToner ? "Continue" : "Skip"}
            continueDisabled={false}
            onContinue={() => finishQuiz(wantsToner ?? "no")}
          />
        )}

        {/* Results */}
        {step === "results" && result && resultMessage && (
          <div className="flex flex-col items-center gap-6 md:gap-10 max-w-5xl mx-auto">
            <button onClick={() => setStep("landing")} className="self-start flex items-center gap-2 text-[#2b2724] text-sm md:text-base">
              <ArrowLeft className="w-4 h-4" />
              Start over
            </button>
            <h1 className="font-['Syne',_sans-serif] font-bold text-xl md:text-3xl text-[#2b2724] text-center">Your Bethema routine</h1>

            <div className="flex flex-col md:flex-row md:justify-center gap-6 md:gap-16 w-full">
              <div className="flex flex-col items-center gap-3 w-full md:w-auto md:min-w-[220px] max-w-[260px] mx-auto">
                <p className="font-['Syne',_sans-serif] font-medium text-base md:text-lg text-[#2b2724] text-center">Your concerns:</p>
                {concernLabels.map((label) => (
                  <div key={label} className="bg-[#f4d03f] border border-[#5b4f4d] w-full p-2.5 text-center">
                    <p className="font-['Syne',_sans-serif] font-medium text-base text-[#2b2724]">{label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-center gap-3 w-full md:w-auto md:min-w-[260px] max-w-[260px] mx-auto text-center">
                <p className="font-['Syne',_sans-serif] font-medium text-base md:text-lg text-[#2b2724]">Your routine:</p>
                {routineSummary.map((item) => (
                  <div key={item.title} className="w-full">
                    <p className="font-['Syne',_sans-serif] font-medium text-base text-[#2b2724]">{item.title}</p>
                    <p className="text-sm text-[#5b4f4d]">{item.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 md:gap-6 w-full">
              <p className="font-['Syne',_sans-serif] font-medium text-base md:text-lg text-[#2b2724] text-center max-w-[280px] md:max-w-none">
                Based on your quiz response, here's your recommended routine:
              </p>
              <div className="flex flex-wrap gap-6 md:gap-8 items-start justify-center w-full max-w-4xl">
                {resultMessage.products.map((product) => (
                  <QuizCard
                    key={product.id}
                    product={product}
                    onAddToCart={(e) => handleAddToCart(e, product)}
                    onClick={() => handleViewProduct(product, resultMessage.kitSerumId)}
                  />
                ))}
              </div>
              {resultMessage.products.length > 1 && (
                <button
                  onClick={() => handleAddAllToCart(resultMessage.products)}
                  className="flex items-center justify-center gap-2 bg-[#2b2724] text-white px-5 py-2.5 md:px-8 md:py-3 rounded-sm font-['Syne',_sans-serif] font-semibold md:text-lg"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add all {resultMessage.products.length} to bag
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
