import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const reviews = [
  {
    id: 4,
    name: "Dara",
    location: "Lagos, Nigeria",
    rating: 5,
    text: "Actually someone from TikTok recommended this brand and I decided to trust you guys with my skin am so thankful😭I think it’s just 2 months since I started using it",
    product: "Blemish rescue and Radiance",
    image: "https://res.cloudinary.com/dbezwd2bu/image/upload/v1771502950/WhatsApp_Image_2026-02-19_at_12.43.37_pmqmkb.jpg",
  },
  {
    id: 1,
    name: "Jessica Lawrence",
    location: "Lagos, Nigeria",
    rating: 5,
    text: "I've struggled with embarrassing skin discoloration for years, but Bethema skincare has been a game-changer. My skin is now healthier and radiates a beautiful shine. I finally feel confident in photos. Highly recommend this product!",
    product: "Radiance",
    image: "https://res.cloudinary.com/dbezwd2bu/image/upload/v1765283047/jessica_nqvqas.jpg",
  },
  {
    id: 2,
    name: "Ifeoma",
    location: "Lagos, Nigeria",
    rating: 5,
    text: "Your products are really good. Like if my serum is out like this, I will not just be okay, I will look for a way to replace it immediately. Because your products are so soothing to the skin and so mild and gentle. I love it.",
    product: "Glow C Serum",
    image: "https://res.cloudinary.com/dbezwd2bu/image/upload/v1765283047/ifeoma_tdcb0p.jpg",
  },
  {
    id: 3,
    name: "Omoye",
    location: "Ibadan, Nigeria",
    rating: 5,
    text: "I've struggled with sunburn and redness for a while, but after just a few weeks, I can already see improvements!",
    product: "Soft Gel Cleanser",
    image: "https://res.cloudinary.com/dbezwd2bu/image/upload/v1765283047/omoye_o6sscl.jpg",
  },
];

export function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Automatic slide change every 8 seconds
  useEffect(() => {
    const interval = setInterval(nextReview, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="reviews" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl md:text-5xl tracking-wider mb-4">LOVED BY THOUSANDS</h2>
            <p className="text-black/60 max-w-2xl mx-auto">See what our customers are saying about their Bethema Skin experience</p>
          </motion.div>
        </div>

        {/* Reviews Carousel */}
        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              {/* Image */}
              <div className="relative">
                <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                  <ImageWithFallback src={reviews[currentIndex].image} alt={reviews[currentIndex].name} className="w-full h-full object-cover" />
                </div>
                {/* Quote Icon */}
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-black flex items-center justify-center">
                  <Quote className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Review Content */}
              <div className="space-y-6">
                {/* Stars */}
                <div className="flex space-x-1">
                  {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-black text-black" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-xl leading-relaxed">"{reviews[currentIndex].text}"</p>

                {/* Product */}
                <p className="text-black/60">
                  Product: <span className="text-black">{reviews[currentIndex].product}</span>
                </p>

                {/* Author */}
                <div>
                  <p className="tracking-wide">{reviews[currentIndex].name}</p>
                  <p className="text-sm text-black/60">{reviews[currentIndex].location}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center space-x-4 mt-12">
            <button
              onClick={prevReview}
              className="w-12 h-12 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="flex space-x-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? "bg-black w-8" : "bg-black/30"}`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextReview}
              className="w-12 h-12 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              aria-label="Next review"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-16 pt-16 border-t border-black/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center"
          >
            <p className="text-4xl mb-2">10K+</p>
            <p className="text-sm text-black/60 tracking-wide">HAPPY CUSTOMERS</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center"
          >
            <p className="text-4xl mb-2">4.9</p>
            <p className="text-sm text-black/60 tracking-wide">AVERAGE RATING</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <p className="text-4xl mb-2">98%</p>
            <p className="text-sm text-black/60 tracking-wide">WOULD RECOMMEND</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
