import axios from "axios";
import config from "../auth_v2/config.js";
import {toast} from "react-toastify";

export const getCategories = async () => {
    try {
        // Make HTTP POST request to your backend for login
        const response = await axios.get(`${config.BaseUrl}/categories`);

        // Assuming the response contains user data upon successful login
        const {data} = response.data;
        console.log('getCategories:', data)
        return data;
    } catch (error) {
        toast.error("Getting Categories Failed!")
        // Handle login error, such as displaying error message
        console.error("Categories failed:", error);
    }
};

export const getOrderInfo = async (req) => {
    try {
        // Make HTTP POST request to your backend for login
        const response = await axios.post(`${config.BaseUrl}/orders/fetch-order`, req);

        // Assuming the response contains user data upon successful login
        const {data} = response.data;
        return data;
    } catch (error) {
        toast.error("Getting OrderInfo Failed!")
        // Handle login error, such as displaying error message
        console.error("OrderInfo failed:", error);
    }
};
export const updateOrderAPI = async (req) => {
    try {
        // Make HTTP POST request to your backend for login
        const response = await axios.post(`${config.BaseUrl}/orders/update-order`, req);

        // Assuming the response contains user data upon successful login
        const {data} = response;
        return data;
    } catch (error) {
        toast.error("Updating Order Failed!")
        // Handle login error, such as displaying error message
        console.error("Updating Order  failed:", error);
    }
};

export const getCategoriesWithRecipes = async () => {
    try {
        // Make HTTP POST request to your backend for login
        const response = await axios.get(`${config.BaseUrl}/categories/categorieswithrecipes`);

        // Assuming the response contains user data upon successful login
        const {data} = response.data;
        console.log('getCategoriesWithRecipes:', data)
        return data;
    } catch (error) {
        toast.error("Getting Categories Failed!")
        // Handle login error, such as displaying error message
        console.error("Categories failed:", error);
    }
};


export const getSpiceLevels = async () => {
    try {
        // Make HTTP POST request to your backend for login
        const response = await axios.get(`${config.BaseUrl}/spices`);

        // Assuming the response contains user data upon successful login
        const {data} = response.data;
        console.log('getSpiceLevels:', data)
        return data;
    } catch (error) {
        toast.error("Getting Spices Failed!")
        // Handle login error, such as displaying error message
        console.error("Spices failed:", error);
    }
};


export const signup = async (req) => {
    try {
        // Make HTTP POST request to your backend for signup
        const response = await axios.post(`${config.BaseUrl}/auth/signup`, req);
        // Assuming the response contains user data upon successful signup
        const {data} = response.data;
        console.log('signup:', data);
        return data; // Return data in case of success
    } catch (error) {
        // Handle signup error, such as displaying error message
        toast.error("Signup  Failed!")
        console.error("signup failed:", error);
        throw error; // Rethrow the error for the caller to handle
    }
};
export const placeOrder = async (req) => {
    try {
        // Make HTTP POST request to your backend for signup
        const response = await axios.post(`${config.BaseUrl}/orders/place-order`, req);
        // Assuming the response contains user data upon successful signup
        const {data} = response.data;
        console.log('placeOrder:', data);
        return data; // Return data in case of success
    } catch (error) {
        // Handle signup error, such as displaying error message
        toast.error("Placing Order  Failed!")
        console.error("placeOrder failed:", error);
        throw error; // Rethrow the error for the caller to handle
    }
};
export const getOrderDetailsByCustomer = async (req) => {
    try {
        // Make HTTP POST request to your backend for signup
        console.log('getOrderDetailsByCustomer: ', req)
        const response = await axios.get(`${config.BaseUrl}/orders/getOrderDetails`, req);
        // Assuming the response contains user data upon successful signup
        const {data} = response.data;
        console.log('getOrderDetailsByCustomer:', data);
        return data; // Return data in case of success
    } catch (error) {
        // Handle signup error, such as displaying error message
        toast.error("getOrderDetailsByCustomer  Failed!")
        console.error("getOrderDetailsByCustomer failed:", error);
        throw error; // Rethrow the error for the caller to handle
    }
};
export const updateCustomerDetails = async (req) => {
    try {
        // Make HTTP POST request to your backend for signup
        const response = await axios.post(`${config.BaseUrl}/auth/updateCustomerDetails`, req);
        // Assuming the response contains user data upon successful signup
        const {data} = response.data;
        return data; // Return data in case of success
    } catch (error) {
        // Handle signup error, such as displaying error message
        toast.error("Updating Customer Details  Failed!")
        console.error("signup failed:", error);
        throw error; // Rethrow the error for the caller to handle
    }
};
export const generate_stripe_subscription = async (req) => {
    try {
        // Make HTTP POST request to your backend for signup
        const response = await axios.post(`${config.BaseUrl}/stripe/create_subscription`, req);
        // Assuming the response contains user data upon successful signup
        const {data} = response;
        console.log('generate_stripe_subscription:', data);
        return data; // Return data in case of success
    } catch (error) {
        // Handle signup error, such as displaying error message
        toast.error("Stripe subscription generation Failed!")
        throw error; // Rethrow the error for the caller to handle
    }
};

export const getPeoplePerWeek = () => {
    return [
        {
            "id": "people2",
            "label": "2",
            "value": 2
        },
        {
            "id": "people3",
            "label": "3",
            "value": 3
        },
        {
            "id": "people4",
            "label": "4",
            "value": 4
        }
    ]
};


export const getRecipePerWeek = () => {
    return [
        {
            "id": "recipePerWeek2",
            "label": "2",
            "value": 2
        },
        {
            "id": "recipePerWeek3",
            "label": "3",
            "value": 3
        },
        {
            "id": "recipePerWeek4",
            "label": "4",
            "value": 4
        },
        {
            "id": "recipePerWeek5",
            "label": "5",
            "value": 5
        }
    ]
};


export const getPrices = () => {
    return [
        {
            "id": "boxPrice",
            "label": "Box Price",
            "value": 47.99
        },
        {
            "id": "pricePerServing",
            "label": "Price Per Serving",
            "value": 4.00
        }
    ]
};

