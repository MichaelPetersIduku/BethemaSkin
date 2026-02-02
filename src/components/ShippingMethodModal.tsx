import { useState } from "react";
import { X, CheckCircle, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import statesData from "../assets/statesJson.json";
import { shippingTypes } from "../assets/shippingData.json";

interface ShippingMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectedShippingMethod: (shippingType: ShippingMethod) => void;
}

interface ShippingMethod {
  id: number;
  name: string;
  price: string;
  description: string | null;
}

interface ShippingDetails {
  fullName: string;
  address: string;
  city: string;
  state: string;
  phoneNumber: string;
  email: string;
}

export function ShippingMethodModal({ isOpen, onClose, onSelectedShippingMethod }: ShippingMethodModalProps) {
  const [selectedShippingType, setSelectedShippingType] = useState<number | null>(null);
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    fullName: "",
    address: "",
    city: "",
    state: "",
    phoneNumber: "",
    email: "",
  });
  const [errors, setErrors] = useState<Partial<ShippingDetails>>({});

  const handleClose = () => {
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
            {shippingTypes.map((shippingType: ShippingMethod) => (
              <div
                key={shippingType.id}
                onClick={() => {
                  setSelectedShippingType(shippingType.id);
                  onSelectedShippingMethod(shippingType);
                }}
                className={`p-4 border-2 cursor-pointer transition-all ${
                  selectedShippingType === shippingType.id ? "border-black bg-black text-white" : "border-neutral-300 hover:border-neutral-400"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{shippingType.name}</p>
                    {shippingType.description && (
                      <p className={`text-xs mt-1 ${selectedShippingType === shippingType.id ? "text-neutral-200" : "text-neutral-600"}`}>
                        {shippingType.description}
                      </p>
                    )}
                  </div>
                  <p className="font-medium whitespace-nowrap ml-4">₦{Number(shippingType.price).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
