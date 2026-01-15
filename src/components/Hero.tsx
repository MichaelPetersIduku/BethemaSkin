import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

const desktopImages = [
  "https://res.cloudinary.com/dbezwd2bu/image/upload/v1768474686/IMG_7037_l3lz3i.png",
  "https://res.cloudinary.com/dbezwd2bu/image/upload/v1768474630/IMG_7039_kbbjul.png",
];

const mobileImages = [
  "https://res.cloudinary.com/dbezwd2bu/image/upload/v1768474630/IMG_7035_i4swhe.png",
  "https://res.cloudinary.com/dbezwd2bu/image/upload/v1768474635/IMG_7033_gmurz0.png",
];

const videoUrlDesktop = "https://res.cloudinary.com/dbezwd2bu/video/upload/v1768474640/IMG_7041_jnpyb1.mp4";
const videoUrlMobile = "https://res.cloudinary.com/dbezwd2bu/video/upload/v1768485878/IMG_7046_jilymi.mp4";
const videoUrl = window.innerWidth < 768 ? videoUrlMobile : videoUrlDesktop;

const heroContent = [
  {
    title: "HYDRATING DROPS",
    subtitle: "FROM DRY TO DEWY",
    subtitle2: "- INSTANTLY",
    buttonText: "SHOP NOW",
  },
  {
    title: '"SOFT" GEL CLEANSER',
    subtitle: "WHERE FRESH SKIN BEGINS",
    subtitle2: "",
    buttonText: "SHOP NOW",
  },
  {
    title: "RADIANCE",
    subtitle: "GLOW",
    subtitle2: "THAT SHOWS UP",
    buttonText: "SHOP NOW",
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let videoTimeout: NodeJS.Timeout;

    const startCarousel = () => {
      interval = setInterval(() => {
        const shouldShowVideo = Math.random() < 0.5;

        if (shouldShowVideo) {
          setShowVideo(true);
          clearInterval(interval); // Clear interval while video plays

          // Show video for 12 seconds before returning to carousel
          videoTimeout = setTimeout(() => {
            setShowVideo(false);
            setCurrentSlide((prev) => (prev + 1) % 2);
            startCarousel(); // Restart carousel after video
          }, 10000);
        } else {
          setShowVideo(false);
          setCurrentSlide((prev) => (prev + 1) % 2);
        }
      }, 7000);
    };

    startCarousel();

    return () => {
      clearInterval(interval);
      clearTimeout(videoTimeout);
    };
  }, []);

  const currentImages = isMobile ? mobileImages : desktopImages;
  // Use third content item (index 2) when showing video, otherwise use current slide
  const currentContent = showVideo ? heroContent[2] : heroContent[currentSlide];

  // Determine colors based on slide
  const isFirstSlide = currentSlide === 0;
  const textColor = isFirstSlide ? "text-black" : "text-green-600";
  // Mobile: first slide is white, second slide is green, video is white
  const textColorMobile = isMobile ? (showVideo ? "text-white" : currentSlide === 1 ? "text-green-600" : "text-white") : textColor;
  const buttonBgColor = isFirstSlide ? "bg-black hover:bg-black/90" : "bg-green-600 hover:bg-green-700";

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background - Either Video or Image */}
      <AnimatePresence mode="wait">
        {showVideo ? (
          <motion.div
            key="video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <video src={videoUrl} autoPlay muted loop playsInline className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
        ) : (
          <motion.div
            key={`slide-${currentSlide}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img src={currentImages[currentSlide]} alt="Hero Background" className="w-full h-full object-cover" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      <div
        className={`relative z-10 px-6 md:px-12 lg:px-20 w-full h-full flex ${
          showVideo
            ? isMobile
              ? "justify-end items-center"
              : "justify-start items-center"
            : isMobile
            ? currentSlide === 1
              ? "items-center pb-16"
              : "items-end pb-20"
            : "items-center"
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={showVideo ? "video-content" : `content-${currentSlide}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
            className={`max-w-xl text-left ${isMobile && showVideo ? "text-right" : ""} ${showVideo ? "text-white" : textColorMobile}`}
          >
            <p className="text-sm md:text-base tracking-wide mb-2 md:mb-3">{currentContent.title}</p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl tracking-tight mb-2 leading-tight">{currentContent.subtitle}</h1>
            {currentContent.subtitle2 && (
              <h2 className="text-3xl md:text-5xl lg:text-6xl tracking-tight mb-6 md:mb-8 leading-tight">{currentContent.subtitle2}</h2>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open("https://shop.bethemaskin.com", "_blank")}
              className={`px-8 md:px-10 py-3 md:py-3.5 text-sm tracking-widest transition-colors text-white uppercase ${
                showVideo ? "bg-orange-500 hover:bg-orange-600" : buttonBgColor
              }`}
            >
              {currentContent.buttonText}
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {[0, 1].map((index) => (
          <button
            key={index}
            onClick={() => {
              setShowVideo(false);
              setCurrentSlide(index);
            }}
            className={`w-2 h-2 rounded-full transition-all ${currentSlide === index && !showVideo ? "bg-white w-8" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
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
