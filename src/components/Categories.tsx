import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "SERUMS",
    description: "Concentrated formulas for targeted treatment",
    image: "https://res.cloudinary.com/dbezwd2bu/image/upload/v1757081707/IMG_4278_glhzr1.jpg",
    count: 3,
    url: "/shop?category=Serums",
  },
  {
    id: 2,
    name: "MOISTURIZERS",
    description: "Hydration for every skin type",
    image: "https://res.cloudinary.com/dbezwd2bu/image/upload/v1757081870/IMG_5837_veof4h.jpg",
    count: 2,
    url: "/shop?category=Moisturizers",
  },
  {
    id: 3,
    name: "CLEANSERS",
    description: "Gentle purification essentials",
    image: "https://res.cloudinary.com/dbezwd2bu/image/upload/v1757081118/IMG_3598_in4lok.jpg",
    count: 2,
    url: "/shop?category=Cleansers",
  },
  {
    id: 4,
    name: "BODY OILS",
    description: "Balance and prep your skin",
    image: "https://res.cloudinary.com/dbezwd2bu/image/upload/v1757082080/bodyoil_bvnv4f.jpg",
    count: 1,
    url: "/shop?category=Body%20Care",
  },
];

export function Categories() {
  return (
    <section id="categories" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="font-['Syne',_sans-serif] font-bold text-4xl md:text-5xl tracking-wider mb-4">SHOP BY CATEGORY</h2>
            <p className="text-black/60 max-w-2xl mx-auto">Find the perfect solution for your skincare needs</p>
          </motion.div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden bg-white cursor-pointer"
              onClick={() => window.open(category.url, "_self")}
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <ImageWithFallback
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <h3 className="font-['Syne',_sans-serif] font-semibold text-xl tracking-wider mb-2">{category.name}</h3>
                <p className="text-sm text-white/90 mb-4">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/80">{category.count} Products</span>
                  <motion.div initial={{ x: -5, opacity: 0 }} whileHover={{ x: 0, opacity: 1 }} className="flex items-center space-x-2">
                    <span className="text-sm tracking-wide">SHOP NOW</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
