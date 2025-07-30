import React, { useRef } from "react";
import { X, Star, Clock, Users } from "lucide-react";
import AddToCart from "../Button/AddToCart";

const ProductModal = ({ data, setShowModal }) => {
  const modalRef = useRef();

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModal(false);
    }
  };

  const StarRating = ({ rating }) => (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={16}
          className={`${
            index < Math.floor(rating)
              ? "text-yellow-400 fill-current"
              : "text-gray-300"
          }`}
        />
      ))}
      <span className="text-sm text-gray-600 ml-2">{rating}/5</span>
    </div>
  );

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img
            src={data.image}
            alt={data.name}
            className="w-full h-64 object-cover rounded-t-2xl"
          />
          <button
            onClick={() => setShowModal(false)}
            className="cursor-pointer absolute top-4 right-4 bg-black/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/40 transition-colors"
          >
            <X size={20} />
          </button>
          <div className="absolute bottom-4 left-4">
            <span className="bg-orange-500 text-white text-sm px-3 py-1 rounded-full font-semibold">
              {data.tags && data.tags[0]}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {data.name}
              </h2>
              <StarRating rating={data.rating} />
            </div>
            <div className="text-2xl font-bold text-green-600">
              Rs. {data.caloriesPerServing}
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed">{data.description}</p>

          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock size={16} className="text-orange-500" />
              <span className="text-sm">
                Cooking Time: {data.cookTimeMinutes}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Users size={16} className="text-orange-500" />
              <span className="text-sm">
                Meal Type: {data.mealType && data.mealType.join(", ")}
              </span>
            </div>
            {data.servings && (
              <div className="flex items-center gap-2 text-gray-600">
                <Users size={16} className="text-orange-500" />
                <span className="text-sm">Servings: {data.servings}</span>
              </div>
            )}
            {data.difficulty && (
              <div className="flex items-center gap-2 text-gray-600">
                <Clock size={16} className="text-orange-500" />
                <span className="text-sm">Difficulty: {data.difficulty}</span>
              </div>
            )}
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Ingredients:</h3>
            <div className="flex flex-wrap gap-2">
              {data.ingredients &&
                data.ingredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {ingredient}
                  </span>
                ))}
            </div>
          </div>

          {data.instructions && data.instructions.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Instructions:
              </h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                {data.instructions.slice(0, 3).map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
                {data.instructions.length > 3 && (
                  <li className="text-orange-500">
                    ...and {data.instructions.length - 3} more steps
                  </li>
                )}
              </ol>
            </div>
          )}

          <div className="pt-4 border-t">
            <AddToCart product={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
