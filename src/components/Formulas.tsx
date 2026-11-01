import { motion } from "motion/react";
import { Droplet, Shield, Sparkles, Heart, Sun, Leaf } from "lucide-react";

const formulas = [
  {
    id: 1,
    icon: Droplet,
    title: "Born from Real Skin Stories",
    description:
      "Bethema Skin was born from a real struggle with acne, so we know the frustration behind every breakout and the search for skincare that works without breaking the bank",
  },
  {
    id: 2,
    icon: Shield,
    title: "Science Meets Affordability",
    description: "Every product is crafted to target real concerns—like acne, hyperpigmentation, and sensitivity—while staying within reach",
  },
  {
    id: 3,
    icon: Sparkles,
    title: "Brightening & Even Tone",
    description: "Vitamin C and niacinamide work synergistically to reduce dark spots, even out skin tone, and reveal your natural luminosity.",
  },
  {
    id: 4,
    icon: Heart,
    title: "Joyful Care, Everyday Confidence",
    description: "At Bethema Skin, we believe skincare is more than products— it’s a ritual of joy, healing, and confidence.",
  },
  {
    id: 5,
    icon: Sun,
    title: "Real Skin. Real Results",
    description: "We keep it simple—no exaggerated claims, no unrealistic beauty ideals. Just effective skincare that delivers visible results you can trust.",
  },
  {
    id: 6,
    icon: Leaf,
    title: "Clean & Natural",
    description:
      "All products are formulated without harmful chemicals, parabens, or sulfates. We prioritize clean, effective ingredients that work in harmony with your skin.",
  },
];

export function Formulas() {
  return (
    <section id="formulas" className="py-24 px-4 sm:px-6 lg:px-8 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="font-['Syne',_sans-serif] font-bold text-4xl md:text-5xl tracking-wider mb-4">FORMULAS THAT PRIORITIZE YOUR SKIN NEEDS</h2>
            <p className="text-white/70 max-w-3xl mx-auto">
              Every Bethema Skin product is meticulously crafted with clinically-proven ingredients to address your unique skincare concerns and deliver visible
              results
            </p>
          </motion.div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {formulas.map((formula, index) => {
            const IconComponent = formula.icon;
            return (
              <motion.div
                key={formula.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="w-16 h-16 border-2 border-white/20 flex items-center justify-center group-hover:border-white/60 transition-colors duration-300">
                    <IconComponent className="w-8 h-8" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-['Syne',_sans-serif] font-semibold text-xl tracking-wide mb-3">{formula.title}</h3>
                <p className="text-white/70 leading-relaxed">{formula.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.6 }}>
            <p className="text-white/60 mb-6">All formulas are tested, cruelty-free, and made with the highest quality ingredients</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open("/shop", "_self")}
              className="px-10 py-3 border-2 border-white text-white tracking-wider hover:bg-white hover:text-black transition-all duration-300 font-['Syne',_sans-serif] font-semibold"
            >
              SHOP ALL FORMULAS
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
