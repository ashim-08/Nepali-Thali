import React, { useState } from "react";
import { Clock, Eye, Star } from "lucide-react";
import AddToCart from "../Button/AddToCart";
import ProductModal from "../Modal/ProductModal";

const Card = ({ data }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden w-full max-w-sm transform hover:-translate-y-2">
        <div
          className="relative h-48 overflow-hidden cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          <img
            src={data.image}
            alt={data.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold uppercase tracking-wide">
              {data.tags && data.tags[0]}
            </span>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-orange-500 uppercase font-semibold tracking-wide">
              {data.mealType && data.mealType[0]}
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock size={12} />
              {data.cookTimeMinutes}
            </div>
          </div>

          <h3 className="font-bold text-gray-800 text-lg leading-tight line-clamp-2 min-h-[3.5rem]">
            {data.name}
          </h3>

          <p className="text-gray-600 text-sm line-clamp-2 min-h-[2.5rem]">
            {data.instructions}
          </p>

          <div className="flex items-center gap-1 text-yellow-500 text-sm">
            <Star size={16} fill="#facc15" stroke="#facc15" />
            <span className="text-gray-700">{data.rating}</span>
          </div>

          <div className="flex justify-between items-center pt-2">
            <div className="text-lg font-bold text-red-600">
              Rs. {data.caloriesPerServing}
            </div>
            <AddToCart product={data} />
          </div>
        </div>
      </div>

      {showModal && <ProductModal data={data} setShowModal={setShowModal} />}
    </>
  );
};

export default Card;
