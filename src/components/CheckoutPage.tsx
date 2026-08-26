import { useState } from "react";
import { useLocation, useNavigate, Link, useSearchParams } from "react-router";
import { CheckCircle, MessageCircle, ArrowLeft, LoaderCircle } from "lucide-react";
import { motion } from "motion/react";
import { products } from "../assets/products.json";
import { convertStringAmountToNumber } from "../utils/utility";
import { shippingTypes } from "../assets/shippingData.json";
import { ShippingMethodModal } from "./ShippingMethodModal";
import { useCart } from "../contexts/CartContext";
import statesData from "../assets/statesJson.json";
import { IOrderPayload } from "../types/IOrderPayload";
import { OrderService } from "../service/order.service";
import { toast } from "sonner";
import Paystack from "@paystack/inline-js";
import { BETHEMA_PAYSTACK_PUBLIC_KEY } from "../env.config";
import { BETHEMA_MONIFY_PUBLIC_KEY } from "../env.config";
import Monnify from "monnify-ts";

interface ShippingDetails {
  fullName: string;
  address: string;
  city: string;
  state: string;
  phoneNumber: string;
  email: string;
}

interface ShippingType {
  id: number;
  name: string;
  price: string;
  description: string | null;
}

// Product data - same as in ProductDetailPage
const allProducts = products;

// Nigeria standard VAT rate, applied to the product subtotal.
const VAT_RATE = 0.075;

