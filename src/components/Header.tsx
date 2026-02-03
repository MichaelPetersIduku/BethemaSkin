import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingBag, Menu, X, ShoppingCart, ShoppingCartIcon } from "lucide-react";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { CartDrawer } from "./CartDrawer";
import { motion, AnimatePresence } from "motion/react";

export function Header({ showNavigation = true }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const location = useLocation();
  const { getCartCount } = useCart();

  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/#" className="tracking-wider">
                BETHEMA SKIN
              </a>
            </div>

            {/* Desktop Navigation */}
            {showNavigation && (
              <div className="hidden md:flex items-center space-x-8">
                <a href="/#bestsellers" className="text-sm tracking-wide hover:text-black/60 transition-colors">
                  BEST SELLERS
                </a>
                <a href="/#formulas" className="text-sm tracking-wide hover:text-black/60 transition-colors">
                  FORMULAS
                </a>
                <a href="/#categories" className="text-sm tracking-wide hover:text-black/60 transition-colors">
                  CATEGORIES
                </a>
                <a href="/#reviews" className="text-sm tracking-wide hover:text-black/60 transition-colors">
                  REVIEWS
                </a>
                <a href="/#contact" className="text-sm tracking-wide hover:text-black/60 transition-colors">
                  CONTACT
                </a>
              </div>
            )}

            {/* Icons */}
            <div className="hidden md:flex items-center space-x-4">
              <button onClick={() => navigate("/cart")} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                <ShoppingCartIcon className="w-5 h-5" />
                {getCartCount() > 0 && (
                  <span
                    style={{ top: "-25px", left: "25px" }}
                    className="relative top-0 right-0 w-4 h-4 bg-neutral-900 text-white rounded-full text-xs flex items-center justify-center"
                  >
                    {getCartCount()}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <>
                  <div className="flex md:hidden md:flex items-center space-x-4">
                    <button onClick={() => navigate("/cart")} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                      <ShoppingCartIcon className="w-5 h-5" />
                      {getCartCount() > 0 && (
                        <span
                          style={{ top: "-25px", left: "25px" }}
                          className="relative top-0 right-0 w-4 h-4 bg-neutral-900 text-white rounded-full text-xs flex items-center justify-center"
                        >
                          {getCartCount()}
                        </span>
                      )}
                    </button>
                    <Menu className="w-6 h-6" />
                  </div>
                </>
              )}
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
                <a href="/#bestsellers" className="block text-sm tracking-wide hover:text-black/60 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  BEST SELLERS
                </a>
                <a href="/#formulas" className="block text-sm tracking-wide hover:text-black/60 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  FORMULAS
                </a>
                <a href="/#categories" className="block text-sm tracking-wide hover:text-black/60 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  CATEGORIES
                </a>
                <a href="/#reviews" className="block text-sm tracking-wide hover:text-black/60 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  REVIEWS
                </a>
                <a href="/#contact" className="block text-sm tracking-wide hover:text-black/60 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  CONTACT
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
