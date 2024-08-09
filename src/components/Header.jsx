import React, {useEffect, useState} from "react";
import {Link, NavLink, useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../auth_v2/authContext";
import {toast} from "react-toastify";
import AccountInfo from "./AccountInfo.jsx";
import GetPlanSetting from "./GetPlanSetting.jsx";
import {getPlanSettings} from "../rest_apis/restApi.jsx";

export default function Header() {
    const {user, logout, setUserDetails} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [plan, setPlan] = useState({});

    async function fetchData(userData) {
        try {
            if (userData && userData.customer_id) {
                const orderInfo = await getPlanSettings({customer_id: userData.customer_id});
                setPlan(orderInfo);
            }
        } catch (error) {
            console.error("Error fetching order:", error);
        }
    }

    const isSuccess = location.search.includes('success');
    const isError = location.search.includes('error');
    const [showRegisterDialog, setShowRegisterDialog] = useState(false);

    const openRegisterDialog = () => {
        setShowRegisterDialog(true);
    };

    const closeRegisterDialog = () => {
        setShowRegisterDialog(false);
    };

    if (isSuccess) {
        navigate('/my-menu');
    }
    if (isError) {
        navigate('/order-flow?error');
    }

    const handleLogout = () => {
        logout();
        navigate('/');
        toast.success('Logout successfully!')
    };

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const jsonUser = JSON.parse(userData);
            setUserDetails(jsonUser);
            fetchData(jsonUser);
        }
    }, []);

    return (
        <div className="aj-drop-shadow background-white">
            <div className="container">
                <nav className="navbar navbar-expand-lg bg-body-tertiary background-white">
                    <Link to="/" className="navbar-brand aj-site-logo">
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
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to="/about" className="nav-link header-items" activeClassName="active">
                                    About us
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/faq" className="nav-link header-items " activeClassName="active">
                                    FAQ
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/how-it-works" className="nav-link header-items" activeClassName="active">
                                    How it works
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/recipes" className="nav-link header-items" activeClassName="active">
                                    Our recipe
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/contact" className="nav-link header-items" activeClassName="active">
                                    Contact us
                                </NavLink>
                            </li>
                        </ul>
                        <div className="d-flex">
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
                                        className="nav-link header-items dropdown-toggle text-primary"
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
                                                    <div data-bs-toggle="modal" data-bs-target="#exampleModal"
                                                         className="dropdown-item cursor-pointer">
                                                        Account Info
                                                    </div>
                                                </li>
                                                <li>
                                                    <hr className="dropdown-divider"/>
                                                </li>
                                                <li>
                                                    <div data-bs-toggle="modal" data-bs-target="#GetPlanSetting"
                                                         className="dropdown-item  cursor-pointer">
                                                        Plan Settings
                                                    </div>
                                                </li>
                                                <li>
                                                    <hr className="dropdown-divider"/>
                                                </li>
                                                <li>
                                                    <NavLink
                                                        to="/selected-meals-cart"
                                                        className="dropdown-item"
                                                        activeClassName="active"
                                                    >
                                                        My Cart
                                                    </NavLink>
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
                                                <NavLink to="/login" className="dropdown-item" activeClassName="active">
                                                    Login
                                                </NavLink>
                                            </li>
                                        )}
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <AccountInfo/>
            </div>
            <div className="modal fade" id="GetPlanSetting" tabIndex="-1" aria-labelledby="GetPlanSetting"
                 aria-hidden="true">
                <GetPlanSetting data={plan}/>
            </div>
        </div>
    );
}
