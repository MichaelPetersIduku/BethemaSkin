import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCart } from "../contexts/CartContext";
import { toast } from "sonner";
import { ShoppingBag, Star, Truck, RotateCcw, ShieldCheck, Minus, Plus, ArrowLeft } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { PaymentModal } from "./PaymentModal";
import { convertStringAmountToNumber } from "../utils/utility";
// motion import removed (not used in this file)

// Product data - in a real app, this would come from a database
const allProducts = [
  {
    id: "radiance",
    name: "Radiance",
    description: "Daily moisturiser that targets uneven skin tone and dark spots/acne marks",
    category: "Moisurizers",
    price: "9,490",
    rating: 4.9,
    reviews: 8,
    image: "https://res.cloudinary.com/dbezwd2bu/image/upload/v1757081870/IMG_5837_veof4h.jpg",
    badge: "BEST SELLER",
    url: "https://shop.bethemaskin.com/products/radiance-moisturizer-brighten-dark-spots-restore-skin-clarity/1996399?location=159059",
    fullDescription:
      "Achieve radiant, even-toned skin with Bethema Skin's Radiance Moisturizer, expertly formulated for oily, acne-prone skin yet gentle enough for normal to dry skin. This lightweight, non-comedogenic moisturizer absorbs quickly without clogging pores, making it the perfect everyday solution for anyone dealing with dark spots, acne scars, or dullness.",
    benefits: [
      "Fades hyperpigmentation and acne scars",
      "Brightens and evens skin tone",
      "Weightless hydration for all skin types",
      "Made for the realities of African skin",
      "Radiance helps restore balance, fade blemishes, and reveal your skin’s natural glow — without irritation or a greasy finish.",
    ],
    ingredients:
      "Aqua, Capryl triglyceride, Propanediol, Tranexamic acid, Cetearyl Olivate, Sorbitan Olivate, Niacinamide, Glycerin, Alpha arbutin, Sunflower seed oil, Dipotassium glycyrrhizate (Licorice), Glyceryl stearate, phenoxyethanol and ethylhexylglycerin, Allantoin, Xanthan gum ",
    howToUse: "Apply a pea size amount to clean, damp skin morning or evening. Gently pat into face and neck.  Always use SPF during the day.",
    size: "50ml / 1.69 fl oz",
  },
  {
    id: "hydrating-drops",
    name: "Hydrating Drops",
    description: "Simple lightweight serum for intense hydration and rejuvenation",
    category: "Serums",
    price: "7,500",
    rating: 4.7,
    reviews: 8,
    image: "https://res.cloudinary.com/dbezwd2bu/image/upload/v1769866880/Photoroom_20250728_191108_cyohax.jpg",
    badge: "BEST SELLER",
    url: "https://shop.bethemaskin.com/products/hydrating-drops-lightweight-serum-with-hyaluronic-acid-niacinamide-pentavitin/1630830?location=159059",
    fullDescription:
      "Hydrating Drops is a lightweight, moisture-boosting serum for oily, dehydrated, and acne-prone skin. With 1% Hyaluronic Acid, Pentavitin®️, and 2% Niacinamide, it hydrates deeply, smooths texture, and supports your moisture barrier without clogging pores or feeling sticky.",
    benefits: [
      "Multi-layer hydration for plump, refreshed skin",
      "Barrier support to calm and strengthen skin",
      "Lightweight, non-comedogenic finish ideal for oily and sensitive skin",
    ],
    ingredients:
      "Aqua, Capryl triglyceride, Propanediol, Tranexamic acid, Cetearyl Olivate, Sorbitan Olivate, Niacinamide, Glycerin, Alpha arbutin, Sunflower seed oil, Dipotassium glycyrrhizate (Licorice), Glyceryl stearate, phenoxyethanol and ethylhexylglycerin, Allantoin, Xanthan gum ",
    howToUse:
      "Apply 2–3 drops to clean, dry skin in the morning or night. Gently massage in circular motions until fully absorbed. Follow with moisturizer and broad-spectrum SPF(during the day)",
    size: "50ml / 1.69 fl oz",
  },
  {
    id: "glow-c-serum",
    name: "Glow C Serum",
    description: "A day-time protective serum for brighter and youthful skin",
    category: "Serums",
    price: "6,500",
    rating: 4.8,
    reviews: 8,
    image: "https://res.cloudinary.com/dbezwd2bu/image/upload/v1765281494/vc_uo1el1.jpg",
    badge: "BEST SELLER",
    url: "https://shop.bethemaskin.com/products/glow-c-serum-vitamin-c-alpha-arbutin-for-radiant-even-toned-skin/1057380?location=159059",
    fullDescription:
      "Whether you’re targeting dark spots, uneven skin tone, or tired-looking skin, Glow C helps restore a brighter, dewy, and healthier-looking complexion — without irritation.",
    benefits: [
      "Brightens dull skin & fades dark spots with stabilized Vitamin C and Alpha Arbutin",
      "Deeply hydrates with Hyaluronic Acid for plumper, smoother skin",
      "Evens skin tone and supports collagen for youthful glow",
      "Shields against environmental damage and oxidative stress",
      "Lightweight & non-comedogenic – suitable for all skin types",
    ],
    ingredients:
      "Aqua, Capryl triglyceride, Propanediol, Tranexamic acid, Cetearyl Olivate, Sorbitan Olivate, Niacinamide, Glycerin, Alpha arbutin, Sunflower seed oil, Dipotassium glycyrrhizate (Licorice), Glyceryl stearate, phenoxyethanol and ethylhexylglycerin, Allantoin, Xanthan gum ",
    howToUse:
      "Apply 2–3 drops to clean, dry skin in the morning. Gently massage in circular motions until fully absorbed. Follow with moisturizer and broad-spectrum SPF",
    size: "50ml / 1.69 fl oz",
  },
  // {
  //   id: 2,
  //   name: "Glow C Serum",
  //   description: "A day-time protective serum for brighter and youthful skin",
  //   price: "6,500",
  //   rating: 4.8,
  //   reviews: 289,
  //   image: "https://res.cloudinary.com/dbezwd2bu/image/upload/v1765281494/vc_uo1el1.jpg",
  //   badge: "BEST SELLER",
  //   url: "https://shop.bethemaskin.com/products/glow-c-serum-vitamin-c-alpha-arbutin-for-radiant-even-toned-skin/1057380?location=159059",
  // },
  // {
  //   id: 3,
  //   name: "Soft Gel Cleanser",
  //   description: "Gentle face wash with aloe vera and green tea.",
  //   price: "5,000 - ₦8,500",
  //   rating: 5.0,
  //   reviews: 412,
  //   image: "https://res.cloudinary.com/dbezwd2bu/image/upload/v1765281494/gel_zgcalm.jpg",
  //   badge: "BEST SELLER",
  //   url: "https://shop.bethemaskin.com/products/soft-gel-cleanser-gentle-face-wash-with-aloe-vera-green-tea/1057291?location=159059",
  // },
  // {
  //   id: 4,
  //   name: "Hydrating Drops",
  //   description: "Simple lightweight serum for intense hydration and rejuvenation",
  //   price: "7,500",
  //   rating: 4.7,
  //   reviews: 256,
  //   image: "https://res.cloudinary.com/dbezwd2bu/image/upload/v1765281494/hydra_pfgmoi.jpg",
  //   badge: "BEST SELLER",
  //   url: "https://shop.bethemaskin.com/products/hydrating-drops-lightweight-serum-with-hyaluronic-acid-niacinamide-pentavitin/1630830?location=159059",
  // },
];

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState<"description" | "ingredients" | "reviews">("description");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const product = allProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl mb-4">Product not found</h1>
        <button
          onClick={() => window.open("https://shop.bethemaskin.com", "_self")}
          className="bg-neutral-900 text-white px-8 py-4 hover:bg-neutral-800 transition-colors"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: convertStringAmountToNumber(product.price),
        image: product.image,
      });
    }
    toast.success(`${product.name} ${quantity > 1 ? `(${quantity})` : ""} added to cart`);
  };

  // const relatedProducts = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div className="w-full">
      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button onClick={() => navigate("/")} className="text-neutral-600 hover:text-neutral-900 mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5 inline-block mr-2" />
          Back to Home
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="aspect-square bg-neutral-100">
            <ImageWithFallback src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Product Info */}
          <div>
            <p className="text-neutral-600 mb-2">{product.category}</p>
            <h1 className="text-4xl mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className={`w-5 h-5 ${star <= Math.round(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-neutral-300"}`} />
                ))}
              </div>
              <span className="text-neutral-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <p className="text-3xl mb-6">₦{product.price}</p>

            <p className="text-lg text-neutral-700 mb-6">{product.fullDescription}</p>

            {/* Key Benefits */}
            <div className="mb-8">
              <h3 className="text-xl mb-3">✨ Key Benefits</h3>
              <ul className="space-y-2">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span className="text-neutral-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-neutral-700 mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center border border-neutral-300 hover:bg-neutral-100 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center border border-neutral-300 hover:bg-neutral-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            {/* <button
              onClick={handleAddToCart}
              className="w-full bg-neutral-900 text-white py-4 mb-4 hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              Add to Cart - ₦{(convertStringAmountToNumber(product.price) * quantity).toFixed(2)}
            </button> */}

            {/* Buy Now Button */}
            <button
              onClick={() => setIsPaymentModalOpen(true)}
              className="w-full bg-white text-black border-2 border-black py-4 mb-4 hover:bg-black hover:text-white transition-colors"
            >
              Buy Now - ₦{(convertStringAmountToNumber(product.price) * quantity).toLocaleString()}
            </button>

            {/* Product Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-200">
              <div className="text-center">
                <Truck className="w-6 h-6 mx-auto mb-2 text-neutral-600" />
                <p className="text-sm text-neutral-600">Low Shipping Fee</p>
                {/* <p className="text-xs text-neutral-500">Orders over $75</p> */}
              </div>
              {/* <div className="text-center">
                <RotateCcw className="w-6 h-6 mx-auto mb-2 text-neutral-600" />
                <p className="text-sm text-neutral-600">Easy Returns</p>
                <p className="text-xs text-neutral-500">30-day policy</p>
              </div> */}
              <div className="text-center">
                <ShieldCheck className="w-6 h-6 mx-auto mb-2 text-neutral-600" />
                <p className="text-sm text-neutral-600">Secure Checkout</p>
                <p className="text-xs text-neutral-500">SSL encrypted</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mb-16">
          <div className="border-b border-neutral-200 mb-6">
            <div className="flex gap-8">
              <button
                onClick={() => setSelectedTab("description")}
                className={`pb-4 border-b-2 transition-colors ${
                  selectedTab === "description" ? "border-neutral-900 text-neutral-900" : "border-transparent text-neutral-600 hover:text-neutral-900"
                }`}
              >
                How to Use
              </button>
              <button
                onClick={() => setSelectedTab("ingredients")}
                className={`pb-4 border-b-2 transition-colors ${
                  selectedTab === "ingredients" ? "border-neutral-900 text-neutral-900" : "border-transparent text-neutral-600 hover:text-neutral-900"
                }`}
              >
                Ingredients
              </button>
              <button
                onClick={() => setSelectedTab("reviews")}
                className={`pb-4 border-b-2 transition-colors ${
                  selectedTab === "reviews" ? "border-neutral-900 text-neutral-900" : "border-transparent text-neutral-600 hover:text-neutral-900"
                }`}
              >
                Reviews ({product.reviews})
              </button>
            </div>
          </div>

          <div className="max-w-3xl">
            {selectedTab === "description" && (
              <div>
                <h3 className="text-xl mb-4">How to Use</h3>
                <p className="text-neutral-700 mb-4">{product.howToUse}</p>
                {/* <p className="text-neutral-600">Size: {product.size}</p> */}
              </div>
            )}

            {selectedTab === "ingredients" && (
              <div>
                <h3 className="text-xl mb-4">Full Ingredients List</h3>
                <p className="text-neutral-700">{product.ingredients}</p>
              </div>
            )}

            {selectedTab === "reviews" && (
              <div>
                <h3 className="text-xl mb-6">Customer Reviews</h3>
                <div className="space-y-6">
                  {/* Sample reviews */}
                  {[
                    {
                      name: "Chioma A.",
                      rating: 5,
                      date: "January 20, 2026",
                      verified: true,
                      comment:
                        "This product has been a game changer for my skincare routine! I have combination skin and it works perfectly. Noticed visible improvements in just 2 weeks. Highly recommend!",
                    },
                    {
                      name: "Blessing O.",
                      rating: 5,
                      date: "January 15, 2026",
                      verified: true,
                      comment:
                        "Absolutely love this! The texture is lightweight and absorbs quickly. My skin feels so much more hydrated and looks radiant. Worth every penny.",
                    },
                    {
                      name: "Sarah M.",
                      rating: 5,
                      date: "January 10, 2026",
                      verified: false,
                      comment:
                        "Best skincare purchase I've made this year. My skin has never looked better. I noticed results within the first week. Will definitely repurchase!",
                    },
                    {
                      name: "Temi K.",
                      rating: 4,
                      date: "January 5, 2026",
                      verified: true,
                      comment:
                        "Great product overall! Took about 3 weeks to see significant results, but it was worth the wait. The only reason for 4 stars is the price, but quality is excellent.",
                    },
                    {
                      name: "Jessica L.",
                      rating: 5,
                      date: "December 28, 2025",
                      verified: true,
                      comment:
                        "This is now a staple in my skincare routine. The formula is gentle yet effective. Perfect for my sensitive skin. Customer service was also excellent!",
                    },
                    {
                      name: "Amara N.",
                      rating: 5,
                      date: "December 22, 2025",
                      verified: true,
                      comment:
                        "I've tried so many products and this is by far the best! My dark spots have faded significantly and my skin tone is more even. Thank you Bethema Skin!",
                    },
                    {
                      name: "Emily R.",
                      rating: 4,
                      date: "December 15, 2025",
                      verified: false,
                      comment: "Good product! Took a few weeks to see results but definitely worth it. Would give 5 stars but I wish it came in a larger size.",
                    },
                    {
                      name: "Funmi D.",
                      rating: 5,
                      date: "December 10, 2025",
                      verified: true,
                      comment:
                        "Amazing quality! Delivery was fast and the packaging was beautiful. My skin feels softer and looks brighter. Will be ordering more!",
                    },
                  ].map((review, index) => (
                    <div key={index} className="pb-6 border-b border-neutral-200 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{review.name}</span>
                          {review.verified && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Verified Purchase</span>}
                        </div>
                        <span className="text-sm text-neutral-500">{review.date}</span>
                      </div>
                      <div className="flex mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className={`w-4 h-4 ${star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-neutral-300"}`} />
                        ))}
                      </div>
                      <p className="text-neutral-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {/* {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )} */}
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        totalAmount={convertStringAmountToNumber(product.price) * quantity}
        productName={product.name}
        quantity={quantity}
      />
    </div>
  );
}
