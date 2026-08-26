import { useMemo, useState } from "react";
import { ProductCard } from "./ProductCard";
import { products } from "../assets/products.json";
import { Header } from "./Header";
import { MarqueeBanner } from "./MarqueeBanner";
import { Newsletter } from "./Newsletter";
import { useSearchParams } from "react-router-dom";

const CATEGORIES = [
  "All products",
  "Skin Sets",
  ...Array.from(new Set(products.map((p) => p.category).filter((c) => c.toLowerCase() !== "sets"))),
];

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All products");

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All products") return products;
    if (selectedCategory === "Skin Sets") return products.filter((product) => product.category.toLowerCase() === "sets");
    return products.filter((product) => product.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-[#fbf8f3]">
      <div className="fixed top-0 left-0 right-0 z-50">
        <MarqueeBanner />
      </div>
      <Header offsetForMarquee showNavigation={false} />

      <div className="pt-[140px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 no-scrollbar">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setSearchParams(category === "All products" ? {} : { category });
              }}
              className={`px-4 py-2 rounded-2xl text-sm whitespace-nowrap transition-colors border ${
                selectedCategory === category ? "bg-[#2b2724] text-white border-[#2b2724]" : "text-[#2b2724] border-[#2b2724]/20 hover:border-[#2b2724]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#5b4f4d]">No products in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <Newsletter />
    </div>
  );
}
