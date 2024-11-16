// src/components/CartIcon.tsx
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../store";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import './CartIcon.scss';

const CartIcon: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const navigate = useNavigate();

  // Calcular la cantidad total de productos en el carrito
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleCheckout = () => {
    navigate("/cart");
  };

  return (
    <div style={{ position: "relative" }} className="cart-icon">
      <button onClick={handleCheckout}>
        <ShoppingCartIcon/>
        ({totalItems})
      </button>
      {totalItems > 0 && (
        <span className="cart-quantity">{totalItems}</span>
      )}
    </div>
  );
};

export default CartIcon;
