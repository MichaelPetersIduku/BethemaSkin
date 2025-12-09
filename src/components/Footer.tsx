import { Instagram, Facebook, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="text-xl tracking-tight text-neutral-900 mb-4">BETHEMA SKIN</h3>
            <p className="text-neutral-600">
              Premium skincare for radiant, healthy skin.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-neutral-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <a href="#about" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-neutral-900 mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-neutral-900 mb-4">Stay Connected</h4>
            <p className="text-neutral-600 mb-4">
              Subscribe to our newsletter for tips and exclusive offers.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-neutral-600 hover:text-neutral-900 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-neutral-600 hover:text-neutral-900 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-neutral-600 hover:text-neutral-900 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-200 text-center text-neutral-600">
          <p>&copy; {new Date().getFullYear()} Bethema Skin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
