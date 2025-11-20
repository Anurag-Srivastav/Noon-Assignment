import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
} from "react";
import { Product } from "../data/products";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: "ADD_ITEM"; product: Product; quantity?: number }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "SET_QUANTITY"; productId: string; quantity: number }
  | { type: "CLEAR_CART" };

const initialState: CartState = {
  items: [],
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (i) => i.product.id === action.product.id
      );

      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === action.product.id
              ? {
                  ...i,
                  quantity: i.quantity + (action.quantity || 1),
                }
              : i
          ),
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          { product: action.product, quantity: action.quantity || 1 },
        ],
      };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (i) => i.product.id !== action.productId
        ),
      };

    case "SET_QUANTITY":
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.product.id === action.productId
              ? { ...i, quantity: action.quantity }
              : i
          )
          .filter((i) => i.quantity > 0), // auto-remove zero qty
      };

    case "CLEAR_CART":
      return { ...state, items: [] };

    default:
      return state;
  }
}

const CartContext = createContext<{
  state: CartState;
  addItem: (product: Product, qty?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
}>({
  state: initialState,
  addItem: () => {},
  removeItem: () => {},
  setQuantity: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (product: Product, qty = 1) =>
    dispatch({ type: "ADD_ITEM", product, quantity: qty });

  const removeItem = (productId: string) =>
    dispatch({ type: "REMOVE_ITEM", productId });

  const setQuantity = (productId: string, qty: number) =>
    dispatch({ type: "SET_QUANTITY", productId, quantity: qty });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        setQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
