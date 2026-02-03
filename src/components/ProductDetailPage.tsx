import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCart } from "../contexts/CartContext";
import { toast } from "sonner";
import { ShoppingBag, Star, Truck, RotateCcw, ShieldCheck, Minus, Plus, ArrowLeft } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { convertStringAmountToNumber } from "../utils/utility";
import { products } from "../assets/products.json";
import { Header } from "./Header";
// motion import removed (not used in this file)

// Product data - in a real app, this would come from a database
const allProducts = products;

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState<"description" | "ingredients" | "reviews">("description");

  const product = allProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl mb-4">Product not found</h1>
        <button onClick={() => navigate("/shop")} className="bg-neutral-900 text-white px-8 py-4 hover:bg-neutral-800 transition-colors">
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
        price: product.price,
        image: product.image,
      });
    }
    toast.success(`${product.name} ${quantity > 1 ? `(${quantity})` : ""} added to cart`);
  };

  // const relatedProducts = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <>
      <Header showNavigation={false} />
      <br />
      <br />
      <div className="w-full">
        {/* Product Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <button onClick={() => window.history.back()} className="text-neutral-600 hover:text-neutral-900 mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5 inline-block mr-2" />
            Back
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
              <button
                onClick={handleAddToCart}
                disabled={product.outOfStock}
                className="w-full bg-neutral-900 text-white py-4 mb-4 hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                {product.outOfStock ? "Out of Stock" : `Add to Cart - ₦${(convertStringAmountToNumber(product.price) * quantity).toLocaleString()}`}
              </button>

              {/* Buy Now Button */}
              {product.outOfStock ? (
                <button disabled className="w-full bg-neutral-300 text-neutral-500 py-4 mb-4 cursor-not-allowed">
                  This product is currently out of stock
                </button>
              ) : (
                <button
                  // onClick={() => setIsPaymentModalOpen(true)}
                  onClick={() => {
                    // Navigate to checkout with product data in URL params
                    const params = new URLSearchParams({
                      productId: product.id.toString(),
                      quantity: quantity.toString(),
                    });
                    navigate(`/checkout?${params.toString()}`);
                  }}
                  className="w-full bg-white text-black border-2 border-black py-4 mb-4 hover:bg-black hover:text-white transition-colors"
                >
                  Buy Now - ₦{(convertStringAmountToNumber(product.price) * quantity).toLocaleString()}
                </button>
              )}

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
                        comment:
                          "Good product! Took a few weeks to see results but definitely worth it. Would give 5 stars but I wish it came in a larger size.",
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
      </div>
    </>
  );
}
