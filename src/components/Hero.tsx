import { motion } from "motion/react";
import heroImage from "figma:asset/04fe219bd0587194bb3ee4777ee5f32668355216.png";

export function Hero() {
  const cloudinaryUrl = "https://res.cloudinary.com/dbezwd2bu/image/upload/v1765315754/IMG_6803_ubi1ki.png";
  const heroSrc = typeof heroImage === "string" ? heroImage : (heroImage as any)?.src ?? (heroImage as any)?.default ?? "";
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <picture className="w-full h-full block">
          <source media="(min-width: 768px)" srcSet={heroSrc || cloudinaryUrl} />
          <img src={cloudinaryUrl} alt="Hero Background" className="w-full h-full" />
        </picture>
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <h1 className="text-5xl md:text-7xl tracking-wider mb-6">BETHEMA SKIN</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-white/90">
            Discover skincare that transforms. Premium formulas crafted for radiant, healthy skin.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open("https://shop.bethemaskin.com", "_blank")}
            className="px-12 py-4 bg-white text-black tracking-wider hover:bg-white/90 transition-colors"
          >
            EXPLORE COLLECTION
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-2"
        >
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