export function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  const productId = searchParams.get("productId");

  // // For single product checkout
  // const quantity = parseInt(searchParams.get("quantity") || "1", 10);
  // const product = allProducts.find((p) => p.id === productId);

  // Get product data from URL parameters

  // Check if this is a single product checkout (from product detail page) or cart checkout
  const isSingleProductCheckout = !!productId;

  // For single product checkout
  const quantity = parseInt(searchParams.get("quantity") || "1", 10);
  const product = allProducts.find((p) => p.id === productId);

  // Determine checkout items
  const checkoutItems = isSingleProductCheckout && product ? [{ ...product, quantity }] : cartItems;

  const [currentStep, setCurrentStep] = useState<"shipping" | "payment" | "user-info" | "confirmation">("user-info");
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    fullName: "",
    address: "",
    city: "",
    state: "",
    phoneNumber: "",
    email: "",
  });
  const [selectedShippingType, setSelectedShippingType] = useState<number | null>(null);
  const [shippingModalOpen, setShippingModalOpen] = useState(false);
  const [errors, setErrors] = useState<Partial<ShippingDetails>>({});

  // Redirect if no checkout data
  if (!checkoutItems.length) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h2 className="font-['Syne',_sans-serif] font-bold text-2xl">No items in checkout</h2>
          <Link
            to="/shop"
            className="inline-block bg-[#2b2724] text-white px-6 py-3 rounded-sm hover:bg-[#2b2724]/90 transition-colors font-['Syne',_sans-serif] font-semibold"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const getProductSubtotal = () => checkoutItems.reduce((total, item) => total + convertStringAmountToNumber(item.price) * item.quantity, 0);

  const getShippingCost = () =>
    selectedShippingType !== null ? convertStringAmountToNumber(shippingTypes.find((type) => type.id === selectedShippingType)?.price || "0") : 0;

  // VAT applies to the shipping cost only, so it can only be computed once
  // a shipping method has been chosen.
  const getVatAmount = () => (selectedShippingType !== null ? Math.round(getShippingCost() * VAT_RATE) : 0);

  const getTotalAmount = () => getProductSubtotal() + getShippingCost() + getVatAmount();

  const validateCustomerDetails = () => {
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
    if (selectedShippingType !== null) {
      setCurrentStep("payment");
    }

    // setCurrentStep("payment");
    // // Show paystack modal

    // const monnify = new Monnify(BETHEMA_MONIFY_PUBLIC_KEY, "5948747641");
    // monnify.initializePayment({
    //   amount: 100,
    //   currency: "NGN", // or USD for enabled merchants.
    //   reference: "REF201911213237834727382",
    //   customerFullName: "Damilare Ogunnaike",
    //   customerEmail: "ogunnaike.damilare@gmail.com",
    //   paymentDescription: "Lahray World",
    //   onComplete: (response) => {
    //     // Send response.paymentReference to your server to verify
    //     console.log(response);
    //   },
    //   onClose: (data) => {
    //     console.log("Modal closed", data);
    //   },
    //   onLoadStart: () => {
    //     console.log("Loading started");
    //   },
    //   onLoadComplete: () => {
    //     console.log("Loading completed");
    //   },
    // });

    // paystackRef.current.newTransaction({
    //   key: BETHEMA_PAYSTACK_PUBLIC_KEY,
    //   amount:
    //     (getTotalAmount(
    //       checkoutItems
    //         .reduce((total, item) => {
    //           const price = convertStringAmountToNumber(item.price);
    //           return total + price * item.quantity;
    //         }, 0)
    //         .toLocaleString(),
    //       selectedShippingType !== null ? shippingTypes.find((type) => type.id === selectedShippingType)?.price || "0" : "0",
    //     ) +
    //       getFeesAmount(
    //         checkoutItems
    //           .reduce((total, item) => {
    //             const price = convertStringAmountToNumber(item.price);
    //             return total + price * item.quantity;
    //           }, 0)
    //           .toLocaleString(),
    //         selectedShippingType !== null ? shippingTypes.find((type) => type.id === selectedShippingType)?.price || "0" : "0",
    //       )) *
    //     100,
    //   email: shippingDetails.email,
    //   firstName: shippingDetails.fullName.split(" ")[0],
    //   lastName: shippingDetails.fullName.split(" ").slice(1).join(" ") || " ",
    //   phone: shippingDetails.phoneNumber,
    //   // channels: ["card", "bank_transfer", "ussd", "mobile_money", "qr"],
    //   metadata: {
    //     custom_fields: [
    //       {
    //         display_name: "Shipping Method",
    //         variable_name: "shipping_method",
    //         value: selectedShippingType !== null ? shippingTypes.find((type) => type.id === selectedShippingType)?.name || "N/A" : "N/A",
    //       },
    //       {
    //         display_name: "Shipping Cost",
    //         variable_name: "shipping_cost",
    //         value: selectedShippingType !== null ? shippingTypes.find((type) => type.id === selectedShippingType)?.price || "0" : "0",
    //       },
    //       {
    //         display_name: "Product Total",
    //         variable_name: "product_total",
    //         value: checkoutItems
    //           .reduce((total, item) => {
    //             const price = convertStringAmountToNumber(item.price);
    //             return total + price * item.quantity;
    //           }, 0)
    //           .toLocaleString(),
    //       },
    //       {
    //         display_name: "Customer Name",
    //         variable_name: "customer_name",
    //         value: shippingDetails.fullName,
    //       },
    //       {
    //         display_name: "Customer Phone",
    //         variable_name: "customer_phone",
    //         value: shippingDetails.phoneNumber,
    //       },
    //       {
    //         display_name: "Shipping Address",
    //         variable_name: "shipping_address",
    //         value: `${shippingDetails.address}, ${shippingDetails.city}, ${shippingDetails.state}`,
    //       },
    //       {
    //         display_name: "Order Items",
    //         variable_name: "order_items",
    //         value: JSON.stringify(
    //           checkoutItems.map((item) => ({
    //             itemName: item.name,
    //             quantity: item.quantity,
    //             price: convertStringAmountToNumber(item.price),
    //           })),
    //         ),
    //       },
    //       {
    //         display_name: "Total Amount",
    //         variable_name: "total_amount",
    //         value: getTotalAmount(
    //           checkoutItems
    //             .reduce((total, item) => {
    //               const price = convertStringAmountToNumber(item.price);
    //               return total + price * item.quantity;
    //             }, 0)
    //             .toLocaleString(),
    //           selectedShippingType !== null ? shippingTypes.find((type) => type.id === selectedShippingType)?.price || "0" : "0",
    //         ).toLocaleString(),
    //       },
    //     ],
    //   },
    //   onSuccess: (transaction) => {
    //     console.log(transaction);
    //     toast.success("Payment successful. Your order is being processed.");
    //     handleTransferred(transaction.reference);
    //   },
    //   onLoad: (response) => {
    //     console.log("onLoad: ", response);
    //     toast.info("Payment initiated. Please complete the payment in the popup.");
    //   },
    //   onCancel: () => {
    //     toast.error("Payment cancelled. Please try again.");
    //   },
    //   onError: (error) => {
    //     console.log("Error: ", error.message);
    //     toast.error("An error occurred while processing the payment.");
    //   },
    // });
  };

  const handleContinueToShipping = () => {
    if (validateCustomerDetails()) {
      setCurrentStep("shipping");
    }
  };

  const handleTransferred = async () => {
    try {
      setIsLoading(true);
      const shippingMethod = shippingTypes.find((type) => type.id === selectedShippingType);
      const orderPayload: IOrderPayload = {
        customerName: shippingDetails.fullName,
        customerEmail: shippingDetails.email,
        customerPhoneNumber: shippingDetails.phoneNumber,
        shippingAddress: {
          address: shippingDetails.address,
          city: shippingDetails.city,
          state: shippingDetails.state,
        },
        orderItems: checkoutItems.map((item) => ({
          itemName: item.name,
          quantity: item.quantity,
          price: convertStringAmountToNumber(item.price),
        })),
        shippingMethod: {
          name: shippingMethod?.name || "",
          cost: convertStringAmountToNumber(shippingMethod?.price || "0"),
          description: shippingMethod?.description || "",
        },
        totalAmount: getTotalAmount(),
        vatAmount: getVatAmount(),
      };
      console.log("Order Payload:", orderPayload);
      const response = await new OrderService().processOrder(orderPayload);
      console.log("Response:", response);
      if (response.status === 200) {
        toast.info("Your order has been received and is being processed.");
        setCurrentStep("confirmation");
        clearCart();
      } else {
        toast.error("There was an issue processing your order: " + response.message);
      }
    } catch (error) {
      console.log("Error during order processing:", error);
      toast.error("There was an issue processing your order. Please try again." + (error instanceof Error ? error.message : ""));
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof ShippingDetails, value: string) => {
    setShippingDetails((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-neutral-200 sticky top-0 bg-white z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-sm hover:text-neutral-600 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
            {/* <h1 className="text-2xl font-light">Bethema Skin</h1>
            <div className="w-20" /> Spacer for alignment */}
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      {currentStep !== "confirmation" && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center gap-2">
            <div className={`flex items-center gap-2 ${currentStep === "user-info" ? "text-black" : "text-neutral-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  currentStep === "user-info" ? "border-[#2b2724] bg-[#2b2724] text-white" : "border-neutral-300"
                }`}
              >
                1
              </div>
              <span className="text-sm hidden sm:inline">Customer Information</span>
            </div>
            <div className="w-16 h-px bg-neutral-300" />
            <div className={`flex items-center gap-2 ${currentStep === "shipping" ? "text-black" : "text-neutral-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  currentStep === "shipping" ? "border-[#2b2724] bg-[#2b2724] text-white" : "border-neutral-300"
                }`}
              >
                2
              </div>
              <span className="text-sm hidden sm:inline">Shipping</span>
            </div>
            <div className="w-16 h-px bg-neutral-300" />
            <div className={`flex items-center gap-2 ${currentStep === "payment" ? "text-black" : "text-neutral-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  currentStep === "payment" ? "border-[#2b2724] bg-[#2b2724] text-white" : "border-neutral-300"
                }`}
              >
                3
              </div>
              <span className="text-sm hidden sm:inline">Payment</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        {currentStep === "user-info" ? (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Shipping Form */}
            <div className="space-y-6">
              <div>
                <h2 className="font-['Syne',_sans-serif] font-bold text-3xl mb-2">Customer Information</h2>
                <p className="text-neutral-600">Please provide your delivery details</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={shippingDetails.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    className={`w-full px-4 py-3 border ${
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
                    className={`w-full px-4 py-3 border ${
                      errors.address ? "border-red-500" : "border-neutral-300"
                    } focus:outline-none focus:border-neutral-900`}
                    placeholder="Street address, P.O. box"
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
                      className={`w-full px-4 py-3 border ${errors.city ? "border-red-500" : "border-neutral-300"} focus:outline-none focus:border-neutral-900`}
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
                    className={`w-full px-4 py-3 border ${
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
                    className={`w-full px-4 py-3 border ${errors.email ? "border-red-500" : "border-neutral-300"} focus:outline-none focus:border-neutral-900`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
              </div>

              <button
                onClick={handleContinueToShipping}
                className="w-full bg-[#2b2724] text-white py-4 rounded-sm hover:bg-[#2b2724]/90 transition-colors font-['Syne',_sans-serif] font-semibold"
              >
                Continue to Shipping
              </button>
            </div>

            {/* Right Column - Order Summary */}
            <div>
              <div className="sticky top-24">
                <h3 className="font-['Syne',_sans-serif] font-semibold text-xl mb-4">Order Summary</h3>
                <div className="bg-neutral-50 p-6 space-y-4">
                  {/* Product Info */}
                  {checkoutItems.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b border-neutral-200">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
                      <div className="flex-1">
                        <h4 className="font-['Syne',_sans-serif] font-semibold mb-1">{item.name}</h4>
                        <p className="text-sm text-neutral-600">Quantity: {item.quantity}</p>
                        <p className="text-sm text-neutral-600">₦{item.price} each</p>
                      </div>
                    </div>
                  ))}

                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">Subtotal</span>
                      <span>₦{getProductSubtotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">VAT (7.5%)</span>
                      <span>Calculated at next step</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">Shipping</span>
                      <span>Calculated at next step</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-neutral-200">
                      <span className="font-['Syne',_sans-serif] font-semibold">Total</span>
                      <span className="font-['Syne',_sans-serif] font-semibold text-xl">₦{getProductSubtotal().toLocaleString()}+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : currentStep === "payment" ? (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Payment Details */}
            <div className="space-y-6">
              <div>
                <h2 className="font-['Syne',_sans-serif] font-bold text-3xl mb-2">Payment</h2>
                <p className="text-neutral-600">Complete your order with bank transfer</p>
              </div>

              {/* Shipping Summary */}
              <div className="bg-neutral-50 p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-['Syne',_sans-serif] font-semibold">Shipping Address</h3>
                  <button onClick={() => setCurrentStep("user-info")} className="text-xs text-blue-600 hover:underline">
                    Edit
                  </button>
                </div>
                <div className="text-sm text-neutral-700 space-y-1">
                  <p className="font-medium">{shippingDetails.fullName}</p>
                  <p>{shippingDetails.address}</p>
                  <p>
                    {shippingDetails.city}, {shippingDetails.state}
                  </p>
                  <p>{shippingDetails.phoneNumber}</p>
                  <p>{shippingDetails.email}</p>
                </div>
              </div>

              {/* Bank Transfer Details */}
              <div className="space-y-4">
                <h3 className="font-['Syne',_sans-serif] font-semibold">Bank Transfer Details</h3>
                <div className="bg-neutral-50 p-4 space-y-3">
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">Bank Name</p>
                    <p className="font-medium">United Bank For Africa</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">Account Name</p>
                    <p className="font-medium">Bethema Skin</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">Account Number</p>
                    <p className="text-xl font-mono">1030044695</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">Amount to Transfer</p>
                    <p className="font-['Syne',_sans-serif] font-semibold text-2xl text-green-600">₦{getTotalAmount().toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-blue-50 p-4 space-y-2 text-sm">
                <p className="font-medium">Important:</p>
                <ul className="list-disc list-inside space-y-1 text-neutral-700">
                  <li>Transfer the exact amount shown above</li>
                  <li>Use your name as reference</li>
                  <li>Your order will be processed once payment is confirmed</li>
                  <li>You will receive a confirmation email</li>
                </ul>
              </div>

              {/* Action Button */}
              <button
                onClick={handleTransferred}
                disabled={isLoading}
                className="w-full flex justify-center bg-[#2b2724] text-white py-4 rounded-sm hover:bg-[#2b2724]/90 transition-colors text-lg font-['Syne',_sans-serif] font-semibold"
              >
                {isLoading ? (
                  <>
                    <LoaderCircle className="w-5 h-5 mr-2 animate-spin" /> Processing...
                  </>
                ) : (
                  "I Have Transferred"
                )}
              </button>

              {/* Quick Contact */}
              <div className="space-y-3 pt-4 border-t border-neutral-200">
                <p className="text-sm text-neutral-600">Need help or want immediate confirmation?</p>

                <a
                  href="https://wa.me/+2348039801519"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 border-2 border-green-600 text-green-600 hover:bg-green-50 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <div className="text-left">
                    <p className="font-medium">Contact us on WhatsApp</p>
                    <p className="text-xs">+234 803 980 1519</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div>
              <div className="sticky top-24">
                <h3 className="font-['Syne',_sans-serif] font-semibold text-xl mb-4">Order Summary</h3>
                <div className="bg-neutral-50 p-6 space-y-4">
                  {/* Product Info */}
                  {checkoutItems.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b border-neutral-200">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
                      <div className="flex-1">
                        <h4 className="font-['Syne',_sans-serif] font-semibold mb-1">{item.name}</h4>
                        <p className="text-sm text-neutral-600">Quantity: {item.quantity}</p>
                        <p className="text-sm text-neutral-600">₦{item.price} each</p>
                      </div>
                    </div>
                  ))}

                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">Subtotal</span>
                      <span>₦{getProductSubtotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">VAT (7.5%)</span>
                      <span>₦{getVatAmount().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">Shipping</span>
                      <span>₦{getShippingCost().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-neutral-200">
                      <span className="font-['Syne',_sans-serif] font-semibold">Total</span>
                      <span className="font-['Syne',_sans-serif] font-semibold text-xl">₦{getTotalAmount().toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : currentStep === "shipping" ? (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Shipping Form */}
            <div className="space-y-6">
              <div>
                <h2 className="font-['Syne',_sans-serif] font-bold text-3xl mb-2">Shipping Method</h2>
                <p className="text-neutral-600">Please select your shipping method</p>
              </div>

              {/* Shipping Method Display */}
              {selectedShippingType === null ? (
                <button
                  onClick={() => setShippingModalOpen(true)}
                  className="w-full bg-[#2b2724] text-white py-4 rounded-sm hover:bg-[#2b2724]/90 transition-colors font-['Syne',_sans-serif] font-semibold"
                >
                  Select a Shipping Method
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 border-2 border-[#2b2724] bg-[#2b2724] text-white rounded-sm">
                    {(() => {
                      const selected = shippingTypes.find((st: ShippingType) => st.id === selectedShippingType);
                      return (
                        <>
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{selected?.name}</p>
                              {selected?.description && <p className="text-xs mt-1 text-neutral-200">{selected.description}</p>}
                            </div>
                            <p className="font-medium whitespace-nowrap ml-4">₦{Number(selected?.price).toLocaleString()}</p>
                          </div>
                        </>
                      );
                    })()}
                  </div>

                  <h4
                    onClick={() => setShippingModalOpen(true)}
                    className="w-full cursor-pointer text-underline text-center py-4 hover:bg-neutral-50 transition-colors font-['Syne',_sans-serif] font-semibold"
                  >
                    Change Shipping Method
                  </h4>

                  <button
                    onClick={handleContinueToPayment}
                    className="w-full border-2 border-[#2b2724] text-[#2b2724] py-4 rounded-sm hover:bg-[#2b2724] hover:text-white transition-colors font-['Syne',_sans-serif] font-semibold"
                  >
                    Continue to Payment
                  </button>
                </div>
              )}

              {/* Shipping Method Modal */}

              {/* Payment Modal */}
              <ShippingMethodModal
                isOpen={shippingModalOpen}
                onClose={() => setShippingModalOpen(false)}
                onSelectedShippingMethod={(shippingType: ShippingType) => {
                  setSelectedShippingType(shippingType.id);
                  setShippingModalOpen(false);
                }}
              />
            </div>

            {/* Right Column - Order Summary */}
            <div>
              <div className="sticky top-24">
                <h3 className="font-['Syne',_sans-serif] font-semibold text-xl mb-4">Order Summary</h3>
                <div className="bg-neutral-50 p-6 space-y-4">
                  {/* Product Info */}
                  {checkoutItems.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b border-neutral-200">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover" />
                      <div className="flex-1">
                        <h4 className="font-['Syne',_sans-serif] font-semibold mb-1">{item.name}</h4>
                        <p className="text-sm text-neutral-600">Quantity: {item.quantity}</p>
                        <p className="text-sm text-neutral-600">₦{item.price} each</p>
                      </div>
                    </div>
                  ))}

                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">Subtotal</span>
                      <span>₦{getProductSubtotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">VAT (7.5%)</span>
                      <span>₦{getVatAmount().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-600">Shipping</span>
                      <span>₦{getShippingCost().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-neutral-200">
                      <span className="font-['Syne',_sans-serif] font-semibold">Total</span>
                      <span className="font-['Syne',_sans-serif] font-semibold text-xl">₦{getTotalAmount().toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="max-w-2xl mx-auto">
            <div className="text-center space-y-6 py-12">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.5 }}>
                <CheckCircle className="w-24 h-24 text-green-600 mx-auto" />
              </motion.div>

              <div className="space-y-3">
                <h2 className="font-['Syne',_sans-serif] font-bold text-4xl">Order Submitted!</h2>
                <p className="text-lg text-neutral-600">Thank you for your order</p>
                <p className="text-neutral-600">
                  We have received your order notification. A confirmation receipt will be sent to <span className="font-medium">{shippingDetails.email}</span>{" "}
                  once your payment is confirmed.
                </p>
              </div>

              {/* Order Details */}
              <div className="bg-neutral-50 p-6 text-left space-y-4">
                <h3 className="font-['Syne',_sans-serif] font-semibold text-lg">Order Details</h3>
                <div className="space-y-2 text-sm">
                  {checkoutItems.map((item) => (
                    <>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Product</span>
                        <span>{item.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-600">Quantity</span>
                        <span>{item.quantity}</span>
                      </div>
                    </>
                  ))}

                  <div className="flex justify-between">
                    <span className="text-neutral-600">VAT (7.5%)</span>
                    <span>₦{getVatAmount().toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-neutral-600">Total Amount</span>
                    <span className="font-medium">₦{getTotalAmount().toLocaleString()}</span>
                  </div>
                </div>
                <div className="pt-3 border-t border-neutral-200">
                  <p className="text-sm font-medium mb-2">Shipping To:</p>
                  <p className="text-sm text-neutral-700">{shippingDetails.fullName}</p>
                  <p className="text-sm text-neutral-700">{shippingDetails.address}</p>
                  <p className="text-sm text-neutral-700">
                    {shippingDetails.city}, {shippingDetails.state}
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 p-6 space-y-3">
                <p className="font-medium">Need immediate confirmation?</p>
                <p className="text-sm text-neutral-600">Contact us on WhatsApp to upload your payment receipt and get instant confirmation.</p>
              </div>

              <div className="space-y-3 pt-4">
                <a
                  href="https://wa.me/+2348039801519"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-green-600 text-white py-4 hover:bg-green-700 transition-colors font-['Syne',_sans-serif] font-semibold"
                >
                  Contact on WhatsApp
                </a>

                <a
                  href="/shop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full border-2 border-neutral-300 py-4 hover:bg-neutral-50 transition-colors font-['Syne',_sans-serif] font-semibold"
                >
                  Continue Shopping
                </a>

                <Link to="/" className="block w-full text-neutral-600 py-4 hover:text-black transition-colors font-['Syne',_sans-serif] font-semibold">
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
