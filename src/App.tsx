// import { useState } from "react";
// import { Menu, X, ShoppingBag, Instagram, Facebook, Twitter } from "lucide-react";
// import { motion, AnimatePresence } from "motion/react";
// import { Hero } from "./components/Hero";
// import { BestSellers } from "./components/BestSellers";
// import { Formulas } from "./components/Formulas";
// import { Categories } from "./components/Categories";
// import { Reviews } from "./components/Reviews";
// import { InstagramFeed } from "./components/InstagramFeed";
// import { Contact } from "./components/Contact";
// import { MarqueeBanner } from "./components/MarqueeBanner";
// import { Toaster } from "sonner";

// export default function App() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-white">
//       <Toaster position="top-right" richColors />
//       {/* Marquee Banner */}
//       <div className="fixed top-0 left-0 right-0 z-50">
//         <MarqueeBanner />
//       </div>
//       {/* Navigation */}
//       <nav className="fixed top-11 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-black/5">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-20">
//             {/* Logo */}
//             <div className="flex-shrink-0">
//               <a href="#" className="tracking-wider">
//                 BETHEMA SKIN
//               </a>
//             </div>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center space-x-8">
//               <a href="#bestsellers" className="text-sm tracking-wide hover:text-black/60 transition-colors">
//                 BEST SELLERS
//               </a>
//               <a href="#formulas" className="text-sm tracking-wide hover:text-black/60 transition-colors">
//                 FORMULAS
//               </a>
//               <a href="#categories" className="text-sm tracking-wide hover:text-black/60 transition-colors">
//                 CATEGORIES
//               </a>
//               <a href="#reviews" className="text-sm tracking-wide hover:text-black/60 transition-colors">
//                 REVIEWS
//               </a>
//               <a href="#contact" className="text-sm tracking-wide hover:text-black/60 transition-colors">
//                 CONTACT
//               </a>
//             </div>

//             {/* Icons */}
//             <div className="hidden md:flex items-center space-x-4">
//               <button onClick={() => window.open("https://shop.bethemaskin.com", "_blank")} className="p-2 hover:bg-black/5 rounded-full transition-colors">
//                 <ShoppingBag className="w-5 h-5" />
//               </button>
//             </div>

//             {/* Mobile Menu Button */}
//             <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
//               {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <AnimatePresence>
//           {mobileMenuOpen && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               className="md:hidden border-t border-black/5"
//             >
//               <div className="px-4 py-6 space-y-4">
//                 <a href="#bestsellers" className="block text-sm tracking-wide hover:text-black/60 transition-colors" onClick={() => setMobileMenuOpen(false)}>
//                   BEST SELLERS
//                 </a>
//                 <a href="#formulas" className="block text-sm tracking-wide hover:text-black/60 transition-colors" onClick={() => setMobileMenuOpen(false)}>
//                   FORMULAS
//                 </a>
//                 <a href="#categories" className="block text-sm tracking-wide hover:text-black/60 transition-colors" onClick={() => setMobileMenuOpen(false)}>
//                   CATEGORIES
//                 </a>
//                 <a href="#reviews" className="block text-sm tracking-wide hover:text-black/60 transition-colors" onClick={() => setMobileMenuOpen(false)}>
//                   REVIEWS
//                 </a>
//                 <a href="#contact" className="block text-sm tracking-wide hover:text-black/60 transition-colors" onClick={() => setMobileMenuOpen(false)}>
//                   CONTACT
//                 </a>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </nav>

//       {/* Main Content */}
//       <main className="pt-20">
//         <Hero />
//         <BestSellers />
//         <Formulas />
//         <Categories />
//         <Reviews />
//         <InstagramFeed />
//         <Contact />
//       </main>

//       {/* Footer */}
//       <footer className="bg-black text-white py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
//             {/* Brand */}
//             <div className="space-y-4">
//               <div className="tracking-wider">BETHEMA SKIN</div>
//               <p className="text-white/70 text-sm">Premium skincare formulated with your skin's needs in mind.</p>
//             </div>

//             {/* Quick Links */}
//             <div>
//               <h3 className="text-sm tracking-wide mb-4">QUICK LINKS</h3>
//               <ul className="space-y-2 text-sm text-white/70">
//                 <li>
//                   <a href="#bestsellers" className="hover:text-white transition-colors">
//                     Best Sellers
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#formulas" className="hover:text-white transition-colors">
//                     Our Formulas
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#categories" className="hover:text-white transition-colors">
//                     Categories
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             {/* Support */}
//             <div>
//               <h3 className="text-sm tracking-wide mb-4">SUPPORT</h3>
//               <ul className="space-y-2 text-sm text-white/70">
//                 <li>
//                   <a href="#contact" className="hover:text-white transition-colors">
//                     Contact Us
//                   </a>
//                 </li>
//                 {/* <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     Shipping Info
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     Returns
//                   </a>
//                 </li> */}
//               </ul>
//             </div>

//             {/* Social */}
//             <div>
//               <h3 className="text-sm tracking-wide mb-4">FOLLOW US</h3>
//               <div className="flex space-x-4">
//                 <a href="https://www.instagram.com/BethemaSkin/" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
//                   <Instagram className="w-5 h-5" />
//                 </a>
//                 <a href="https://web.facebook.com/BETHEMASKINCARE" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
//                   <Facebook className="w-5 h-5" />
//                 </a>
//                 {/* <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
//                   <Twitter className="w-5 h-5" />
//                 </a> */}
//               </div>
//             </div>
//           </div>

//           <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-white/50">
//             <p>&copy; 2025 Bethema Skin. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

import { RouterProvider } from "react-router";
import { CartProvider } from "./contexts/CartContext";
import { router } from "./routes";
import { Toaster } from "sonner";

export default function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </CartProvider>
  );
}
