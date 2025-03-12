import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Styled components for success page layout
const PageWrapper = styled.div`
  padding: 20px;
  text-align: center;
`;

const SuccessMessage = styled.h2`
  color: #27ae60;
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #2980b9;
  }
`;

const CheckoutSuccessPage = () => {
  const { setCart } = useCart();

  const handleClearCart = () => {
    setCart([]); // Clear the cart
  };

  return (
    <PageWrapper>
      <SuccessMessage>Order was successful!</SuccessMessage>
      <p>Your order has been placed successfully.</p>
      <Link to="/" onClick={handleClearCart}>
        <Button>Back to Store</Button>
      </Link>
    </PageWrapper>
  );
};

export default CheckoutSuccessPage;
