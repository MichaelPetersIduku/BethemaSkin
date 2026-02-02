import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { products } from "../assets/products.json";
import { Header } from "./Header";

const categories = ["All", "Serums", "Moisturizers", "Cleansers", "Body Oils"];

const allProducts = products;

export function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = selectedCategory === "All" ? allProducts : allProducts.filter((product) => product.category === selectedCategory);

  return (
    <>
      <Header showNavigation={false} />
      <br />
      <br />
      <div className="w-full py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl mb-4">Shop All Products</h1>
            <p className="text-xl text-neutral-600">Discover our complete collection of premium skincare</p>
          </div>

          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 transition-colors ${
                    selectedCategory === category ? "bg-neutral-900 text-white" : "bg-white text-neutral-900 border border-neutral-300 hover:border-neutral-900"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-neutral-600">No products found in this category.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
