import React, { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + action.payload.caloriesPerServing,
        };
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + action.payload.caloriesPerServing,
      };
    }

    case "REMOVE_FROM_CART": {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (!item) return state;

      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
        totalItems: state.totalItems - item.quantity,
        totalPrice: state.totalPrice - item.caloriesPerServing * item.quantity,
      };
    }

    case "UPDATE_QUANTITY": {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (!item) return state;

      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload.id),
          totalItems: state.totalItems - item.quantity,
          totalPrice:
            state.totalPrice - item.caloriesPerServing * item.quantity,
        };
      }

      const quantityDiff = action.payload.quantity - item.quantity;
      const updatedItems = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems + quantityDiff,
        totalPrice: state.totalPrice + item.caloriesPerServing * quantityDiff,
      };
    }

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    const storedState = localStorage.getItem("cartState");
    return storedState ? JSON.parse(storedState) : initialState;
  });

  useEffect(() => {
    localStorage.setItem("cartState", JSON.stringify(state));
  }, [state]);

  const addToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalItems: state.totalItems,
        totalPrice: state.totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
