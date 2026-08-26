import { useMemo, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCart } from "../contexts/CartContext";
import { toast } from "sonner";
import { ShoppingBag, Star, Minus, Plus, ArrowLeft, ChevronDown } from "lucide-react";
import { convertStringAmountToNumber } from "../utils/utility";
import { GUIDED_FOUR_SERUM_IDS, resolveGuidedFourPrice } from "../utils/guidedFourPricing";
import { products } from "../assets/products.json";
import { Header } from "./Header";
import { MarqueeBanner } from "./MarqueeBanner";
import { Newsletter } from "./Newsletter";

const allProducts = products;

const SAMPLE_REVIEWS = [
  {
    name: "Chioma A.",
    id: 1,
    rating: 5,
    date: "January 20, 2026",
    verified: true,
    comment:
      "This product has been a game changer for my skincare routine! I have combination skin and it works perfectly. Noticed visible improvements in just 2 weeks. Highly recommend!",
  },
  {
    name: "Blessing O.",
    id: 2,
    rating: 5,
    date: "January 15, 2026",
    verified: true,
    comment: "Absolutely love this! The texture is lightweight and absorbs quickly. My skin feels so much more hydrated and looks radiant. Worth every penny.",
  },
  {
    name: "Sarah M.",
    id: 3,
    rating: 5,
    date: "January 10, 2026",
    verified: false,
    comment:
      "Best skincare purchase I've made this year. My skin has never looked better. I noticed results within the first week. Will definitely repurchase!",
  },
  {
    name: "Temi K.",
    rating: 4,
    id: 4,
    date: "January 5, 2026",
    verified: true,
    comment:
      "Great product overall! Took about 3 weeks to see significant results, but it was worth the wait. The only reason for 4 stars is the price, but quality is excellent.",
  },
];

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-black/10">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4 text-left text-[#2b2724]">
        <span>{title}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="pb-4 text-sm text-[#5b4f4d] whitespace-pre-line">{children}</div>}
    </div>
  );
}

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = allProducts.find((p) => p.id === id);
  const isGuidedFour = id === "the-guided-four";

  const serumOptions = useMemo(() => GUIDED_FOUR_SERUM_IDS.map((serumId) => allProducts.find((p) => p.id === serumId)!).filter(Boolean), []);
  // A quiz recommendation can deep-link the pre-selected serum, e.g. ?serum=radiance-pro
  const requestedSerumId = searchParams.get("serum");
  const initialSerumId = serumOptions.some((s) => s.id === requestedSerumId) ? requestedSerumId! : serumOptions[0]?.id;
  const [selectedSerumId, setSelectedSerumId] = useState(initialSerumId);
  const selectedSerum = serumOptions.find((s) => s.id === selectedSerumId);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="font-['Syne',_sans-serif] font-bold text-4xl mb-4">Product not found</h1>
        <button
          onClick={() => navigate("/shop")}
          className="bg-[#2b2724] text-white px-8 py-4 rounded-sm hover:bg-[#2b2724]/90 transition-colors font-['Syne',_sans-serif] font-semibold"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  // Resolve a concrete unit price. "The Guided Four" stores a "min-max" range
  // string since its real price depends on the selected treatment serum.
  const resolvedPrice = isGuidedFour ? resolveGuidedFourPrice(allProducts, selectedSerumId) : convertStringAmountToNumber(product.price);

  const priceLabel = isGuidedFour
    ? `₦${Number(product.price.split("-")[0]).toLocaleString()}–₦${Number(product.price.split("-")[1]).toLocaleString()}`
    : `₦${Number(product.price).toLocaleString()}`;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({ id: product.id, name: product.name, price: String(resolvedPrice), image: product.image });
    }
    toast.success(`${product.name}${quantity > 1 ? ` (${quantity})` : ""} added to bag`);
  };

  const handleBuyNow = () => {
    const params = new URLSearchParams({ productId: product.id, quantity: quantity.toString() });
    navigate(`/checkout?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#fbf8f3]">
      <div className="fixed top-0 left-0 right-0 z-50">
        <MarqueeBanner />
      </div>
      <Header offsetForMarquee showNavigation={false} />

      <div className="pt-[140px] max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <button onClick={() => navigate("/shop")} className="flex items-center gap-2 text-[#2b2724] mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to shop
        </button>

        {/* Image */}
        <div className="aspect-square rounded-lg overflow-hidden bg-neutral-100 mb-6">
          <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Info */}
        <h1 className="font-['Syne',_sans-serif] font-bold text-2xl text-[#2b2724] mb-1">{product.name}</h1>
        <p className="text-[#5b4f4d] mb-3">{product.description}</p>

        <div className="flex items-center justify-between mb-1">
          <p className="font-['Syne',_sans-serif] font-semibold text-xl text-[#2b2724]">{priceLabel}</p>
          {/* <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-[#2b2724] text-[#2b2724]" />
            <span className="text-sm text-[#2b2724]">{product.rating > 0 ? `${product.rating}/5` : "New"}</span>
          </div> */}
        </div>
        <p className="text-sm text-[#5b4f4d] mb-4">Size: {product.size}</p>

        {isGuidedFour && (
          <div className="mb-6">
            <p className="text-sm text-[#2b2724] mb-2">Select a serum{selectedSerum && <span className="text-[#5b4f4d]"> — {selectedSerum.name}</span>}</p>
            <div className="flex gap-2">
              {serumOptions.map((serum) => (
                <button
                  key={serum.id}
                  onClick={() => setSelectedSerumId(serum.id)}
                  className={`w-20 h-20 rounded-sm overflow-hidden border-2 ${selectedSerumId === serum.id ? "border-[#2b2724]" : "border-transparent"}`}
                  aria-label={serum.name}
                  title={serum.name}
                >
                  <ImageWithFallback src={serum.image} alt={serum.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity + Add to bag */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center border border-black/10 rounded-sm">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center hover:bg-black/5">
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center hover:bg-black/5">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={product.outOfStock}
            className="flex-1 bg-[#2b2724] text-white py-2.5 rounded-sm flex items-center justify-center gap-2 font-['Syne',_sans-serif] font-semibold disabled:opacity-50"
          >
            <ShoppingBag className="w-4 h-4" />
            {product.outOfStock ? "Out of stock" : "Add to bag"}
          </button>
        </div>

        {!product.outOfStock && (
          <button
            onClick={handleBuyNow}
            className="w-full border-2 border-[#2b2724] text-[#2b2724] py-2.5 rounded-sm mb-8 font-['Syne',_sans-serif] font-semibold hover:bg-[#2b2724] hover:text-white transition-colors"
          >
            Buy now — ₦{(resolvedPrice * quantity).toLocaleString()}
          </button>
        )}

        {/* Accordion */}
        <div className="mb-10">
          <Accordion title="Details">{product.fullDescription}</Accordion>
          <Accordion title="Benefits">
            <ul className="space-y-1">
              {product.benefits.map((benefit) => (
                <li key={benefit}>• {benefit}</li>
              ))}
            </ul>
          </Accordion>
          <Accordion title="How to use">{product.howToUse}</Accordion>
          <Accordion title="Ingredients">{product.ingredients}</Accordion>
        </div>

        {/* Reviews — temporarily hidden
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-['Syne',_sans-serif] font-bold text-xl text-[#2b2724]">Reviews</h2>
          <button
            onClick={() => toast("Reviews are coming soon!")}
            className="bg-[#2b2724] text-white px-5 py-2 rounded-sm text-sm font-['Syne',_sans-serif] font-semibold"
          >
            Write a review
          </button>
        </div>
        <div className="space-y-6 mb-16">
          {SAMPLE_REVIEWS.map((review) => (
            <div key={review.id} className="pb-6 border-b border-black/10 last:border-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[#2b2724]">{review.name}</span>
                  {review.verified && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Verified Purchase</span>}
                </div>
                <span className="text-sm text-[#5b4f4d]">{review.date}</span>
              </div>
              <div className="flex mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className={`w-4 h-4 ${star <= review.rating ? "fill-[#2b2724] text-[#2b2724]" : "text-black/20"}`} />
                ))}
              </div>
              <p className="text-sm text-[#5b4f4d]">{review.comment}</p>
            </div>
          ))}
        </div>
        */}
      </div>

      <Newsletter />
    </div>
  );
}
