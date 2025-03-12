import React from 'react';
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import styled from "styled-components";
import { FaTrash } from 'react-icons/fa'; // Import the trash bin icon

// Styled Components
const PageWrapper = styled.div`
  padding: 20px;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 20px;
`;

const Title = styled.div`
  flex-grow: 1;
`;

const Price = styled.div`
  font-size: 1.2rem;
  color: #2c3e50;
`;

const Quantity = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const Button = styled.button`
  background-color: white;
  color: #2c3e50;
  padding: 5px 10px;
  border: 0.2px solid #2c3e50;
  border-radius: 15px;
  cursor: pointer;
  margin: 0 10px;

  &:hover {
    background-color: #2980b9;
  }
`;

const TrashButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: #4f4c4c;

  &:hover {
    color: #c0392b;
  }
`;

const CheckoutButton = styled.button`
  margin-top: 20px;
  padding: 10px;
  background-color: #27ae60;
  color: white;
  font-size: 1.2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #219150;
  }
`;

const CheckoutPage = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.discountedPrice * item.quantity, 0);

  const handleCheckout = () => {
    clearCart();
    navigate("/checkout-success");
  };

  return (
    <PageWrapper>
      <h1>Checkout</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <CartItem key={item.id}>
              <Image src={item.image.url} alt={item.title} />
              <Title>{item.title}</Title>
              <Quantity>
                <Button onClick={() => decreaseQuantity(item.id)}>-</Button>
                <span>{item.quantity}</span>
                <Button onClick={() => increaseQuantity(item.id)}>+</Button>
              </Quantity>
              <Price>${item.discountedPrice * item.quantity}</Price>
              <TrashButton onClick={() => removeFromCart(item.id)}>
                <FaTrash />
              </TrashButton>
            </CartItem>
          ))}
          <h3>Total: ${total}</h3>
          <CheckoutButton onClick={handleCheckout}>Place Order</CheckoutButton>
        </>
      )}
    </PageWrapper>
  );
};

export default CheckoutPage;
