import { useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { Star, ShoppingBag, ArrowLeft, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { products } from "../assets/products.json";
import { useCart } from "../contexts/CartContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const FILTERS = ["New + Bestsellers", "Acne & Blackheads", "Uneven Skin Tone", "Dryness", "Redness & Sensitivity", "Clogged pores"];

export function BestSellers() {
  const [activeFilter, setActiveFilter] = useState(FILTERS[0]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const filteredProducts = useMemo(() => {
    if (activeFilter === "New + Bestsellers") {
      return products.filter((product) => product.badge === "New" || product.badge === "Bestseller");
    }
    return products.filter((product) => product.concerns?.includes(activeFilter));
  }, [activeFilter]);

  const scrollBy = (direction: 1 | -1) => {
    scrollRef.current?.scrollBy({ left: direction * 336, behavior: "smooth" });
  };

  const handleAddToCart = (e: React.MouseEvent, product: (typeof products)[number]) => {
    e.stopPropagation();
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
    toast.success(`${product.name} added to bag`);
  };

  return (
    <section id="bestsellers" className="py-12 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-['Syne',_sans-serif] font-bold text-xl md:text-3xl text-[#2b2724]">Build your best skin ever</h2>
          <a href="/shop" className="text-sm underline underline-offset-2 text-[#2b2724] whitespace-nowrap">
            Shop all
          </a>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1.5 rounded-2xl text-sm whitespace-nowrap transition-colors ${
                activeFilter === filter ? "bg-[#2b2724] text-white" : "text-[#2b2724] hover:bg-black/5"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Products Row */}
        {filteredProducts.length === 0 ? (
          <p className="text-[#5b4f4d] py-12 text-center">No products match this concern yet — check back soon.</p>
        ) : (
          <div ref={scrollRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 no-scrollbar">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group cursor-pointer shrink-0 w-[280px] snap-start"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                {/* Image */}
                <div className="relative aspect-[320/365] rounded-sm mb-2 overflow-hidden bg-neutral-50">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.badge && (
                    <div className="absolute top-3 left-0 bg-white px-2 py-1">
                      <span className="text-sm text-[#2b2724]">{product.badge}</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-col gap-0.5 mb-2">
                  {/* <div className="flex items-end gap-1">
                    <Star className="w-5 h-5 fill-[#2b2724] text-[#2b2724]" />
                    <span className="text-sm text-black">{product.rating > 0 ? `${product.rating}/5` : "New"}</span>
                  </div> */}
                  <p className="font-['Syne',_sans-serif] font-medium text-base text-[#2b2724]">{product.name}</p>
                  <p className="text-xs text-[#5b4f4d]">{product.description}</p>
                  <p className="font-['Syne',_sans-serif] font-medium text-base text-[#2b2724] mt-1">₦{Number(product.price).toLocaleString()}</p>
                </div>

                {/* Add to bag */}
                <button
                  disabled={product.outOfStock}
                  onClick={(e) => handleAddToCart(e, product)}
                  className="w-full bg-[#2b2724] text-white py-2.5 rounded-sm flex items-center justify-center gap-2 font-['Syne',_sans-serif] font-semibold disabled:opacity-50"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {product.outOfStock ? "Out of stock" : "Add to bag"}
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* Scroll Controls */}
        {filteredProducts.length > 1 && (
          <div className="flex items-center gap-4 mt-2">
            <div className="flex-1 h-px bg-black/10" />
            <button onClick={() => scrollBy(-1)} aria-label="Scroll left" className="text-[#2b2724] hover:opacity-60 transition-opacity">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <button onClick={() => scrollBy(1)} aria-label="Scroll right" className="text-[#2b2724] hover:opacity-60 transition-opacity">
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
