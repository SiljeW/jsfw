import React from 'react';
import { Outlet, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import styled from "styled-components";
import { FaShoppingCart } from 'react-icons/fa';

// Styled Components
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
`;

const Header = styled.header`
  background: #333;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: auto;
  color: white;
  padding: 1rem;
`;

const Heading = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
  font-style: italic;
`;


const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin: 0 2.5rem;
  font-size: 1.2rem;
`;

const LeftNav = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const CartLink = styled(Link)`
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;

  &:hover {
    color: #ddd;
  }
`;

const Main = styled.main`
  padding: 1rem;
  flex-grow: 1; /* Ensures the main content takes up remaining space */
`;

const Footer = styled.footer`
  text-align: center;
  padding: 1rem;
  background: #222;
  color: white;
`;

const Layout = () => {
  const { cart } = useCart();
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0); // Ensure correct count

  return (
    <Wrapper>
      <Header>
        <Heading>Bunchies.</Heading>
        <Nav>
          {/* Left side: Home and Contact */}
          <LeftNav>
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/contact">Contact</StyledLink>
          </LeftNav>

          {/* Right side: Cart */}
          <CartLink to="/checkout">
            <FaShoppingCart />
            {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
          </CartLink>
        </Nav>
      </Header>
      <Main>
        <Outlet /> {/* This renders the current page */}
      </Main>
      <Footer>© 2025 Bunchies.</Footer>
    </Wrapper>
  );
};

export default Layout;
