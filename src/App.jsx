// App.js

import React, { useState, useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Cart from "./pages/Cart";
import ChangeMeal from "./pages/ChangeMeal";
import LandingPage from "./pages/LandingPage";
import MyMenu from "./pages/MyMenu";
import OrderFlow from "./pages/OrderFlow";
import { AuthProvider, useAuth } from "./auth/authContext";
import { useNavigate } from "react-router-dom";
import SecurePage from "./auth/Secure";

const router = createBrowserRouter([
  {
    path: "/",

    children: [
      {
        path: "",
        element: <SecurePage Comment={LandingPage} data={"landing"} />,
      },
      {
        path: "order-flow",
        element: <SecurePage Comment={OrderFlow} data={"order"} />,
      },
      {
        path: "my-menu",
        element: <SecurePage Comment={MyMenu} />,
      },
      {
        path: "selected-meals-cart",
        element: <SecurePage Comment={Cart} />,
      },
      {
        path: "change-meal",
        element: <SecurePage Comment={ChangeMeal} />,
      },
      // Cart,
    ],
  },
]);

function App({ routes }) {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
