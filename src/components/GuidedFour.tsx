import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { products } from "../assets/products.json";
import { useCart } from "../contexts/CartContext";
import { toast } from "sonner";
import guidedFourBundle from "../assets/images/guided-four-bundle.jpg";

const BUNDLE_PRODUCT_IDS = ["soft-gel-cleanser", "hydro-boost", "pore-balance", "radiance-pro"];
const BUNDLE_PRICE = "65,000";

const STEPS = ["Cleanse", "Hydrate", "Treat", "Moisturise"];

export function GuidedFour() {
  const { addToCart } = useCart();

  const handleAddBundle = () => {
    const bundleProducts = BUNDLE_PRODUCT_IDS.map((id) => products.find((p) => p.id === id)).filter(Boolean) as (typeof products)[number][];
    bundleProducts.forEach((product) => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image }));
    toast.success("The Guided Four added to bag");
  };

  return (
    <section id="guided-four" className="py-12 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-4">
        <div>
          <p className="text-sm text-[#5b4f4d]">THE GUIDED FOUR</p>
          <h2 className="font-['Syne',_sans-serif] font-bold text-xl md:text-3xl text-[#2b2724] mt-1">Your way to good skin, guided. No BS. No confusion</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[352px] aspect-square rounded-lg overflow-hidden"
        >
          <img src={guidedFourBundle} alt="The Guided Four bundle: Soft Gel Cleanser, Hydro-Boost, Pore Balance, Radiance Pro" className="w-full h-full object-cover" />
        </motion.div>

        <div className="w-full flex flex-col items-center gap-4 py-4">
          <h3 className="font-['Syne',_sans-serif] font-bold text-xl text-[#2b2724]">Guided Four Step Routine</h3>
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1 flex-wrap justify-center">
              {STEPS.map((step, i) => (
                <span key={step} className="flex items-center gap-1 text-sm text-[#2b2724]">
                  {step}
                  {i < STEPS.length - 1 && <ArrowRight className="w-4 h-4" />}
                </span>
              ))}
            </div>
            <p className="text-sm text-[#2b2724]">Four steps. One personalized treatment.</p>
          </div>
          <p className="font-['Syne',_sans-serif] font-semibold text-xl text-[#2b2724]">₦{BUNDLE_PRICE}</p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center">
            <button
              onClick={handleAddBundle}
              className="w-full sm:w-auto px-8 bg-[#2b2724] text-white py-3 rounded-sm font-['Syne',_sans-serif] font-semibold"
            >
              Add to bag
            </button>
            <a href="/shop" className="text-sm underline underline-offset-2 text-[#2b2724]">
              View all products
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
