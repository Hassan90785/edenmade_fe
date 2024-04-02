// authContext.js

import  {createContext, useContext, useState} from "react";
import axios from "axios";
import config from "./config.js";
import {toast} from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const login = async (userData) => {
        try {
            // Make HTTP POST request to your backend for login
            const response = await axios.post(`${config.BaseUrl}/auth/login`, userData);

            // Assuming the response contains user data upon successful login
            const { data } = response.data;
            // Set the user in the authentication context
            setUser(data);
            console.log('data:',data)
            console.log('user:',user)
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
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
