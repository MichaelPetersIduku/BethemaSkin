import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, ShieldCheck } from 'lucide-react';

export function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const shippingCost = getCartTotal() > 75 ? 0 : 8.99;
  const tax = getCartTotal() * 0.08; // 8% tax
  const total = getCartTotal() + shippingCost + tax;

  const [formData, setFormData] = useState({
    // Contact Information
    email: '',
    
    // Shipping Information
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    
    // Payment Information
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setOrderComplete(true);
    clearCart();

    // Redirect to home after 3 seconds
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (cartItems.length === 0 && !orderComplete) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-4xl mb-4">Your cart is empty</h1>
        <p className="text-xl text-neutral-600 mb-8">Add some products to checkout</p>
        <button
          onClick={() => navigate('/shop')}
          className="bg-neutral-900 text-white px-8 py-4 hover:bg-neutral-800 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <ShieldCheck className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl mb-4">Order Complete!</h1>
          <p className="text-xl text-neutral-600 mb-2">
            Thank you for your purchase
          </p>
          <p className="text-neutral-600">
            A confirmation email has been sent to {formData.email}
          </p>
        </div>
        
        <div className="bg-neutral-50 p-6 rounded-lg mb-8">
          <p className="text-neutral-600 mb-2">Order Total</p>
          <p className="text-3xl">${total.toFixed(2)}</p>
        </div>
        
        <p className="text-neutral-600">Redirecting to homepage...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Checkout Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl mb-4">Contact Information</h2>
              <div>
                <label htmlFor="email" className="block text-neutral-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-900"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Shipping Information */}
            <div>
              <h2 className="text-2xl mb-4">Shipping Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-neutral-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-neutral-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-neutral-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label htmlFor="apartment" className="block text-neutral-700 mb-2">
                    Apartment, suite, etc. (optional)
                  </label>
                  <input
                    type="text"
                    id="apartment"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="city" className="block text-neutral-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-neutral-700 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block text-neutral-700 mb-2">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      required
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-neutral-700 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-900"
                  />
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div>
              <h2 className="text-2xl mb-4">Payment Information</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="cardNumber" className="block text-neutral-700 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    required
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div>
                  <label htmlFor="cardName" className="block text-neutral-700 mb-2">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    required
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate" className="block text-neutral-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      required
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-neutral-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      required
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      className="w-full px-4 py-3 border border-neutral-300 focus:outline-none focus:border-neutral-900"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-neutral-900 text-white py-4 hover:bg-neutral-800 transition-colors disabled:bg-neutral-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                'Processing...'
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  Complete Purchase
                </>
              )}
            </button>

            {/* Security Info */}
            <div className="flex items-center justify-center gap-4 text-sm text-neutral-600">
              <ShieldCheck className="w-4 h-4" />
              <span>Secure checkout powered by SSL encryption</span>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-neutral-50 p-6 sticky top-24">
            <h2 className="text-2xl mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 bg-white flex-shrink-0">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1">{item.name}</h3>
                    <p className="text-sm text-neutral-600">Qty: {item.quantity}</p>
                  </div>
                  <div>
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-neutral-200">
              <div className="flex justify-between">
                <span className="text-neutral-600">Subtotal</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Shipping</span>
                <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-neutral-200 text-xl">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {getCartTotal() < 75 && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200">
                <div className="flex items-start gap-2">
                  <Truck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-900">
                    Add ${(75 - getCartTotal()).toFixed(2)} more to get free shipping!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
