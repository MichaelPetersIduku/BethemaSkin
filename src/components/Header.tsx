import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { CartDrawer } from "./CartDrawer";
import { motion, AnimatePresence } from "motion/react";
import logoBethema from "../assets/images/logo-bethema.svg";

const NAV_LINKS = [
  { label: "SHOP", href: "/shop" },
  { label: "BEST SELLERS", href: "/#bestsellers" },
  { label: "GUIDED FOUR", href: "/#guided-four" },
  { label: "REAL RESULTS", href: "/#real-results" },
  { label: "CONTACT", href: "/#contact" },
];

export function Header({ showNavigation = true, offsetForMarquee = false }: { showNavigation?: boolean; offsetForMarquee?: boolean }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { getCartCount } = useCart();

  const navigate = useNavigate();

  return (
    <>
      <nav className={`fixed ${offsetForMarquee ? "top-11" : "top-0"} left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-black/5`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-[#2b2724]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="block">
                <img src={logoBethema} alt="Bethema" className="h-5 w-auto" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            {showNavigation && (
              <div className="hidden md:flex items-center space-x-8">
                {NAV_LINKS.map((link) => (
                  <a key={link.label} href={link.href} className="text-sm tracking-wide text-[#2b2724] hover:text-[#2b2724]/60 transition-colors">
                    {link.label}
                  </a>
                ))}
              </div>
            )}

            {/* Icons */}
            <div className="flex items-center space-x-1 sm:space-x-4">
              <button onClick={() => navigate("/shop")} className="p-2 hover:bg-black/5 rounded-full transition-colors text-[#2b2724]" aria-label="Search">
                <Search className="w-5 h-5" />
              </button>
              <button onClick={() => navigate("/cart")} className="relative p-2 hover:bg-black/5 rounded-full transition-colors text-[#2b2724]" aria-label="Cart">
                <ShoppingBag className="w-5 h-5" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#2b2724] text-white rounded-full text-xs flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </button>
            </div>
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
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block text-sm tracking-wide text-[#2b2724] hover:text-[#2b2724]/60 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
