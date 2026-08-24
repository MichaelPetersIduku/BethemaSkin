import { Instagram, Facebook, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-[#2b2724] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="tracking-wider">BETHEMA SKIN</div>
            <p className="text-white/70 text-sm">Premium skincare formulated with your skin's needs in mind.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm tracking-wide mb-4">QUICK LINKS</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="/#bestsellers" className="hover:text-white transition-colors">
                  Best Sellers
                </a>
              </li>
              <li>
                <a href="/#guided-four" className="hover:text-white transition-colors">
                  The Guided Four
                </a>
              </li>
              <li>
                <a href="/#real-results" className="hover:text-white transition-colors">
                  Real Results
                </a>
              </li>
              <li>
                <a href="/shop" className="hover:text-white transition-colors">
                  Shop All
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm tracking-wide mb-4">SUPPORT</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <a href="/#contact" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              {/* <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Returns
                  </a>
                </li> */}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm tracking-wide mb-4">FOLLOW US</h3>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/BethemaSkin/" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://web.facebook.com/BETHEMASKINCARE" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              {/* <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a> */}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-white/50">
          <p>&copy; 2025 Bethema Skin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
