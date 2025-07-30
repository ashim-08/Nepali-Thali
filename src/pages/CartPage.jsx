import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import {
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ShoppingBag,
  Star,
  CreditCard,
} from "lucide-react";
import { Link } from "react-router-dom";
import ConfirmModal from "../components/Modal/ConfirmModal";
import CheckoutModal from "../components/Modal/CheckoutModal";

const CartPage = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
    totalItems,
  } = useCart();

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
    type: "warning",
  });

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleQuantityDecrease = (item) => {
    if (item.quantity === 1) {
      setConfirmModal({
        isOpen: true,
        title: "Remove Item",
        message: `Are you sure you want to remove "${item.name}" from your cart?`,
        onConfirm: () => updateQuantity(item.id, item.quantity - 1),
        type: "warning",
      });
    } else {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemoveItem = (item) => {
    setConfirmModal({
      isOpen: true,
      title: "Remove Item",
      message: `Are you sure you want to remove "${item.name}" from your cart? This action cannot be undone.`,
      onConfirm: () => removeFromCart(item.id),
      type: "danger",
    });
  };

  const handleClearCart = () => {
    setConfirmModal({
      isOpen: true,
      title: "Clear Cart",
      message: `Are you sure you want to remove all ${totalItems} items from your cart? This action cannot be undone.`,
      onConfirm: () => clearCart(),
      type: "danger",
    });
  };

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const closeModal = () => {
    setConfirmModal({ ...confirmModal, isOpen: false });
  };

  const closeCheckoutModal = () => {
    setIsCheckoutOpen(false);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-24">
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 max-w-md w-full text-center">
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any delicious items to your cart yet.
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
          >
            <ArrowLeft size={20} />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 lg:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold">Your Cart</h1>
                <p className="text-orange-100">
                  {totalItems} items in your cart
                </p>
              </div>
              <Link
                to="/menu"
                className="flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors w-fit"
              >
                <ArrowLeft size={20} />
                <span className="hidden sm:inline">Continue Shopping</span>
                <span className="sm:hidden">Menu</span>
              </Link>
            </div>
          </div>

          <div className="p-4 lg:p-6">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 truncate">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-1 text-yellow-500 text-sm">
                      <Star size={16} fill="#facc15" stroke="#facc15" />
                      <span className="text-gray-700">{item.rating}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {item.mealType?.join(", ")}
                    </p>
                  </div>

                  <div className="flex items-center justify-between w-full sm:hidden">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleQuantityDecrease(item)}
                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-800">
                        Rs. {item.caloriesPerServing * item.quantity}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item)}
                      className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove item"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="hidden sm:flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleQuantityDecrease(item)}
                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="text-right min-w-[80px]">
                      <p className="font-bold text-gray-800">
                        Rs. {item.caloriesPerServing * item.quantity}
                      </p>
                    </div>

                    <button
                      onClick={() => handleRemoveItem(item)}
                      className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove item"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 mt-6 pt-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-semibold text-gray-800">
                  Total Price:
                </span>
                <span className="text-2xl font-bold text-orange-600">
                  Rs. {totalPrice}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleClearCart}
                  className="flex-1 bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
                >
                  Clear Cart
                </button>

                <button
                  onClick={handleCheckout}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-colors flex items-center justify-center gap-2"
                >
                  <CreditCard size={20} />
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={closeModal}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        type={confirmModal.type}
        confirmText={confirmModal.type === "danger" ? "Delete" : "Remove"}
        cancelText="Cancel"
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={closeCheckoutModal}
        cartItems={items}
        totalPrice={totalPrice}
        clearCart={clearCart}
      />
    </div>
  );
};

export default CartPage;
