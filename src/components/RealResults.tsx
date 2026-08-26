import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { products } from "../assets/products.json";

const guidedFour = products.find((p) => p.id === "the-guided-four")!;
const [guidedFourPriceMin, guidedFourPriceMax] = guidedFour.price.split("-").map((n) => Number(n).toLocaleString());

interface Testimonial {
  id: string;
  image: string;
  quote: string;
  author: string;
  productName: string;
  productSubtitle: string;
  price: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "the-guided-four",
    image: "https://res.cloudinary.com/dbezwd2bu/image/upload/v1787542928/58084edb5ebca3c9f78f785a644ebb694d83d56e_di9gub.png",
    quote: "The guided four with Radiance pro + Mandelic acid toner is my skin's holy grail",
    author: "Ama",
    productName: "The Guided Four",
    productSubtitle: "Four steps. One personalized treatment.",
    price: `${guidedFourPriceMin}–₦${guidedFourPriceMax}`,
  },
  {
    id: "barrier-reset",
    image: "https://res.cloudinary.com/dbezwd2bu/image/upload/v1787542212/a78af26148ce99072cbedd43e74cddcae935d527_hpme5e.png",
    quote: "The combination of Dark spot treatment and Mandelic toner in my routine has done a good job of gradually clearing up the pigmentation issue I have",
    author: "Omowunmi",
    productName: "Brightening Duo",
    productSubtitle: products.find((p) => p.id === "brightening-duo")!.description,
    price: Number(products.find((p) => p.id === "brightening-duo")!.price).toLocaleString(),
  },
  {
    id: "soft-gel-cleanser-100ml",
    image: "https://res.cloudinary.com/dbezwd2bu/image/upload/v1787542466/3777421089e71f2f7547381a69fdfa12760a4fca_p7c2ka.png",
    quote:
      "First, I love the Mandelic toner. It's not drying at all, it's gentle and actually exfoliates. For the dark spot serum, I can see my spots fading gradually. Then the hydro-boost serum, from the first day I got it, my face was so plump. I love it. The gentle cleanser has always been my favorite. It's so so nice.",
    author: "Chisom",
    productName: '"SOFT" Gel Cleanser',
    productSubtitle: products.find((p) => p.id === "soft-gel-cleanser-100ml")!.description,
    price: Number(products.find((p) => p.id === "soft-gel-cleanser-100ml")!.price).toLocaleString(),
  },
  {
    id: "barrier-reset",
    image: "https://res.cloudinary.com/dbezwd2bu/image/upload/v1787542212/29dc69a4c06887c143be8b2dba90d05961a4146a_lshyta.png",
    quote: "Evidently, my skin barrier is restored. It no longer feel itchy and patchy as it use to.",
    author: "Zainab",
    productName: "Barrier Reset",
    productSubtitle: products.find((p) => p.id === "barrier-reset")!.description,
    price: Number(products.find((p) => p.id === "barrier-reset")!.price).toLocaleString(),
  },
];

const AUTO_ADVANCE_MS = 5000;

export function RealResults() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(interval);
  }, []);

  const testimonial = TESTIMONIALS[activeIndex];

  const goTo = (direction: 1 | -1) => {
    setActiveIndex((prev) => (prev + direction + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section id="real-results" className="py-12 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-md mx-auto flex flex-col items-center gap-4">
        <h2 className="font-['Syne',_sans-serif] font-bold text-xl md:text-3xl text-[#2b2724] text-center">Real skin, real results</h2>

        <button
          onClick={() => navigate(`/product/${testimonial.id}`)}
          className="w-full flex flex-col items-center gap-4 text-left cursor-pointer"
          aria-label={`View ${testimonial.productName}`}
        >
          <div className="w-full aspect-square rounded-lg overflow-hidden">
            <img src={testimonial.image} alt={testimonial.productName} className="w-full h-full object-cover" />
          </div>

          <p className="text-sm text-[#2b2724] text-center">
            "{testimonial.quote}" -{testimonial.author}
          </p>

          <div className="w-full max-w-[320px] bg-white border border-black/5 shadow-sm px-4 py-2 flex flex-col items-center gap-2 text-[#2b2724] hover:border-[#2b2724]/30 transition-colors">
            <div className="flex flex-col items-center gap-1">
              <p className="font-['Syne',_sans-serif] font-semibold text-xl">{testimonial.productName}</p>
              <p className="text-sm text-center">{testimonial.productSubtitle}</p>
            </div>
            <p className="font-['Syne',_sans-serif] font-semibold text-xl">₦{testimonial.price}</p>
          </div>
        </button>

        <div className="flex items-center gap-2">
          <button onClick={() => goTo(-1)} aria-label="Previous review" className="text-[#2b2724] hover:opacity-60 transition-opacity">
            <ChevronLeft className="w-6 h-6" />
          </button>
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to review ${i + 1}`}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${i === activeIndex ? "bg-[#2b2724]" : "bg-[#2b2724]/20"}`}
            />
          ))}
          <button onClick={() => goTo(1)} aria-label="Next review" className="text-[#2b2724] hover:opacity-60 transition-opacity">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
