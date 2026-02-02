import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Link } from "react-router-dom";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <h2 className="text-2xl">Shopping Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-neutral-300 mb-4" />
              <p className="text-xl text-neutral-600 mb-2">Your cart is empty</p>
              <p className="text-neutral-500">Add some products to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b border-neutral-200">
                  <div className="w-20 h-20 bg-neutral-100 flex-shrink-0">
                    <ImageWithFallback src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="mb-1">{item.name}</h3>
                    <p className="text-neutral-600 mb-2">${item.price}</p>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center border border-neutral-300 hover:bg-neutral-100 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center border border-neutral-300 hover:bg-neutral-100 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <button onClick={() => removeFromCart(item.id)} className="text-neutral-500 hover:text-neutral-900 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-neutral-200 p-6 space-y-4">
            <div className="flex justify-between text-xl">
              <span>Subtotal</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>

            <Link to="/checkout" onClick={onClose} className="block w-full bg-neutral-900 text-white text-center py-4 hover:bg-neutral-800 transition-colors">
              Proceed to Checkout
            </Link>

            <button
              onClick={onClose}
              className="block w-full border border-neutral-300 text-neutral-900 text-center py-4 hover:bg-neutral-50 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
