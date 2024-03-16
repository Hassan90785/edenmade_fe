// App.js

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PropTypes from "prop-types";
import "./App.css";
import Cart from "./pages/Cart";
import ChangeMeal from "./pages/ChangeMeal";
import LandingPage from "./pages/LandingPage";
import MyMenu from "./pages/MyMenu";
import OrderFlow from "./pages/OrderFlow";
import { AuthProvider } from "./auth_v2/authContext";
import config from "./auth_v2/config";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App({ routes }) {
  return (
      <AuthProvider config={config}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="order-flow" element={<OrderFlow />} />
            <Route path="my-menu" element={<MyMenu />} />
            <Route path="selected-meals-cart" element={<Cart />} />
            <Route path="change-meal" element={<ChangeMeal />} />
          </Routes>
        </BrowserRouter>
          <ToastContainer/>

      </AuthProvider>

  );
}

// Add propTypes validation for routes
App.propTypes = {
  routes: PropTypes.array.isRequired,
};

export default App;
