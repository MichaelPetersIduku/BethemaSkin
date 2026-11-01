import { motion } from "motion/react";

const marqueeItems = [
  { id: 1, text: "Free shipping with order above ₦75,000" },
  { id: 2, text: "Need recommendations? Ask Bethema", action: "chat" as const },
  { id: 3, text: "A new Bethema is here!" },
];

function openBethemaChat() {
  window.dispatchEvent(new Event("open-bethema-chat"));
}

function MarqueeSet() {
  return (
    <motion.div
      animate={{ x: [0, -1920] }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      className="flex items-center space-x-12 flex-shrink-0"
    >
      {marqueeItems.map((item) =>
        item.action === "chat" ? (
          <button
            key={item.id}
            onClick={openBethemaChat}
            className="text-sm tracking-wide whitespace-nowrap hover:underline underline-offset-2"
          >
            {item.text}
          </button>
        ) : (
          <span key={item.id} className="text-sm tracking-wide whitespace-nowrap">
            {item.text}
          </span>
        )
      )}
    </motion.div>
  );
}

export function MarqueeBanner() {
  return (
    <div className="bg-[#2b2724] text-white py-3 overflow-hidden relative">
      <div className="flex gap-12">
        <MarqueeSet />
        <MarqueeSet />
        <MarqueeSet />
      </div>
    </div>
  );
}
