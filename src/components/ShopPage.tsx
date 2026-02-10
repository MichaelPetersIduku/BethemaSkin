import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ProductCard } from "./ProductCard";
import { products } from "../assets/products.json";
import { Header } from "./Header";
import { useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = ["All", "Serums", "Moisturizers", "Cleansers", "Body Care"];

const allProducts = products;
const bannerSlides = [
  {
    id: 1,
    image: "https://res.cloudinary.com/dbezwd2bu/image/upload/v1768474686/IMG_7037_l3lz3i.png",
    title: "We care about your Skin",
    subtitle: "Discover our latest luxury formulations",
    cta: "",
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/dbezwd2bu/image/upload/v1768474630/IMG_7039_kbbjul.png",
    title: "Mild Cleansing formula",
    subtitle: "Exclusive collections for radiant skin",
    cta: "",
  },
  // {
  //   id: 3,
  //   image: "https://res.cloudinary.com/dbezwd2bu/image/upload/v1632380540/samples/cloudinary-group.jpg",
  //   title: "Winter Collection",
  //   subtitle: "Intensive hydration for the season",
  //   cta: "Learn More",
  // },
];
export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All");

  const filteredProducts = selectedCategory === "All" ? allProducts : allProducts.filter((product) => product.category === selectedCategory);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Header showNavigation={false} />
      {/* Banner Carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-white border-b border-neutral-200 relative overflow-hidden"
      >
        <div className="relative h-[30vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <img src={bannerSlides[currentSlide].image} alt={bannerSlides[currentSlide].title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="max-w-2xl">
                    <h2 className="text-2xl md:text-4xl lg:text-5xl text-white mb-2 tracking-tight">{bannerSlides[currentSlide].title}</h2>
                    <p className="text-sm md:text-base text-white/90 mb-4">{bannerSlides[currentSlide].subtitle}</p>
                    {/* <button className="bg-white text-neutral-900 px-6 py-2 text-sm hover:bg-neutral-100 transition-all duration-300 tracking-wide">
                      {bannerSlides[currentSlide].cta}
                    </button> */}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {/* <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-2 backdrop-blur-sm transition-all duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-2 backdrop-blur-sm transition-all duration-300"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button> */}

          {/* Dots Navigation */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {bannerSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === index ? "bg-white w-8" : "bg-white/50 hover:bg-white/70"}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
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
                  onClick={() => {
                    setSelectedCategory(category);
                    setSearchParams({ category });
                  }}
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8">
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
