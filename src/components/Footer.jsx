import React from "react";
import {Link, NavLink} from "react-router-dom";

export default function Footer() {
    return (
        <>
            <div className="aj-drop-shadow background-white mt-0">
                <div className="container background-white py-4">
                    <div className="row">
                        <div className="col-lg-4 col-12 text-center text-lg-start">
                            <Link to="/" className="navbar-brand aj-site-logo">
                                <img src="/edenmade/logo.png" className="card-img-top rounded-0 logo" alt="logo"/>
                            </Link>
                            <p className="body-text-small">
                                Eat healthy, save time, and hone your skills in the kitchen. Now
                                with more choices every week
                            </p>
                        </div>
                        <div className="col-lg-2 col-12 text-center text-lg-start">
                            <p className="mb-2">
                                <b>Explore</b>
                            </p>
                            <ul className="footer-menu">
                                <li className="nav-item">
                                    <NavLink to="/about" className="nav-link body-text-small" activeClassName="active">
                                        About us
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/how-it-works" className="nav-link body-text-small"
                                             activeClassName="active">
                                        How it works
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/recipes" className="nav-link body-text-small"
                                             activeClassName="active">
                                        Our recipe
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/contact-us" className="nav-link body-text-small"
                                             activeClassName="active">
                                        Contact us
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-2 col-12 text-center text-lg-start">
                            <p className="mb-2">
                                <b>Help</b>
                            </p>
                            <ul className="footer-menu">
                                <li>
                                    <NavLink to="/privacy" className="nav-link body-text-small"
                                             activeClassName="active">
                                        Privacy Policy
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/terms" className="nav-link body-text-small" activeClassName="active">
                                        Terms & Conditions
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/faq" className="nav-link body-text-small" activeClassName="active">
                                        FAQ
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-4 col-12 text-center text-lg-start">
                            <p className="mb-2">
                                <b>Join Our Community</b>
                            </p>
                            <ul className="footer-menu social-icon-menu">
                                <li>
                                    <a className="body-text-small" href="#">
                                        <i className="fi fi-brands-facebook"></i>
                                    </a>
                                </li>
                                <li>
                                    <a className="body-text-small" href="#">
                                        <i className="fi fi-brands-instagram"></i>
                                    </a>
                                </li>
                                <li>
                                    <a className="body-text-small" href="#">
                                        <i className="fi fi-brands-twitter"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright-bar background-primary py-2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-12 text-center text-lg-start">
                            <p className="text-white body-text-extra-small">
                                <b>© Edenmade.io</b> - All Rights Reserved.
                            </p>
                        </div>
                        <div className="col-lg-6 col-12 text-center text-lg-end">
                            <ul className="footer-menu copyright-menu">
                                <li>
                                    <a className="body-text-extra-small fw-semibold" href="#">
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a className="body-text-extra-small fw-semibold" href="#">
                                        Cookie Policy
                                    </a>
                                </li>
                                <li>
                                    <a className="body-text-extra-small fw-semibold" href="#">
                                        Terms & Conditions
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
