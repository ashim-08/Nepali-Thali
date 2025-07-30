import React from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "../../context/CartContext";

const AddToCart = ({ product }) => {
  const { items, addToCart } = useCart();

  const isInCart = items.some((item) => item.id === product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!isInCart) {
      addToCart({
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        caloriesPerServing: product.caloriesPerServing,
        mealType: product.mealType,
        rating: product.rating,
      });
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isInCart}
      className={`cursor-pointer px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
        isInCart
          ? "bg-green-500 text-white cursor-default"
          : "bg-orange-500 text-white hover:bg-orange-600 hover:scale-105 active:scale-95"
      }`}
    >
      {isInCart ? (
        <>
          <Check size={16} />
          Added
        </>
      ) : (
        <>
          <ShoppingCart size={16} />
          Add to Cart
        </>
      )}
    </button>
  );
};

export default AddToCart;
