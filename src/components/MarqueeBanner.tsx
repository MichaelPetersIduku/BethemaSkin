import { motion } from "motion/react";
import { Gift, Heart, HeartHandshake, Leaf, Sparkles, Tag } from "lucide-react";

const marqueeItems = [
  // { icon: Gift, text: "CHRISTMAS SALE: UP TO 20% OFF" },
  { icon: Sparkles, text: "New product: Pore Balance multifunctional serum)" },
  // { icon: Tag, text: "FREE BODY BUTTER ON ALL ORDERS" },
  { icon: Leaf, text: "We Care About Your SKIN" },
  // { icon: Sparkles, text: "EXCLUSIVE CHRISTMAS BUNDLES" },
  { icon: Heart, text: "Your Temple, Your Skin Is Worthy Of Care" },
  // { icon: Tag, text: "SAVE BIG THIS HOLIDAY SEASON" },
  { icon: HeartHandshake, text: "Skin Care For Everyone" },
];

export function MarqueeBanner() {
  return (
    <div className="bg-black text-white py-3 overflow-hidden relative">
      <div className="flex">
        {/* First set of items */}
        <motion.div
          animate={{
            x: [0, -1920],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex items-center space-x-12 flex-shrink-0"
        >
          {marqueeItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={`first-${index}`} className="flex items-center space-x-3 whitespace-nowrap">
                <IconComponent className="w-4 h-4" />
                <span className="text-sm tracking-widest">{item.text}</span>
                <span className="mx-6 text-white/30">•</span>
              </div>
            );
          })}
        </motion.div>

        {/* Second set of items (duplicate for seamless loop) */}
        <motion.div
          animate={{
            x: [0, -1920],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex items-center space-x-12 flex-shrink-0"
        >
          {marqueeItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={`second-${index}`} className="flex items-center space-x-3 whitespace-nowrap">
                <IconComponent className="w-4 h-4" />
                <span className="text-sm tracking-widest">{item.text}</span>
                <span className="mx-6 text-white/30">•</span>
              </div>
            );
          })}
        </motion.div>

        {/* Third set for extra seamlessness */}
        <motion.div
          animate={{
            x: [0, -1920],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex items-center space-x-12 flex-shrink-0"
        >
          {marqueeItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={`third-${index}`} className="flex items-center space-x-3 whitespace-nowrap">
                <IconComponent className="w-4 h-4" />
                <span className="text-sm tracking-widest">{item.text}</span>
                <span className="mx-6 text-white/30">•</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
