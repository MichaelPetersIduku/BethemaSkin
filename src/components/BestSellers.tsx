import { motion } from "motion/react";
import { Star, ShoppingCart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { products } from "../assets/products.json";

const bestSellers = products.filter((product) => product.badge === "BEST SELLER");

export function BestSellers() {
  return (
    <section id="bestsellers" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl md:text-5xl tracking-wider mb-4">BEST SELLERS</h2>
            <p className="text-black/60 max-w-2xl mx-auto">Our most loved formulas, trusted by thousands for their transformative results</p>
          </motion.div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestSellers.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => window.open(product.url, "_self")}
            >
              {/* Product Image */}
              <div className="relative aspect-square mb-4 overflow-hidden bg-gray-50">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badge */}
                <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs tracking-wider">{product.badge}</div>

                {/* Quick Add Button */}
                {/* <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-4 right-4 bg-white text-black py-3 flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span className="text-sm tracking-wide">QUICK ADD</span>
                </motion.button> */}
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                <h3 className="tracking-wide">{product.name}</h3>
                <p className="text-sm text-black/60">{product.description}</p>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={_} className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-black text-black" : "text-black/20"}`} />
                    ))}
                  </div>
                  <span className="text-xs text-black/60">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <p className="text-lg">₦{product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open("/shop", "_blank")}
            className="px-10 py-3 border-2 border-black text-black tracking-wider hover:bg-black hover:text-white transition-all duration-300"
          >
            VIEW ALL PRODUCTS
          </motion.button>
        </div>
      </div>
    </section>
  );
}
