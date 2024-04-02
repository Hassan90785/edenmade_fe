import React, {useState} from "react";
import {useAuth} from "../auth_v2/authContext.jsx";
import {Link, useNavigate} from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState(""); // Initialize state with an empty string
    const [password, setPassword] = useState(""); // Initialize state with an empty string
    const {login} = useAuth();
    const navigate = useNavigate();
    const handleEmailChange = (event) => {
        setEmail(event.target.value); // Update email state when input value changes
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value); // Update password state when input value changes
    }

    const handleLogin = async () => {
        const resp = await login({email, password})
        if (resp) {
            navigate('/my-menu')
        }
    }

    return (
        <div className="bg-doodle py-md-5 py-3 d-flex justify-content-center align-items-center min-height-600">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-6">
                        <div className="row my-3 text-center">
                            <div className="col">
                                <h1 className=" aj-site-logo">
                                   LOGIN
                                </h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 col-12">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    className="form-control mb-3"
                                    value={email} // Bind input value to email state
                                    onChange={handleEmailChange} // Handle input change
                                    required
                                />
                            </div>
                            <div className="col-md-12 col-12">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    className="form-control mb-3"
                                    value={password} // Bind input value to password state
                                    onChange={handlePasswordChange} // Handle input change
                                    required
                                />
                            </div>
                            <div className="col-md-12">
                                <button
                                    className="btn btn-primary aj-button body-text-small fw-700 w-100 px-5"
                                    onClick={handleLogin}
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
