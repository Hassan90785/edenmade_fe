import React, {useEffect, useState} from "react";
import {getCategoriesWithRecipes, getSpiceLevels, updateOrderAPI} from "../rest_apis/restApi.jsx";
import {toast} from "react-toastify";
import RecipeCardChangeMeal from "../components/RecipeCardChangeMeal.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {renderFormattedDate} from "../components/RenderFormattedDate.jsx";

export default function ChangeMeal() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [itemSource, setItemSource] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [orderDetails, setOrderDetails] = useState({});
    const [selectedWeek, setSelectedWeek] = useState({});
    const [selectedOrder, setSelectedOrder] = useState({});
    const [spiceLevels, setSpiceLevels] = useState({});
    const location = useLocation();
    const params = location.state;
    const navigate = useNavigate();
    useEffect(() => {
        const completeOrder = params.orderDetails;
        const week = params.selectedWeek;
        console.log('completeOrder', completeOrder)
        console.log('week', week)
        const filteredOrder = completeOrder?.order_details?.find(order => order.week === week);
        console.log('filteredOrder', filteredOrder)
        setOrderDetails(completeOrder)
        setSelectedWeek(week)
        setSelectedOrder(filteredOrder)
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesData = await getCategoriesWithRecipes();
                const spices = await getSpiceLevels();
                setSpiceLevels(spices)
                // Append an additional category "All" containing all recipes
                const allRecipes = categoriesData.reduce((acc, category) => {
                    return acc.concat(category.recipes);
                }, []);
                setRecipes(allRecipes)
                categoriesData.unshift({
                    category_id: 'X',
                    category_name: "ALL",
                    recipes: allRecipes
                });
                setCategories(categoriesData);
                setSelectedCategoryHandler('X')
                console.log('categoriesData:', categoriesData)
            } catch (error) {
                console.error('Error fetching categories with recipes:', error);
                // Handle error if needed
            }
        };

        fetchData(); // Call the async function
    }, []);

    const setSelectedCategoryHandler = (category_id) => {
        setSelectedCategory(category_id)
        setItemSourceHandler(category_id);
    }
    const setItemSourceHandler = (category_id) => {
        const items = categories.filter(value => value.category_id === category_id);
        setItemSource(items);
    }
    const addRemoveRecipes = (updatedRecipe) => {
        console.log('updatedRecipe: ', updatedRecipe)
        const updatedItems = selectedOrder.items.slice(); // Make a shallow copy of items array
        const index = updatedItems.findIndex(item => item.recipe_id === updatedRecipe.recipe_id);

        if (index !== -1) {
            updatedItems.splice(index, 1); // Remove the recipe if it exists
        } else {
            updatedRecipe.mapping_id = null;
            updatedItems.push(updatedRecipe); // Add the recipe otherwise
        }
        let meal_size = selectedOrder.meals_per_week;
        if (selectedOrder.week !== 1) {
            meal_size = updatedItems.length;
        }
        // Update the selectedOrder with the modified items
        const updatedOrder = {...selectedOrder, items: updatedItems, meals_per_week: meal_size};

        console.log('selectedOrder.meals_per_week: ', selectedOrder.meals_per_week)
        console.log('updatedOrder: ', updatedItems.length)

        setSelectedOrder(updatedOrder);
    };
    const updateSpiceLevels = (updatedOrder) => {
        setSelectedOrder(updatedOrder);
    };
    const updateOrder = async () => {
        console.log('selectedWeek: ', selectedWeek)
        console.log('selectedOrder: ', selectedOrder.items.length)
        console.log('selectedOrder.meals_per_week: ', selectedOrder.meals_per_week)
        if (selectedWeek === 1 &&
            selectedOrder.meals_per_week !== selectedOrder.items.length) {
            toast.error('Can not modify the size of meal during first week.')
        } else {
            const updated = {...orderDetails};
            const index = orderDetails.order_details.findIndex(order => order.week === selectedWeek);
            if (index !== -1) {
                updated.order_details[index] = selectedOrder;
                const updateOrderResult = await updateOrderAPI(updated);
                console.log('updateOrderResult', updateOrderResult)
                if (updateOrderResult && updateOrderResult.status === 1) {
                    toast.success(`Your order has been updated successfully!:`);
                    setTimeout(() => {
                        navigate('/my-menu');
                    }, 3000)
                }
                setOrderDetails(updated)
            } else {
                toast.error(`Order not found for selectedWeek: ${selectedWeek}`);
            }
            console.log('orderDetails:', orderDetails)
            console.log('selectedOrder: ', selectedOrder)
            console.log('selectedWeek: ', selectedWeek)
        }
    }

    return (
        <div className="bg-doodle py-md-5 py-3">
            <div className="container my-md-5 my-3">
                <div className="row">
                    <div className="col-12 background-primary rounded rounded-pill py-3 px-5 bg-vegetables">
                        <p className="text-white body-text-extra-small mb-0">
                            Your Order Detail for
                        </p>
                        <h1 className="text-white my-2 fs-2">
                            {renderFormattedDate(selectedOrder?.delivery_date)}
                        </h1>
                        <p className="text-white body-text-extra-small mb-0 d-flex align-items-center">
                            {selectedOrder?.meals_per_week} meals
                            for {selectedOrder?.number_of_people} People
                            ({selectedOrder?.meals_per_week * selectedOrder?.number_of_people} Servings)
                        </p>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12">
                        <div className="row mb-3 ">
                            <div className="col-md-8 col-12">
                                <div className="d-flex align-items-center">
                                    <button className="btn btn-primary aj-button body-text-small fw-700 px-3 me-4">
                                        <i className="fi fi-rr-box-open-full fs-5 lh-1 align-middle"></i>
                                    </button>
                                    <div className="d-inline-block">
                                        <h1>Add a {selectedOrder?.meals_per_week + 1}th Meal</h1>
                                        <p className="fw-medium my-0">
                                            this week for just <span className="text-primary fw-bold">£3.99</span> per
                                            person
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-12 text-end my-auto">
                                <button className="btn btn-primary aj-button body-text-small fw-700 px-5"
                                        onClick={updateOrder}>
                                    Update Order
                                </button>
                            </div>
                        </div>
                        <div className="row mb-5 recipe-category-wrapper aj-drop-shadow">
                            <div className="col-12">
                                <ul className="recipe-categories pt-2">

                                    {categories.map(category => (
                                        <li
                                            key={category.category_id}
                                            className={selectedCategory === category.category_id ? "selected" : ""}
                                            onClick={() => setSelectedCategoryHandler(category.category_id)}
                                        >
                                            {category.category_name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="row">
                            {itemSource.map(category => (
                                <React.Fragment key={category.category_id}>
                                    {category.recipes.map(recipe => (
                                        <RecipeCardChangeMeal
                                            key={recipe.recipe_id}
                                            recipe={recipe}
                                            selectedOrder={selectedOrder}
                                            spiceLevels={spiceLevels}
                                            onUpdateOrder={updateSpiceLevels}
                                            onAddRemoveRecipe={addRemoveRecipes}
                                        />
                                    ))}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
