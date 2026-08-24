import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import heroWomen from "../assets/images/hero-women.jpg";
import recommendationBadge from "../assets/images/recommendation-badge.svg";

function openBethemaChat() {
  window.dispatchEvent(new Event("open-bethema-chat"));
}

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative h-screen min-h-[600px] flex items-end md:items-center overflow-hidden">
      {/* Background */}
      <img src={heroWomen} alt="Two women with radiant, healthy skin" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/10" />

      {/* Content */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 pb-24 md:pb-0 flex flex-col items-center md:items-start gap-2">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-sm tracking-wide text-white text-center md:text-left"
        >
          WELCOME TO THE NEW BETHEMA
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col items-center md:items-start gap-6"
        >
          <h1 className="font-['Syne',_sans-serif] font-bold text-[#fbf8f3] text-4xl md:text-6xl lg:text-7xl text-center md:text-left leading-tight">
            Better skin for
            <br />
            everyone
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/shop")}
            className="bg-[#2b2724] text-white px-6 py-3 rounded font-['Syne',_sans-serif] font-semibold text-lg"
          >
            SHOP NOW
          </motion.button>
        </motion.div>
      </div>

      {/* Recommendation Badge */}
      <button
        onClick={openBethemaChat}
        className="absolute bottom-24 md:bottom-10 right-4 md:right-10 z-10 w-[121px] h-[102px]"
        aria-label="Need recommendations? Tap here to ask Bethema"
      >
        <img src={recommendationBadge} alt="" className="absolute inset-0 w-full h-full" />
        <span className="relative z-10 flex h-full items-center justify-center text-center font-['Syne',_sans-serif] font-medium text-sm text-[#2b2724] px-4 leading-tight">
          Need recomme­dations? Tap here!
        </span>
      </button>
    </section>
  );
}
