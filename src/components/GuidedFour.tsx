import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { products } from "../assets/products.json";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const STEPS = ["Cleanse", "Hydrate", "Treat", "Moisturise"];

const guidedFour = products.find((p) => p.id === "the-guided-four")!;

export function GuidedFour() {
  return (
    <section id="guided-four" className="py-12 md:py-24 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-5 text-center mb-8 md:mb-12">
          <p className="text-xs tracking-widest text-[#5b4f4d] uppercase">The Guided Four</p>
          <h2 className="text-[#2b2724] text-2xl md:text-3xl font-bold leading-snug" style={{ fontFamily: "Syne, sans-serif" }}>
            Your way to good skin, guided. No confusion.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 w-full max-w-[352px] md:max-w-none mx-auto aspect-square rounded-lg overflow-hidden"
          >
            <ImageWithFallback src={guidedFour.image} alt={guidedFour.name} className="w-full h-full object-cover" />
          </motion.div>

          <div className="order-2 flex flex-col items-start text-start gap-4">
            <div className="flex items-start gap-1 flex-wrap justify-start">
              {STEPS.map((step, index) => (
                <span key={step} className="flex font-bold items-start gap-1 text-sm text-[#2b2724]">
                  {index > 0 && <ArrowRight className="w-4 h-4" />}
                  {step}
                </span>
              ))}
            </div>
            <p className="text-sm text-[#2b2724] -mt-2">Four steps. One personalized treatment.</p>
            <p
              className="text-sm text-[#5b4f4d] max-w-md width-100 text-center text-underline cursor-pointer"
              onClick={() => window.open(guidedFour.url, "_blank")}
            >
              View all products
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
