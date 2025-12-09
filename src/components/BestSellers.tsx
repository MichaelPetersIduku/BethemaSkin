import { motion } from "motion/react";
import { Star, ShoppingCart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const products = [
  {
    id: 1,
    name: "Radiance",
    description: "Daily moisturiser that targets uneven skin tone and dark spots/acne marks",
    price: "9,490",
    rating: 4.9,
    reviews: 324,
    image: "https://res.cloudinary.com/dbezwd2bu/image/upload/v1757081870/IMG_5837_veof4h.jpg",
    badge: "BEST SELLER",
    url: "https://shop.bethemaskin.com/products/radiance-moisturizer-brighten-dark-spots-restore-skin-clarity/1996399?location=159059",
  },
  {
    id: 2,
    name: "Glow C Serum",
    description: "A day-time protective serum for brighter and youthful skin",
    price: "6,500",
    rating: 4.8,
    reviews: 289,
    image: "https://res.cloudinary.com/dbezwd2bu/image/upload/v1765281494/vc_uo1el1.jpg",
    badge: "BEST SELLER",
    url: "https://shop.bethemaskin.com/products/glow-c-serum-vitamin-c-alpha-arbutin-for-radiant-even-toned-skin/1057380?location=159059",
  },
  {
    id: 3,
    name: "Soft Gel Cleanser",
    description: "Gentle face wash with aloe vera and green tea.",
    price: "5,000 - ₦8,500",
    rating: 5.0,
    reviews: 412,
    image: "https://res.cloudinary.com/dbezwd2bu/image/upload/v1765281494/gel_zgcalm.jpg",
    badge: "BEST SELLER",
    url: "https://shop.bethemaskin.com/products/soft-gel-cleanser-gentle-face-wash-with-aloe-vera-green-tea/1057291?location=159059",
  },
  {
    id: 4,
    name: "Hydrating Drops",
    description: "Simple lightweight serum for intense hydration and rejuvenation",
    price: "7,500",
    rating: 4.7,
    reviews: 256,
    image: "https://res.cloudinary.com/dbezwd2bu/image/upload/v1765281494/hydra_pfgmoi.jpg",
    badge: "BEST SELLER",
    url: "https://shop.bethemaskin.com/products/hydrating-drops-lightweight-serum-with-hyaluronic-acid-niacinamide-pentavitin/1630830?location=159059",
  },
];

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
          {products.map((product, index) => (
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
                      <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? "fill-black text-black" : "text-black/20"}`} />
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
            onClick={() => window.open("https://shop.bethemaskin.com", "_blank")}
            className="px-10 py-3 border-2 border-black text-black tracking-wider hover:bg-black hover:text-white transition-all duration-300"
          >
            VIEW ALL PRODUCTS
          </motion.button>
        </div>
      </div>
    </section>
  );
}
