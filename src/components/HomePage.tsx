import { useState } from "react";
import { Menu, X, ShoppingBag, Instagram, Facebook, Twitter } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Hero } from "../components/Hero";
import { BestSellers } from "../components/BestSellers";
import { Formulas } from "../components/Formulas";
import { Categories } from "../components/Categories";
import { Reviews } from "../components/Reviews";
import { InstagramFeed } from "../components/InstagramFeed";
import { Contact } from "../components/Contact";
import { MarqueeBanner } from "../components/MarqueeBanner";
import { Toaster } from "sonner";
import { Header } from "./Header";
import { TesterCommunity } from "./TesterCommunity";

export function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" richColors />
      {/* Marquee Banner */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <MarqueeBanner />
      </div>
      {/* Navigation */}
      <nav className="fixed top-11 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="#" className="tracking-wider">
                BETHEMA SKIN
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#bestsellers" className="text-sm tracking-wide hover:text-black/60 transition-colors">
                BEST SELLERS
              </a>
              <a href="#formulas" className="text-sm tracking-wide hover:text-black/60 transition-colors">
                FORMULAS
              </a>
              <a href="#categories" className="text-sm tracking-wide hover:text-black/60 transition-colors">
                CATEGORIES
              </a>
              <a href="#contact" className="text-sm tracking-wide hover:text-black/60 transition-colors">
                CONTACT
              </a>
              <a href="/shop" className="text-sm tracking-wide hover:text-black/60 transition-colors">
                SHOP NOW
              </a>
            </div>

            {/* Icons */}
            <div className="hidden md:flex items-center space-x-4">
              <button onClick={() => window.open("/shop", "_blank")} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                <ShoppingBag className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-black/5"
            >
              <div className="px-4 py-6 space-y-4">
                <a href="#bestsellers" className="block text-sm tracking-wide hover:text-black/60 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  BEST SELLERS
                </a>
                <a href="#formulas" className="block text-sm tracking-wide hover:text-black/60 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  FORMULAS
                </a>
                <a href="#categories" className="block text-sm tracking-wide hover:text-black/60 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  CATEGORIES
                </a>
                <a href="#contact" className="block text-sm tracking-wide hover:text-black/60 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  CONTACT
                </a>
                <a href="/shop" className="block text-sm tracking-wide hover:text-black/60 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  SHOP NOW
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        <Hero />
        <BestSellers />
        <Formulas />
        <Categories />
        <Reviews />
        <TesterCommunity />
        <InstagramFeed />
        <Contact />
      </main>
    </div>
  );
}
