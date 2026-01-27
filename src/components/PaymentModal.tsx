import { useState } from "react";
import { X, CheckCircle, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import statesData from "../assets/statesJson.json";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  productName: string;
  quantity: number;
}

interface ShippingDetails {
  fullName: string;
  address: string;
  city: string;
  state: string;
  phoneNumber: string;
  email: string;
}

export function PaymentModal({ isOpen, onClose, totalAmount, productName, quantity }: PaymentModalProps) {
  const [currentStep, setCurrentStep] = useState<"shipping" | "payment" | "confirmation">("shipping");
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    fullName: "",
    address: "",
    city: "",
    state: "",
    phoneNumber: "",
    email: "",
  });
  const [errors, setErrors] = useState<Partial<ShippingDetails>>({});

  const validateShippingDetails = () => {
    const newErrors: Partial<ShippingDetails> = {};

    if (!shippingDetails.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!shippingDetails.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!shippingDetails.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!shippingDetails.state.trim()) {
      newErrors.state = "State is required";
    }
    if (!shippingDetails.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    }
    if (!shippingDetails.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shippingDetails.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinueToPayment = () => {
    if (validateShippingDetails()) {
      setCurrentStep("payment");
    }
  };

  const handleTransferred = () => {
    setCurrentStep("confirmation");
  };

  const handleClose = () => {
    setCurrentStep("shipping");
    setShippingDetails({
      fullName: "",
      address: "",
      city: "",
      state: "",
      phoneNumber: "",
      email: "",
    });
    setErrors({});
    onClose();
  };

  const handleInputChange = (field: keyof ShippingDetails, value: string) => {
    setShippingDetails((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white z-50 max-h-[90vh] overflow-y-auto"
          >
            {currentStep === "shipping" ? (
              <>
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
                  <h2 className="text-2xl">Shipping Details</h2>
                  <button onClick={handleClose} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Shipping Form */}
                <div className="p-6 space-y-6">
                  {/* Order Summary */}
                  <div className="bg-neutral-50 p-4 space-y-2">
                    <h3 className="font-medium mb-3">Order Summary</h3>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">{productName}</span>
                      <span>{quantity}x</span>
                    </div>
                    <div className="flex justify-between text-lg pt-2 border-t border-neutral-200">
                      <span>Total Amount</span>
                      <span className="font-medium">₦{totalAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Shipping Form Fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={shippingDetails.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        className={`w-full px-4 py-2 border ${
                          errors.fullName ? "border-red-500" : "border-neutral-300"
                        } focus:outline-none focus:border-neutral-900`}
                        placeholder="Enter your full name"
                      />
                      {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={shippingDetails.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        className={`w-full px-4 py-2 border ${
                          errors.address ? "border-red-500" : "border-neutral-300"
                        } focus:outline-none focus:border-neutral-900`}
                        placeholder="Enter your address"
                      />
                      {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          City <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={shippingDetails.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          className={`w-full px-4 py-2 border ${
                            errors.city ? "border-red-500" : "border-neutral-300"
                          } focus:outline-none focus:border-neutral-900`}
                          placeholder="City"
                        />
                        {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-neutral-700 mb-1">
                          State <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={shippingDetails.state}
                          onChange={(e) => handleInputChange("state", e.target.value)}
                          className={`w-full px-4 py-2 border ${
                            errors.state ? "border-red-500" : "border-neutral-300"
                          } focus:outline-none focus:border-neutral-900`}
                        >
                          <option value="">Select a state</option>
                          {statesData.states.map((state) => (
                            <option key={state.name} value={state.name}>
                              {state.name}
                            </option>
                          ))}
                        </select>
                        {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={shippingDetails.phoneNumber}
                        onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                        className={`w-full px-4 py-2 border ${
                          errors.phoneNumber ? "border-red-500" : "border-neutral-300"
                        } focus:outline-none focus:border-neutral-900`}
                        placeholder="+234 xxx xxx xxxx"
                      />
                      {errors.phoneNumber && <p className="text-xs text-red-500 mt-1">{errors.phoneNumber}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={shippingDetails.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`w-full px-4 py-2 border ${
                          errors.email ? "border-red-500" : "border-neutral-300"
                        } focus:outline-none focus:border-neutral-900`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Continue Button */}
                  <button onClick={handleContinueToPayment} className="w-full bg-black text-white py-4 hover:bg-neutral-800 transition-colors">
                    Continue to Payment
                  </button>
                </div>
              </>
            ) : currentStep === "payment" ? (
              <>
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
                  <h2 className="text-2xl">Complete Your Order</h2>
                  <button onClick={handleClose} className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Order Summary */}
                  <div className="bg-neutral-50 p-4 space-y-2">
                    <h3 className="font-medium mb-3">Order Summary</h3>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">{productName}</span>
                      <span>{quantity}x</span>
                    </div>
                    <div className="flex justify-between text-lg pt-2 border-t border-neutral-200">
                      <span>Total Amount</span>
                      <span className="font-medium">₦{totalAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Shipping Details Summary */}
                  <div className="bg-blue-50 p-4 space-y-2">
                    <h3 className="font-medium mb-2">Shipping To:</h3>
                    <p className="text-sm">{shippingDetails.fullName}</p>
                    <p className="text-sm">{shippingDetails.address}</p>
                    <p className="text-sm">
                      {shippingDetails.city}, {shippingDetails.state}
                    </p>
                    <p className="text-sm">{shippingDetails.phoneNumber}</p>
                    <p className="text-sm">{shippingDetails.email}</p>
                    <button onClick={() => setCurrentStep("shipping")} className="text-xs text-blue-600 hover:underline">
                      Edit shipping details
                    </button>
                  </div>

                  {/* Bank Transfer Details */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Bank Transfer Details</h3>
                    <div className="bg-neutral-50 p-4 space-y-3">
                      <div>
                        <p className="text-sm text-neutral-600 mb-1">Bank Name</p>
                        <p className="font-medium">Paystack-Titan</p>
                      </div>
                      <div>
                        <p className="text-sm text-neutral-600 mb-1">Account Name</p>
                        <p className="font-medium">BUMPA/Bethema Skin</p>
                      </div>
                      <div>
                        <p className="text-sm text-neutral-600 mb-1">Account Number</p>
                        <p className="text-xl font-mono">9839278041</p>
                      </div>
                      <div>
                        <p className="text-sm text-neutral-600 mb-1">Amount to Transfer</p>
                        <p className="text-2xl font-medium text-green-600">₦{totalAmount.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="space-y-2 text-sm text-neutral-600">
                    <p>Please transfer the exact amount to the account above and click "I have transferred" below.</p>
                    <p>Your order will be processed once payment is confirmed.</p>
                  </div>

                  {/* Action Button */}
                  <button onClick={handleTransferred} className="w-full bg-black text-white py-4 hover:bg-neutral-800 transition-colors">
                    I Have Transferred
                  </button>

                  {/* Alternative Options */}
                  <div className="space-y-3 pt-4 border-t border-neutral-200">
                    <p className="text-sm text-neutral-600">For immediate confirmation:</p>

                    <a
                      href="https://wa.me/2348039801519"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex justify-center items-center gap-3 p-3 border border-green-600 text-green-600 hover:bg-green-50 transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <div className="text-center">
                        <p className="font-medium">WhatsApp Us</p>
                        <p className="text-xs">+234 803 980 1519</p>
                      </div>
                    </a>

                    <a
                      href="https://shop.bethemaskin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-center p-3 border border-neutral-300 hover:bg-neutral-50 transition-colors text-sm"
                    >
                      Shop More Products →
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Confirmation Screen */}
                <div className="p-8 text-center space-y-6">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.5 }}>
                    <CheckCircle className="w-20 h-20 text-green-600 mx-auto" />
                  </motion.div>

                  <div className="space-y-3">
                    <h2 className="text-3xl">Thank You!</h2>
                    <p className="text-neutral-600">We have received your order notification.</p>
                    <p className="text-neutral-600">A confirmation receipt will be sent to you once your payment is confirmed.</p>
                  </div>

                  <div className="bg-blue-50 p-4 space-y-2 text-sm">
                    <p className="font-medium">Need immediate confirmation?</p>
                    <p className="text-neutral-600">
                      Contact us on WhatsApp at <span className="font-medium">+234 803 980 1519</span> and share your payment receipt.
                    </p>
                  </div>

                  <div className="space-y-3 pt-4">
                    <a
                      href="https://wa.me/2348039801519"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-green-600 text-white py-3 hover:bg-green-700 transition-colors"
                    >
                      Contact on WhatsApp
                    </a>

                    <a
                      href="https://shop.bethemaskin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full border border-neutral-300 py-3 hover:bg-neutral-50 transition-colors"
                    >
                      Continue Shopping
                    </a>

                    <button onClick={handleClose} className="block w-full text-neutral-600 py-3 hover:text-black transition-colors">
                      Close
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
