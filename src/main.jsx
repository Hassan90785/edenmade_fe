import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Footer from "./components/Footer";
import Header from "./components/Header";
import {AuthProvider} from "./auth_v2/authContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            {" "}
            <App/>
        </AuthProvider>
    </React.StrictMode>
);
