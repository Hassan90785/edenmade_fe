import {useEffect, useState} from "react";
import ProductSummary from "../components/ProductSummary";
import {getCategories, getPeoplePerWeek, getPrices, getRecipePerWeek} from "../rest_apis/restApi.jsx";
import {toast} from "react-toastify";

export default function OrderFlow() {
    const [selectPlanFlow, setselectPlanFlow] = useState(true);
    const [registerFlow, setRegisterFlow] = useState(false);
    const [detailFlow, setDetailFlow] = useState(false);
    const [checkoutFlow, setCheckoutFlow] = useState(false);

    const recipePerWeekOptions = getRecipePerWeek();
    const [categories, setCategories] = useState([]);
    const peopleOptions = getPeoplePerWeek();
    const prices = getPrices();

    const [orderFlow, setOrderFlow] = useState({
        selectedPeople: "",
        selectedRecipePerWeek: "",
        selectedRecipes: [],
        totalPrice:0
    });
    // Function to update order flow properties
    const updateOrderFlow = (prop, value) => {
        setOrderFlow(prevState => ({
            ...prevState,
            [prop]: value
        }));
    };
    useEffect(() => {
        // Fetch categories when the component mounts
        fetchCategories();
    }, []);

    // Function to fetch categories
    const fetchCategories = async () => {
        try {
            const categoriesData = await getCategories();
            setCategories(categoriesData);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };


    const handleChange = (code, value) => {
        let isSelected;
        switch (code) {
            case 'week':
                updateOrderFlow('selectedRecipePerWeek', value);
                break;
            case 'ppl':
                updateOrderFlow('selectedPeople', value);
                break;
            case 'category':
                isSelected = orderFlow.selectedRecipes.includes(value);
                if (isSelected) {
                    updateOrderFlow('selectedRecipes', orderFlow.selectedRecipes.filter((recipe) => recipe !== value));

                } else {
                    updateOrderFlow('selectedRecipes', [...orderFlow.selectedRecipes, value]);
                }
                break;
        }
    };

    const updateTotalPrice = (totalPrice) => {
        setOrderFlow((prevOrderFlow) => ({
            ...prevOrderFlow,
            totalPrice,
        }));
    };
    const goToStep2 = () => {
        // Validate that all required fields are filled
        if (orderFlow.selectedRecipes.length === 0 || !orderFlow.selectedPeople || !orderFlow.selectedRecipePerWeek) {
            // If any required field is missing, show an error or handle it as needed
            toast.error("Please fill in all required fields");
            console.error("Please fill in all required fields");
            return;
        }
        console.log('Order Flow: ', orderFlow)
        // All required fields are filled, proceed to the next step
        setselectPlanFlow(false);
        setRegisterFlow(true);
    };
    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-12 order-progress-bar">
                    <div className="aj-drop-shadow background-white p-3 text-center">
                        <ul className="progress-bar-status p-0">
                            <li className="completed d-block d-md-inline-block mb-3 mb-md-0">
                                <i className="fi fi-sr-ticket-alt"></i>
                                <span>Select Plan</span>
                            </li>
                            <li className="status-divider d-none d-md-inline-block">
                                <hr/>
                            </li>
                            <li className="active d-block d-md-inline-block mb-3 mb-md-0">
                                <i className="fi fi-sr-user"></i>
                                <span>Register</span>
                            </li>
                            <li className="status-divider d-none d-md-inline-block">
                                <hr/>
                            </li>
                            <li className="d-block d-md-inline-block mb-3 mb-md-0">
                                <i className="fi fi-br-id-badge"></i>
                                <span>Details</span>
                            </li>
                            <li className="status-divider d-none d-md-inline-block">
                                <hr/>
                            </li>
                            <li className="d-block d-md-inline-block mb-3 mb-md-0">
                                <i className="fi fi-sr-credit-card"></i>
                                <span>Checkout</span>
                            </li>
                            <li className="status-divider d-none d-md-inline-block">
                                <hr/>
                            </li>
                            <li className="d-block d-md-inline-block mb-3 mb-md-0">
                                <i className="fi fi-sr-bowl-rice"></i>
                                <span>Select Meals</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="col-12 order-flow mt-4">
                    {/* SELECT PLAN */}
                    {selectPlanFlow && (
                        <div
                            id="selectPlanOrderFlow"
                            className="aj-drop-shadow background-white px-3 py-4 min-height-600"
                        >
                            <h1 className="text-center">Personalize Your Plan</h1>
                            <div className="row mt-5">
                                <div className="col-md-6 col-12 px-4 py-3 border-right-divider">
                                    <h2 className="text-center mb-2">
                                        1. What kind of recipes do you like?
                                    </h2>
                                    <p className="body-text-extra-small text-center">
                                        Please select from the options below. You can always change
                                        them later.
                                    </p>
                                    <form id="recipeSelection" className="aj-grid-container my-3">
                                        {categories.map((category) => (
                                            <div key={category.category_id} className="aj-grid-item">
                                                <input
                                                    type="checkbox"
                                                    id={category.category_id}
                                                    name={category.category_name}
                                                    value={category.category_name}
                                                    checked={orderFlow.selectedRecipes.includes(category.category_id)}
                                                    onChange={() => handleChange('category', category.category_id)}
                                                />
                                                <label
                                                    className="recipe-name btn btn-primary"
                                                    htmlFor={category.category_id}
                                                >
                                                    {category.category_name}
                                                </label>
                                            </div>))}

                                    </form>


                                    <p className="body-text-extra-small text-center">
                                        Win over taste buds of all ages with easy, delicious and
                                        crowd-pleasing meals.
                                    </p>
                                </div>
                                <div className="col-md-6 col-12 px-4 py-3 border-left-divider">
                                    <h2 className="text-center mb-2">2. Choose your plan size</h2>
                                    <p className="body-text-extra-small text-center">
                                        We&apos;ll use this as your default plan size, but you can
                                        customizeit from week to week.
                                    </p>
                                    <div
                                        className="plan-size plan-size-people d-flex align-items-center justify-content-between my-3">
                                        <p className="mb-0">Number of People</p>
                                        <div className="d-flex">
                                            {peopleOptions.map((option) => (<div key={option.id}>
                                                <input
                                                    type="radio"
                                                    id={option.id}
                                                    name="planPeople"
                                                    value={option.value}
                                                    checked={orderFlow.selectedPeople === option.value}
                                                    onChange={() => handleChange('ppl', option.value)}
                                                />
                                                <label
                                                    className="plan-size-label btn btn-primary w-auto px-4"
                                                    htmlFor={option.id}
                                                >
                                                    {option.label}
                                                </label>
                                            </div>))}
                                        </div>
                                    </div>

                                    <div
                                        className="plan-size plan-size-recipe d-flex align-items-center justify-content-between my-3">
                                        <p className="mb-0">Recipe per Week</p>
                                        <div className="d-flex">
                                            {recipePerWeekOptions.map((option) => (<div key={option.id}>
                                                <input
                                                    type="radio"
                                                    id={option.id}
                                                    name="recipePerWeek"
                                                    value={option.value}
                                                    checked={orderFlow.selectedRecipePerWeek === option.value}
                                                    onChange={() => handleChange('week', option.value)}
                                                />
                                                <label
                                                    className="plan-size-label btn btn-primary w-auto px-4"
                                                    htmlFor={option.id}
                                                >
                                                    {option.label}
                                                </label>
                                            </div>))}
                                        </div>
                                    </div>
                                    <ProductSummary  selectedPeople={orderFlow.selectedPeople}
                                                     selectedRecipePerWeek={orderFlow.selectedRecipePerWeek}
                                                     updateTotalPrice={updateTotalPrice}
                                                     selectedRecipes={orderFlow.selectedRecipes}/>
                                </div>
                            </div>
                            <div className="text-center mt-4">
                                <button
                                    className="btn btn-primary aj-button body-text-small fw-700"
                                    onClick={goToStep2}
                                >
                                    Select this Plan
                                </button>
                            </div>
                        </div>)}

                    {/* REGISTER */}
                    {registerFlow && (<div
                        id="registerOrderFlow"
                        className="aj-drop-shadow background-white px-md-5 px-3 py-4 min-height-600"
                    >
                        <h1 className="text-center">Register Your Account</h1>
                        <div className="row mt-5">
                            <div className="col-md-6 col-12 px-md-5 px-3 pt-3 pb-0">
                                <p className="body-text-extra-small mb-2">
                                    You&apos;ve Selected
                                </p>
                                <h2 className="">
                                    4 meals for 3 people per week which is 12 total servings
                                </h2>
                                <div className="text-end d-none d-md-block">
                                    <img src="/meals-image.png"/>
                                </div>
                            </div>
                            {" "}

                        </div>
                    </div>)}
                </div>
            </div>
        </div>);
}
