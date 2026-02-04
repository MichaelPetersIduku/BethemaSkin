import { useNavigate, Link } from "react-router";
import { useCart } from "../contexts/CartContext";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { convertStringAmountToNumber } from "../utils/utility";
import { useIsMobile } from "./ui/use-mobile";

export function CartPage() {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const isMobile = useIsMobile();

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate("/checkout");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="border-b border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link to="/shop" className="flex items-center gap-2 text-sm hover:text-neutral-600 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Link>
              <h1 className="text-2xl font-light">Bethema Skin</h1>
              <div className="w-24" />
            </div>
          </div>
        </header>

        {/* Empty Cart */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-32 h-32 bg-neutral-100 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-16 h-16 text-neutral-400" />
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl">Your cart is empty</h2>
              <p className="text-neutral-600">Add some products to get started</p>
            </div>
            <div className="flex gap-4 justify-center">
              <Link to="/shop" className="bg-black text-white px-8 py-4 hover:bg-neutral-800 transition-colors">
                Browse Products
              </Link>
              <Link to="/" className="border-2 border-neutral-300 px-8 py-4 hover:bg-neutral-50 transition-colors">
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-neutral-200 sticky top-0 bg-white z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/shop" className="flex items-center gap-2 text-sm hover:text-neutral-600 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
            <h1 className="text-2xl font-light">Bethema Skin</h1>
            {!isMobile && <div className="w-32" />}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-4xl mb-2">Shopping Cart</h2>
          <p className="text-neutral-600">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-neutral-200 p-6 flex gap-6"
              >
                {/* Product Image */}
                <img src={item.image} alt={item.name} className="w-32 h-32 object-cover" />

                {/* Product Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className={`flex-1 flex flex-row justify-between ${isMobile ? "flex-col" : ""}`}>
                    <div>
                      <h3 className="text-xl font-medium mb-2">{item.name}</h3>
                      <p className="text-neutral-600 mb-4">₦{convertStringAmountToNumber(item.price).toLocaleString()}</p>
                    </div>
                    <p className="font-medium text-xl">₦{(convertStringAmountToNumber(item.price) * item.quantity).toLocaleString()}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 border border-neutral-300 flex items-center justify-center hover:bg-neutral-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button onClick={() => removeFromCart(item.id)} className="text-red-600 hover:text-red-700 transition-colors flex items-center gap-2">
                      <Trash2 className="w-4 h-4" />
                      {!isMobile && <span className="text-sm">Remove</span>}
                    </button>
                  </div>
                </div>

                {/* Item Total */}
                {/* <div className="text-right">
                  <p className="font-medium text-xl">₦{(convertStringAmountToNumber(item.price) * item.quantity).toLocaleString()}</p>
                </div> */}
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-neutral-50 p-6 space-y-6">
                <h3 className="text-2xl font-medium">Order Summary</h3>

                <div className="space-y-3">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal</span>
                    <span>₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Shipping</span>
                    <span>N/A</span>
                  </div>
                  {/* {subtotal < 100 && <p className="text-xs text-neutral-500">Add ${(100 - subtotal).toFixed(2)} more for free shipping</p>} */}
                  <div className="pt-3 border-t-2 border-neutral-300">
                    <div className="flex justify-between items-baseline">
                      <span className="text-lg font-medium">Total</span>
                      <span className="text-3xl font-medium">₦{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button onClick={handleCheckout} className="w-full bg-black text-white py-4 hover:bg-neutral-800 transition-colors text-lg">
                  Proceed to Checkout
                </button>

                <div className="space-y-2 text-sm text-neutral-600">
                  <div className="flex items-start gap-2">
                    <span>•</span>
                    <span>Secure checkout with bank transfer</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span>•</span>
                    <span>Low shipping fees</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
