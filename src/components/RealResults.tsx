import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import beforeAfter from "../assets/images/before-after.jpg";

interface Testimonial {
  id: string;
  image: string;
  imageAlt: string;
  quote: string;
  productName: string;
  productSubtitle: string;
  price: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "ama",
    image: beforeAfter,
    imageAlt: "Before and after using The Guided Four routine",
    quote: "The guided four with Radiance pro + Mandelic acid toner is my skin's holy grail",
    productName: "The Guided Four",
    productSubtitle: "Four steps. One personalized treatment.",
    price: "65,000",
  },
];

export function RealResults() {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonial = TESTIMONIALS[activeIndex];
  const dotCount = Math.max(TESTIMONIALS.length, 5);

  const goTo = (direction: 1 | -1) => {
    setActiveIndex((prev) => (prev + direction + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section id="real-results" className="py-12 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-md mx-auto flex flex-col items-center gap-4">
        <h2 className="font-['Syne',_sans-serif] font-bold text-xl md:text-3xl text-[#2b2724] text-center">Real skin, real results</h2>

        <div className="w-full aspect-square rounded-lg overflow-hidden">
          <img src={testimonial.image} alt={testimonial.imageAlt} className="w-full h-full object-cover" />
        </div>

        <p className="text-sm text-[#2b2724] text-center">"{testimonial.quote}" -{testimonial.id === "ama" ? "Ama" : ""}</p>

        <div className="w-full max-w-[320px] bg-white border border-black/5 shadow-sm px-4 py-2 flex flex-col items-center gap-2 text-[#2b2724]">
          <div className="flex flex-col items-center gap-1">
            <p className="font-['Syne',_sans-serif] font-semibold text-xl">{testimonial.productName}</p>
            <p className="text-sm text-center">{testimonial.productSubtitle}</p>
          </div>
          <p className="font-['Syne',_sans-serif] font-semibold text-xl">₦{testimonial.price}</p>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => goTo(-1)} disabled={TESTIMONIALS.length < 2} aria-label="Previous result" className="text-[#2b2724] disabled:opacity-30">
            <ChevronLeft className="w-6 h-6" />
          </button>
          {Array.from({ length: dotCount }).map((_, i) => (
            <span key={i} className={`w-1.5 h-1.5 rounded-full ${i === activeIndex ? "bg-[#2b2724]" : "bg-[#2b2724]/20"}`} />
          ))}
          <button onClick={() => goTo(1)} disabled={TESTIMONIALS.length < 2} aria-label="Next result" className="text-[#2b2724] disabled:opacity-30">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
