import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { CartDrawer } from './CartDrawer';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const location = useLocation();
  const { getCartCount } = useCart();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-2xl tracking-tight text-neutral-900">BETHEMA SKIN</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className={`transition-colors ${
                  isActive('/') ? 'text-neutral-900' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className={`transition-colors ${
                  isActive('/shop') ? 'text-neutral-900' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Shop
              </Link>
              <a href="#about" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                About
              </a>
              <a href="#contact" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                Contact
              </a>
            </nav>

            {/* Cart Icon */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 hover:bg-neutral-100 rounded-full transition-colors"
              >
                <ShoppingBag className="w-5 h-5" />
                {getCartCount() > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-neutral-900 text-white rounded-full text-xs flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-neutral-200">
              <nav className="flex flex-col space-y-4">
                <Link
                  to="/"
                  className={`transition-colors ${
                    isActive('/') ? 'text-neutral-900' : 'text-neutral-600'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/shop"
                  className={`transition-colors ${
                    isActive('/shop') ? 'text-neutral-900' : 'text-neutral-600'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Shop
                </Link>
                <a
                  href="#about"
                  className="text-neutral-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </a>
                <a
                  href="#contact"
                  className="text-neutral-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCartOpen(true);
                  }}
                  className="text-left text-neutral-600 flex items-center gap-2"
                >
                  Cart ({getCartCount()})
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}