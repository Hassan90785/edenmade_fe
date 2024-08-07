import axios from "axios";
import config from "../auth_v2/config.js";
import {toast} from "react-toastify";

export const getCategories = async () => {
    try {
        // Make HTTP POST request to your backend for login
        const response = await axios.get(`${config.BaseUrl}/categories`);

        // Assuming the response contains user data upon successful login
        const {data} = response.data;
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
export const getActiveOrderInfo = async (req) => {
    try {
        // Make HTTP POST request to your backend for login
        const response = await axios.get(`${config.BaseUrl}/orders/activeOrder/`, { params: req });

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
export const contactUs = async (req) => {
    try {
        // Make HTTP POST request to your backend for login
        const response = await axios.post(`${config.BaseUrl}/auth/contact`, req);

        // Assuming the response contains user data upon successful login
        const {data} = response;
        return data;
    } catch (error) {
        toast.error("Sending Message Failed")
        // Handle login error, such as displaying error message
        console.error("Sending Message Failed:", error);
    }
};

export const getCategoriesWithRecipes = async () => {
    try {
        // Make HTTP POST request to your backend for login
        const response = await axios.get(`${config.BaseUrl}/categories/categorieswithrecipes`);

        // Assuming the response contains user data upon successful login
        const {data} = response.data;
        return data;
    } catch (error) {
        toast.error("Getting Categories Failed!")
        // Handle login error, such as displaying error message
        console.error("Categories failed:", error);
    }
};

export const getAllRecipes = async () => {
    try {
        // Make HTTP POST request to your backend for login
        const response = await axios.get(`${config.BaseUrl}/recipes`);

        // Assuming the response contains user data upon successful login
        return response.data;
    } catch (error) {
        toast.error("Getting All Recipes Failed!")
        // Handle login error, such as displaying error message
        console.error("Recipes failed:", error);
    }
};


export const getSpiceLevels = async () => {
    try {
        // Make HTTP POST request to your backend for login
        const response = await axios.get(`${config.BaseUrl}/spices`);

        // Assuming the response contains user data upon successful login
        const {data} = response.data;
        return data;
    } catch (error) {
        toast.error("Getting Spices Failed!")
        // Handle login error, such as displaying error message
        console.error("Spices failed:", error);
    }
};
export const getSnacks = async () => {
    try {
        // Make HTTP POST request to your backend for login
        const response = await axios.get(`${config.BaseUrl}/snacks/`);

        // Assuming the response contains user data upon successful login
        const {data} = response.data;
        return data;
    } catch (error) {
        toast.error("Getting Snacks Failed!")
        // Handle login error, such as displaying error message
        console.error("Snacks failed:", error);
    }
};

export const addNewSnacksMapping = async (req) => {
    try {
        // Make HTTP POST request to your backend for login
        const response = await axios.post(`${config.BaseUrl}/snacks/addSnacksMapping`, req);

        // Assuming the response contains user data upon successful login
        const {data} = response.data;
        return data;
    } catch (error) {
        toast.error("Getting addNewSnacksMapping Failed!")
        // Handle login error, such as displaying error message
        console.error("Snacks failed:", error);
    }
};


export const signup = async (req) => {
    try {
        // Make HTTP POST request to your backend for signup
        const response = await axios.post(`${config.BaseUrl}/auth/signup`, req);
        // Assuming the response contains user data upon successful signup
        const {data} = response.data;
        return data; // Return data in case of success
    } catch (error) {
        // Handle signup error, such as displaying error message
        toast.error("Signup  Failed!")
        console.error("signup failed:", error);
        throw error; // Rethrow the error for the caller to handle
    }
};
export const socialLogin = async (req) => {
    try {
        // Make HTTP POST request to your backend for signup
        const response = await axios.post(`${config.BaseUrl}/auth/social_login`, req);
        // Assuming the response contains user data upon successful signup
        const {data} = response.data;
        return data; // Return data in case of success
    } catch (error) {
        // Handle signup error, such as displaying error message
        toast.error("Sign in Failed!")
        console.error("sign in failed:", error);
        throw error; // Rethrow the error for the caller to handle
    }
};
export const placeOrder = async (req) => {
    try {
        // Make HTTP POST request to your backend for signup
        const response = await axios.post(`${config.BaseUrl}/orders/place-order`, req);
        // Assuming the response contains user data upon successful signup
        const {data} = response.data;
        return data; // Return data in case of success
    } catch (error) {
        // Handle signup error, such as displaying error message
        toast.error("Placing Order  Failed!")
        console.error("placeOrder failed:", error);
        throw error; // Rethrow the error for the caller to handle
    }
};
export const deleteOrder = async (req) => {
    try {
        // Make HTTP POST request to your backend for signup
        const response = await axios.post(`${config.BaseUrl}/orders/delete-order`, req);
        // Assuming the response contains user data upon successful signup
        const {data} = response.data;
        console.log('deleteOrder:', data);
        return data; // Return data in case of success
    } catch (error) {
        // Handle signup error, such as displaying error message
        toast.error("Order  Failed!")
        console.error("deleteOrder failed:", error);
        throw error; // Rethrow the error for the caller to handle
    }
};

export const getSnackOrder = async (req) => {
    try {
        // Make HTTP POST request to your backend for signup
        console.log('getSnackOrder: ', req)
        const response = await axios.get(`${config.BaseUrl}/snacks/getSnackOrder`,{ params: req });
        // Assuming the response contains user data upon successful signup
        const {data} = response.data;
        console.log('getSnackOrder: ', data);
        return data; // Return data in case of success
    } catch (error) {
        // Handle signup error, such as displaying error message
        toast.error("GetSnackOrder  Failed!")
        console.error("getSnackOrder failed:", error);
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
export const getPlanSettings = async (req) => {
    try {
        // Make HTTP POST request to your backend for signup
        const response = await axios.post(`${config.BaseUrl}/orders/getPlanSetting`, req);
        // Assuming the response contains user data upon successful signup
        const {data} = response.data;
        console.log('resp', data)
        return data; // Return data in case of success
    } catch (error) {
        // Handle signup error, such as displaying error message
        toast.error("Getting Plan Settings  Failed!")
        console.error("Getting Plan Settings :", error);
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
export const pause_subscription = async (req) => {
    try {
        // Make HTTP POST request to your backend for signup
        const response = await axios.post(`${config.BaseUrl}/stripe/pauseSubscription`, req);
        // Assuming the response contains user data upon successful signup
        const {data} = response;
        console.log('pauseSubscription:', data);
        return data; // Return data in case of success
    } catch (error) {
        // Handle signup error, such as displaying error message
        toast.error("Pausing subscription Failed!")
        throw error; // Rethrow the error for the caller to handle
    }
};
export const resume_subscription = async (req) => {
    try {
        // Make HTTP POST request to your backend for signup
        const response = await axios.post(`${config.BaseUrl}/stripe/resumeSubscription`, req);
        // Assuming the response contains user data upon successful signup
        const {data} = response;
        console.log('resumeSubscription:', data);
        return data; // Return data in case of success
    } catch (error) {
        // Handle signup error, such as displaying error message
        toast.error("Resuming subscription Failed!")
        throw error; // Rethrow the error for the caller to handle
    }
};
export const cancel_subscription = async (req) => {
    try {
        // Make HTTP POST request to your backend for signup
        const response = await axios.post(`${config.BaseUrl}/stripe/cancelSubscription`, req);
        // Assuming the response contains user data upon successful signup
        const {data} = response;
        console.log('cancelSubscription:', data);
        return data; // Return data in case of success
    } catch (error) {
        // Handle signup error, such as displaying error message
        toast.error("Cancelling subscription Failed!")
        throw error; // Rethrow the error for the caller to handle
    }
};
export const create_checkout_session = async (req) => {
    try {
        // Make HTTP POST request to your backend for signup
        const response = await axios.post(`${config.BaseUrl}/stripe/create_checkout_session`, req);
        // Assuming the response contains user data upon successful signup
        const {data} = response;
        console.log('create_checkout_session:', data);
        return data; // Return data in case of success
    } catch (error) {
        // Handle signup error, such as displaying error message
        toast.error("Stripe checkout generation Failed!")
        throw error; // Rethrow the error for the caller to handle
    }
};
export const create_checkout_session_v2 = async (req) => {
    try {
        // Make HTTP POST request to your backend for signup
        const response = await axios.post(`${config.BaseUrl}/stripe/create_checkout_session_v2`, req);
        // Assuming the response contains user data upon successful signup
        const {data} = response;
        console.log('create_checkout_session:', data);
        return data; // Return data in case of success
    } catch (error) {
        // Handle signup error, such as displaying error message
        toast.error("Stripe checkout generation Failed!")
        throw error; // Rethrow the error for the caller to handle
    }
};
export const trigger_manual_payment = async (req) => {
    try {
        // Make HTTP POST request to your backend for signup
        const response = await axios.post(`${config.BaseUrl}/stripe/trigger_manual_payment`, req);
        // Assuming the response contains user data upon successful signup
        const {data} = response;
        console.log('trigger_manual_payment:', data);
        return data; // Return data in case of success
    } catch (error) {
        // Handle signup error, such as displaying error message
        toast.error("Stripe trigger_manual_payment generation Failed!")
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

