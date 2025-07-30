import React, { useState } from "react";
import { CreditCard, Truck, MapPin, Phone, User, X } from "lucide-react";
import Swal from "sweetalert2";
import "../../scrollbar.css";

const CheckoutModal = ({
  isOpen,
  onClose,
  cartItems,
  totalPrice,
  clearCart,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const deliveryFee = totalPrice > 300 ? 0 : 30;
  const total = totalPrice + deliveryFee;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^9\d{9}$/;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      if (name === "email") {
        if (value && !emailRegex.test(value)) {
          newErrors.email = "Invalid email address";
        } else {
          delete newErrors.email;
        }
      } else if (name === "phone") {
        if (!phoneRegex.test(value)) {
          newErrors.phone =
            "Invalid phone number. Should be 10 digits starting with 9";
        } else {
          delete newErrors.phone;
        }
      } else if (name === "fullName") {
        if (value.trim() === "") {
          newErrors.fullName = "Full name is required";
        } else {
          delete newErrors.fullName;
        }
      } else if (name === "city") {
        if (value.trim() === "") {
          newErrors.city = "City is required";
        } else {
          delete newErrors.city;
        }
      } else if (name === "address") {
        if (value.trim() === "") {
          newErrors.address = "Address is required";
        } else {
          delete newErrors.address;
        }
      }

      return newErrors;
    });
  };

  const validateAll = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email address";
    if (!phoneRegex.test(formData.phone))
      newErrors.phone =
        "Invalid phone number. Should be 10 digits starting with 9";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!validateAll()) return;

    if (cartItems.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Your cart is empty",
        confirmButtonColor: "#f97316",
      });
      return;
    }

    setIsProcessing(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      clearCart();

      await Swal.fire({
        icon: "success",
        title: "Thank you for your order!",
        text: "Your order has been placed successfully.",
        confirmButtonColor: "#f97316",
      });

      onClose();

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        city: "",
        address: "",
        notes: "",
      });
      setErrors({});
      setPaymentMethod("cod");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed -mt-10 inset-0 bg-black bg-opacity-60 flex justify-center items-start overflow-auto z-50 pt-20 px-4 scrollbar-hide">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl p-6 relative">
        <button
          onClick={() => !isProcessing && onClose()}
          disabled={isProcessing}
          className="absolute top-8 right-10 p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Close checkout"
          aria-label="Close checkout modal"
        >
          <X className="w-5 h-5" />
        </button>

        <form onSubmit={handlePlaceOrder} noValidate>
          <div className="bg-orange-500 text-white p-6 rounded-t-3xl mb-6">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <CreditCard className="w-8 h-8" />
              Checkout
            </h1>
            <p className="mt-2">Complete your order details</p>
          </div>

          <div className="lg:flex lg:gap-8">
            <div className="lg:w-2/3 space-y-8">
              <div className="rounded-2xl p-6 border">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
                  <Truck className="w-6 h-6 text-orange-500" />
                  Delivery Information
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium mb-2"
                    >
                      <User className="w-4 h-4 inline mr-2" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border rounded-xl ${
                        errors.fullName
                          ? "border-red-500 focus:border-red-600"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter your full name"
                      disabled={isProcessing}
                    />
                    {errors.fullName && (
                      <p className="text-red-600 text-xs mt-1">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border rounded-xl ${
                        errors.email
                          ? "border-red-500 focus:border-red-600"
                          : "border-gray-300"
                      }`}
                      placeholder="your@gmail.com"
                      disabled={isProcessing}
                    />
                    {errors.email && (
                      <p className="text-red-600 text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium mb-2"
                    >
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border rounded-xl ${
                        errors.phone
                          ? "border-red-500 focus:border-red-600"
                          : "border-gray-300"
                      }`}
                      placeholder="9800000000"
                      disabled={isProcessing}
                    />
                    {errors.phone && (
                      <p className="text-red-600 text-xs mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium mb-2"
                    >
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 border rounded-xl ${
                        errors.city
                          ? "border-red-500 focus:border-red-600"
                          : "border-gray-300"
                      }`}
                      placeholder="Your city"
                      disabled={isProcessing}
                    />
                    {errors.city && (
                      <p className="text-red-600 text-xs mt-1">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium mb-2"
                    >
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Delivery Address *
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className={`w-full px-4 py-3 border rounded-xl resize-none ${
                        errors.address
                          ? "border-red-500 focus:border-red-600"
                          : "border-gray-300"
                      }`}
                      placeholder="Street address, building, apartment, etc."
                      disabled={isProcessing}
                    />
                    {errors.address && (
                      <p className="text-red-600 text-xs mt-1">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="notes"
                      className="block text-sm font-medium mb-2"
                    >
                      Delivery Notes
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none"
                      placeholder="Special instructions..."
                      disabled={isProcessing}
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-6 border">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-orange-500" />
                  Payment Method
                </h2>

                <label className="flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all border-orange-500 bg-orange-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="w-5 h-5"
                    required
                    disabled={isProcessing}
                  />
                  <span className="font-medium">Cash on Delivery</span>
                </label>

                <label className="flex items-center gap-4 p-4 border-2 rounded-xl cursor-not-allowed opacity-50 mt-4">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="esewa"
                    disabled
                    className="w-5 h-5"
                  />
                  <span className="font-medium">eSewa</span>
                  <span className="text-sm text-gray-500 ml-auto">
                    Coming Soon
                  </span>
                </label>
              </div>
            </div>

            <div className="lg:w-1/3 mt-8 lg:mt-0">
              <div className="rounded-2xl p-6 border sticky top-6 max-h-[70vh] overflow-y-auto scrollbar-hide">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto scrollbar-hide">
                  {cartItems.length === 0 && (
                    <p className="text-gray-500">Your cart is empty.</p>
                  )}
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-sm text-gray-500">
                          {item.mealType?.join(", ") || "Food"} • Qty:{" "}
                          {item.quantity}
                        </p>
                        <p className="text-sm font-semibold text-orange-600">
                          Rs.{" "}
                          {(item.price ?? item.caloriesPerServing ?? 0) *
                            item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span>Rs. {totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee:</span>
                    {deliveryFee === 0 ? (
                      <span className="line-through text-red-600">
                        Rs. 30.00
                      </span>
                    ) : (
                      <span>Rs. 30.00</span>
                    )}
                  </div>

                  {deliveryFee === 0 && (
                    <>
                      <p className="text-green-600 text-sm font-medium mt-1">
                        Delivery fee waived! Discount applied.
                      </p>
                      <div className="flex justify-between text-gray-600">
                        <span>Discount:</span>
                        <span className="text-red-600">Rs. 30.00</span>
                      </div>
                    </>
                  )}

                  <div className="border-t pt-3">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total:</span>
                      <span>Rs. {total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full mt-6 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    isProcessing
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-orange-500 hover:bg-orange-600 text-white"
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    "Place Order"
                  )}
                </button>

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    By placing your order, you agree to our terms and conditions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
