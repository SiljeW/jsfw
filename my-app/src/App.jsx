import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from './GlobalStyles';
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";

import CheckoutPage from "./pages/CheckoutPage";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage";
import ContactPage from "./pages/ContactPage";
import { CartProvider } from "./context/CartContext";

const App = () => {
  return (
    <>
      {/* Apply global styles */}
      <GlobalStyles />

      {/* Main App Structure */}
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="*" element={<h1>Page not found</h1>} />
              <Route index element={<HomePage />} />
              <Route path="product/:id" element={<ProductPage />} />

              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="checkout-success" element={<CheckoutSuccessPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </>
  );
};

export default App;
