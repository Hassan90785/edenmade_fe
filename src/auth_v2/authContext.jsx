// authContext.js

import  {createContext, useContext, useState} from "react";
import axios from "axios";
import config from "./config.js";
import {toast} from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const empty ={
        customer_id: null,
        username: null,
        email: "",
        password: "",
        is_google: 0,
        is_apple: 0,
        is_facebook: 0,
        otp: null,
        first_name: null,
        last_name: null,
        date_of_birth: null,
        gender: null,
        address: null,
        city: null,
        phone_number: null,
        state: null,
        country: null,
        postal_code: null
    };
    const [user, setUser] = useState(empty);

    const login = async (userData) => {
        try {
            // Make HTTP POST request to your backend for login
            const response = await axios.post(`${config.BaseUrl}/auth/login`, userData);

            // Assuming the response contains user data upon successful login
            const { data } = response.data;
            // Set the user in the authentication context
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data))
            toast.success("Login Successful")
            return data;
        } catch (error) {
            console.error("Login failed:", error);
            toast.error(error.response.data.message)
            // Handle login error, such as displaying error message
        }
    };

    const logout = () => {
        // Implement your logout logic here
        localStorage.removeItem('user')
        setUser(empty);
    };

    const setUserDetails = (user) => {
        // Implement your logout logic here
        console.log('Setting Up user: ', user)
        setUser(user);
    };

    return (
        <AuthContext.Provider value={{user, login, logout, setUserDetails}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
