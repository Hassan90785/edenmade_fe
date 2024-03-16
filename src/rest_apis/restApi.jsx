import axios from "axios";
import config from "../auth_v2/config.js";

export const getCategories = async () => {
    try {
        // Make HTTP POST request to your backend for login
        const response = await axios.get(`${config.BaseUrl}/categories`);

        // Assuming the response contains user data upon successful login
        const {data} = response.data;
        console.log('getCategories:', data)
        return data;
    } catch (error) {
        // Handle login error, such as displaying error message
        console.error("Categories failed:", error);
    }
};


export const getSpiceLevels = async () => {
    try {
        // Make HTTP POST request to your backend for login
        const response = await axios.post(`${config.BaseUrl}/categories`);

        // Assuming the response contains user data upon successful login
        const {data} = response.data;
        console.log('getCategories:', data)
        return data;
    } catch (error) {
        // Handle login error, such as displaying error message
        console.error("Categories failed:", error);
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

