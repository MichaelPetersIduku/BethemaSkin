import { useState } from "react";
import { X, CheckCircle, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  productName: string;
  quantity: number;
}

export function PaymentModal({ isOpen, onClose, totalAmount, productName, quantity }: PaymentModalProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleTransferred = () => {
    setShowConfirmation(true);
  };

  const handleClose = () => {
    setShowConfirmation(false);
    onClose();
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
            {!showConfirmation ? (
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

                  {/* Bank Transfer Details */}
                  <div className="space-y-4 text-center">
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
                      className="flex items-center gap-3 p-3 border border-green-600 text-green-600 hover:bg-green-50 transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <div className="text-left">
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
                      Contact us on WhatsApp at <span className="font-medium">+234 803 980 1519</span> or upload your payment receipt.
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
