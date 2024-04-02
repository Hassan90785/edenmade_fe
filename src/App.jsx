// App.js

import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PropTypes from "prop-types";
import "./App.css";
import Cart from "./pages/Cart";
import ChangeMeal from "./pages/ChangeMeal";
import LandingPage from "./pages/LandingPage";
import MyMenu from "./pages/MyMenu";
import OrderFlow from "./pages/OrderFlow";
import {AuthProvider} from "./auth_v2/authContext";
import config from "./auth_v2/config";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Login.jsx";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";

function App({routes}) {
    return (
        <AuthProvider config={config}>
            <BrowserRouter basename="/edenmade">
                <Header/>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<LandingPage/>}/>
                        <Route path="order-flow" element={<OrderFlow/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path="my-menu" element={<MyMenu/>}/>
                        <Route path="selected-meals-cart" element={<Cart/>}/>
                        <Route path="change-meal" element={<ChangeMeal/>}/>
                    </Routes>
                </div>
                <Footer/>
                <ToastContainer/>
            </BrowserRouter>

        </AuthProvider>

    );
}

// Add propTypes validation for routes
App.propTypes = {
    routes: PropTypes.array.isRequired,
};

export default App;
