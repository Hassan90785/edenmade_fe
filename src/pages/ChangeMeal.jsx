import {useEffect, useState} from "react";
import RecipeCard from "../components/RecipeCard";
import {getCategoriesWithRecipes} from "../rest_apis/restApi.jsx";
import {toast} from "react-toastify";

export default function ChangeMeal() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [itemSource, setItemSource] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [orderDetials, setOrderDetails] = useState({});
    useEffect(() => {
        const activeWeek = localStorage.getItem('activeWeekOrderDetails');
        const activeWeekDetails = JSON.parse(activeWeek);
        setOrderDetails(activeWeekDetails)
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesData = await getCategoriesWithRecipes();
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
    const addRemoveRecipes = (id) => {
        const newItemObj = recipes.find(value => value.recipe_id === id);
        const existingOrder = { ...orderDetials }; // Make a copy of orderDetails
        const alreadyExistIndex = existingOrder.activeWeekOrderDetails.items.findIndex(value => value.recipe_id === id);

        if (alreadyExistIndex !== -1) {
            // If the item already exists, remove it from the items array
            existingOrder.activeWeekOrderDetails.items.splice(alreadyExistIndex, 1);
        } else {
            // If the item doesn't exist, add it to the items array
            existingOrder.activeWeekOrderDetails.items.push(newItemObj);
        }

        // Update the orderDetails state with the modified existingOrder
        setOrderDetails(existingOrder);
    }

    const updateOrder = () => {
        console.log('orderDetials:', orderDetials)
        console.log('week:', orderDetials.active_week)
        console.log('length:', orderDetials.activeWeekOrderDetails.items.length)
        console.log('meals_per_week:', orderDetials.activeWeekOrderDetails.meals_per_week)
        if (orderDetials.active_week === 1 && orderDetials.activeWeekOrderDetails.meals_per_week !== orderDetials.activeWeekOrderDetails.items.length) {
            toast.error('Can not modify the size of meal.')
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
                        <h1 className="text-white my-2 fs-2">Mon, Dec 04</h1>
                        <p className="text-white body-text-extra-small mb-0 d-flex align-items-center">
                            {orderDetials.activeWeekOrderDetails?.meals_per_week} meals
                            for {orderDetials.activeWeekOrderDetails?.number_of_people} People
                            ({orderDetials.activeWeekOrderDetails?.meals_per_week * orderDetials.activeWeekOrderDetails?.number_of_people} Servings)
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
                                        <h1>Add a {orderDetials.activeWeekOrderDetails?.meals_per_week + 1}th Meal</h1>
                                        <p className="fw-medium my-0">
                                            this week for just
                                            <span className="text-primary fw-bold">£3.99</span> per
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
                                <>
                                    {category.recipes.map(recipe => (
                                        <RecipeCard categoryName={recipe.category_name} recipeName={recipe.title}
                                                    addRemoveRecipes={addRemoveRecipes}
                                                    recipe_id={recipe.recipe_id}
                                                    active_order={orderDetials.activeWeekOrderDetails}/>
                                    ))}
                                </>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
