import React, {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../auth_v2/authContext";
import {toast} from "react-toastify";
import AccountInfo from "./AccountInfo.jsx";

export default function Header() {
    const {user, logout, setUserDetails} = useAuth(); // Access login function from auth context
    const location = useLocation();
    const navigate = useNavigate();

    // Check if the URL contains the query parameter 'success'

    const isSuccess = location.search.includes('success');
    const [showRegisterDialog, setShowRegisterDialog] = useState(false);

    const openRegisterDialog = () => {
        setShowRegisterDialog(true);
    };

    const closeRegisterDialog = () => {
        setShowRegisterDialog(false);
    };
    if (isSuccess) {
        console.log('Going to route to my menu');
        navigate('/my-menu')
        console.log('Navigated');
    }
    const handleLogout = () => {
        // Call the login function when the login button is clicked
        logout();
        navigate('/')
        toast.success('Logout successfully!')
    };

    useEffect(() => {
        const userData = localStorage.getItem('user')
        console.log('user: ', user)
        if (userData) {
            console.log('Setting up userData:', userData)
            setUserDetails(JSON.parse(userData))
        }
    }, []);


    return (
        <div className="aj-drop-shadow background-white">
            <div className="container">
                <nav className="navbar navbar-expand-lg bg-body-tertiary background-white">
                    <div className="container-fluid px-0">
                        <Link to="" className="navbar-brand aj-site-logo">
                            <img src="/edenmade/logo.png" className="card-img-top rounded-0 logo" alt="logo"/>
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                            className="collapse navbar-collapse"
                            id="navbarSupportedContent"
                        >
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link to="/about-us" className="nav-link">
                                        About Us
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/how-it-works" className="nav-link">
                                        How it Works
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/our-recipes" className="nav-link">
                                        Our Recipes
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/contact-us" className="nav-link">
                                        Contact Us
                                    </Link>
                                </li>
                            </ul>
                            <div className="d-flex">
                                {/* For Registered User */}
                                {user && user.customer_id &&
                                    <Link to="/my-menu">
                                        <button className="btn btn-primary mx-3">My Menu</button>
                                    </Link>
                                }
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item dropdown text-primary d-flex align-items-center">
                                        <i className="fi fi-sr-user"></i>
                                        <Link
                                            to="#"
                                            className="nav-link dropdown-toggle text-primary"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            Account
                                        </Link>

                                        <ul className="dropdown-menu aj-drop-shadow">
                                            {user && user.customer_id &&
                                                <>
                                                    <li>
                                                        <Link
                                                            to="#"
                                                            className="dropdown-item"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#planSettingPopup"
                                                        >
                                                            Plan Settings
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <hr className="dropdown-divider"/>
                                                    </li>
                                                    <li>
                                                        <div data-bs-toggle="modal" data-bs-target="#exampleModal" className="dropdown-item">
                                                            Account Info
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <hr className="dropdown-divider"/>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            to="/selected-meals-cart"
                                                            className="dropdown-item"
                                                        >
                                                            My Cart
                                                        </Link>
                                                    </li>
                                                </>
                                            }
                                            <li>
                                                <hr className="dropdown-divider"/>
                                            </li>
                                            {user && user.customer_id ? (
                                                <li onClick={handleLogout}>
                                                    <Link to="#" className="dropdown-item">
                                                        Logout
                                                    </Link>{" "}
                                                </li>
                                            ) : (
                                                <li>
                                                    <Link to="/login" className="dropdown-item">
                                                        Login
                                                    </Link>
                                                </li>
                                            )}
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                             aria-hidden="true">
                            <AccountInfo/>
                        </div>
                </nav>
            </div>
        </div>
    );
}
