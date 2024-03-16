import {useEffect, useState} from "react";
import ProductSummary from "../components/ProductSummary";
import {
    getCategories,
    getPeoplePerWeek,
    getPrices,
    getRecipePerWeek,
    signup,
    updateCustomerDetails
} from "../rest_apis/restApi.jsx";
import {toast} from "react-toastify";
import {loadStripe} from "@stripe/stripe-js";

export default function OrderFlow() {
    const [selectPlanFlow, setselectPlanFlow] = useState(true);
    const [registerFlow, setRegisterFlow] = useState(false);
    const [detailFlow, setDetailFlow] = useState(false);
    const [checkoutFlow, setCheckoutFlow] = useState(false);
    const [currentState, setCurrentState] = useState({
        step1: 1,
        step2: 0,
        step3: 0,
        step4: 0,
    });
    const recipePerWeekOptions = getRecipePerWeek();
    const [categories, setCategories] = useState([]);
    const peopleOptions = getPeoplePerWeek();
    const prices = getPrices();
    const [user, setUser] = useState({
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
    });

    const [orderFlow, setOrderFlow] = useState({
        selectedPeople: "",
        selectedRecipePerWeek: "",
        selectedRecipes: [],
        totalPrice: 0
    });
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    });

    const updateCurrentState = (step) => {
        setCurrentState({
            ...currentState,
            step1: step === 1 ? 1 : 0,
            step2: step === 2 ? 1 : 0,
            step3: step === 3 ? 1 : 0,
            step4: step === 4 ? 1 : 0,
        });
    };
    // Function to update order flow properties
    const updateOrderFlow = (prop, value) => {
        setOrderFlow(prevState => ({
            ...prevState,
            [prop]: value
        }));
    };
    const updateUserDetails = (prop, value) => {
        setUser(prevState => ({
            ...prevState,
            [prop]: value
        }));
    };
    // Function to update order flow properties
    const updateUserLogin = (prop, value) => {
        setUserLogin(prevState => ({
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
    const goToStep4 = async () => {
        // Validate that all required fields are filled
        if (!user.first_name || !user.last_name || !user.phone_number || !user.address) {
            toast.error("Please fill in all required fields");
            console.error("Please fill in all required fields");
        } else {
            const data = await updateCustomerDetails(user);
            console.log('Customer Updated:', data);
            toast.success("Customer details updated Successfully");
            setDetailFlow(false);
            setCheckoutFlow(true);
        }

    };
    const goToStep3 = async () => {
        // Validate that all required fields are filled
        if (!userLogin.email || !userLogin.password) {
            // If any required field is missing, show an error or handle it as needed
            toast.error("Please fill in all required fields");
            console.error("Please fill in all required fields");
        } else {
            try {
                const data = await signup(userLogin);
                console.log('SignUp Success:', data);
                toast.success("SignUp User Successfully");
                setUser(data);
                setRegisterFlow(false);
                setDetailFlow(true);
            } catch (error) {
                console.error('Error during sign-up:', error);
            }
        }
    };

    const makePayment = async () => {
        const stripe = await loadStripe('pk_test_51Os7kqANqKE86m4zdS4G0wU1OkKxGjgcdj8601Ezm9ugHnAV2IJ3ZpUn4CSqdmIMTqSBKJOzvqLvYxcix6r6293900u66JYNI9');
        const {error} = await stripe.redirectToCheckout({
            mode: 'payment',
            lineItems: [
                {price: 'price_1Osk9vANqKE86m4z7yQ8SRj1', quantity: 1}, // Replace with your actual price ID
            ],
            successUrl: `${window.location.origin}/success`,
            cancelUrl: `${window.location.origin}/cancel`,
        });

        if (error) {
            console.error('Error redirecting to checkout:', error);
        }
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
                                    <ProductSummary selectedPeople={orderFlow.selectedPeople}
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
                    {registerFlow && (
                        <div
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
                                        {orderFlow.selectedRecipePerWeek} meals for {orderFlow.selectedPeople} people
                                        per week which
                                        is {orderFlow.selectedRecipePerWeek * orderFlow.selectedPeople} total servings
                                    </h2>
                                    <div className="text-end d-none d-md-block">
                                        <img src="/meals-image.png"/>
                                    </div>
                                </div>
                                {" "}
                                <div className="col-md-6 col-12 px-md-5 px-3 pt-3 pb-0">
                                    <input
                                        required
                                        type="email"
                                        id="regEmail"
                                        name="email"
                                        placeholder="Your Email Address"
                                        className="form-control mb-3"
                                        value={userLogin.email} // Bind the value to the state
                                        onChange={(e) => updateUserLogin('email', e.target.value)} // Handle input changes
                                    />
                                    <input
                                        required
                                        type="password"
                                        id="regPass"
                                        name="password"
                                        placeholder="Password"
                                        className="form-control mb-3"
                                        value={userLogin.password} // Bind the value to the state
                                        onChange={(e) => updateUserLogin('password', e.target.value)} // Handle input changes
                                    />
                                    <div className="form-check mb-3">
                                        {/* Other form elements... */}
                                    </div>

                                    <button
                                        className="w-100 btn btn-primary aj-button body-text-small fw-700"
                                        onClick={goToStep3}
                                    >
                                        Continue
                                    </button>
                                </div>
                                <div className="col-12 px-3 py-3 my-0 py-md-0">
                                    <div className="text-divider body-text-extra-small">OR</div>
                                </div>
                                <div className="col-12 px-md-5 px-3 py-3">
                                    <div className="row">
                                        <div className="col-12 col-md-4 mb-2">
                                            <button
                                                className="w-100 btn btn-primary aj-button google-button fw-700 px-2 lh-1"
                                                // onClick={userSignInWithGoogle}
                                            >
                                                <i className="fi fi-brands-google fs-6 me-2 align-middle lh-1"></i>
                                                Continue with Google
                                            </button>
                                        </div>
                                        <div className="col-12 col-md-4 mb-2">
                                            <button
                                                className="w-100 btn btn-primary aj-button apple-button fw-700 px-2 lh-1">
                                                <i className="fi fi-brands-apple fs-6 me-2 align-middle lh-1"></i>
                                                Continue with Apple
                                            </button>
                                        </div>
                                        <div className="col-12 col-md-4 mb-2">
                                            <button
                                                className="w-100 btn btn-primary aj-button facebook-button fw-700 px-2 lh-1"
                                                // onClick={userSignInWithFacebook}
                                            >
                                                <i className="fi fi-brands-facebook fs-6 me-2 align-middle lh-1"></i>
                                                Continue with Facebook
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 px-3 py-3">
                                    <div className="row">
                                        <div className="col-12 col-md-4 text-center px-3 mt-3">
                                            <i className="fi fi-sr-heart fs-4 text-primary"></i>
                                            <p className="body-text-small fw-medium mb-1">
                                                Something for everyone
                                            </p>
                                            <p className="body-text-extra-small mb-0">
                                                Set dietary preferences then just sit back and let us do
                                                the hard yards as we deliver everything you&apos;ll need
                                                to cook delicious dinners right to your door.
                                            </p>
                                        </div>
                                        <div className="col-12 col-md-4 text-center px-3 mt-3">
                                            <i className="fi fi-sr-restaurant fs-4 text-primary"></i>
                                            <p className="body-text-small fw-medium mb-1">
                                                Near endless variety
                                            </p>
                                            <p className="body-text-extra-small mb-0">
                                                Each week, our chefs curate 20 deliciously simple
                                                recipes featuring a variety of ingredients and flavors.
                                            </p>
                                        </div>
                                        <div className="col-12 col-md-4 text-center px-3 mt-3">
                                            <i className="fi fi-ss-soup fs-4 text-primary"></i>
                                            <p className="body-text-small fw-medium mb-1">
                                                Little effort, big reward
                                            </p>
                                            <p className="body-text-extra-small mb-0">
                                                All you need to do is follow our step-by-step recipe
                                                cards and you&apos;ll be eating picture perfect dinners
                                                that&apos;ll impress everyone every night.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mt-4"></div>
                        </div>
                    )}
                    {/* Details */}
                    {detailFlow && (
                        <div
                            id="detailOrderFlow"
                            className="aj-drop-shadow background-white px-md-5 px-3 py-4 min-height-600"
                        >
                            <h1 className="text-center">Let&apos;s Save Your Details</h1>
                            <div className="row mt-5">
                                <div className="col-12 px-md-5 px-3 my-5">
                                    <div className="row">
                                        <div className="col-md-6 col-12">
                                            <input
                                                type="text"
                                                id="deatilFirstName"
                                                name="first_name"
                                                placeholder="First Name*"
                                                className="form-control mb-3"
                                                required
                                                onChange={(e) =>
                                                    updateUserDetails("first_name", e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <input
                                                type="text"
                                                id="deatilLastName"
                                                name="last_name"
                                                placeholder="Last Name*"
                                                className="form-control mb-3"
                                                required
                                                onChange={(e) =>
                                                    updateUserDetails("last_name", e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <input
                                                type="tel"
                                                id="deatilPhone"
                                                name="phone_number"
                                                placeholder="Phone Number"
                                                className="form-control mb-3"
                                                onChange={(e) =>
                                                    updateUserDetails("phone_number", e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <input
                                                type="text"
                                                id="deatilAddress"
                                                name="address"
                                                placeholder="Address"
                                                className="form-control mb-3"
                                                onChange={(e) =>
                                                    updateUserDetails("address", e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <input
                                                type="text"
                                                id="deatilCity"
                                                name="city"
                                                placeholder="City"
                                                className="form-control mb-3"
                                                onChange={(e) =>
                                                    updateUserDetails("city", e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <input
                                                type="text"
                                                id="deatilZip"
                                                name="postal_code"
                                                placeholder="Postal Code"
                                                className="form-control mb-3"
                                                onChange={(e) =>
                                                    updateUserDetails("postal_code", e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="col-md-6 col-12 mx-auto mt-3">
                                            <button
                                                className="w-100 btn btn-primary aj-button body-text-small fw-700"
                                                onClick={goToStep4}
                                            >
                                                Continue
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 px-md-5 px-3">
                                    <ProductSummary selectedPeople={orderFlow.selectedPeople}
                                                    selectedRecipePerWeek={orderFlow.selectedRecipePerWeek}
                                                    updateTotalPrice={updateTotalPrice}
                                                    selectedRecipes={orderFlow.selectedRecipes}/>
                                </div>
                            </div>
                        </div>
                    )}


                    {/* Checkout */}
                    {checkoutFlow && (
                        <div
                            id="checkoutOrderFlow"
                            className="aj-drop-shadow background-white px-md-5 px-3 py-4 min-height-600"
                        >
                            <h1 className="text-center">Payment Details</h1>
                            <div className="row mt-5">
                                <div className="col-md-6 col-12 px-md-5 px-3 pt-3 pb-0">

                                    <button
                                        onClick={makePayment}
                                        className="w-100 btn btn-primary aj-button body-text-small fw-700 background-secondary border-0">
                                        <i className="fi fi-brands-paypal fs-6 me-2 align-middle lh-1"></i>{" "}
                                        Continue with Stripe
                                    </button>
                                </div>
                                <div className="col-md-6 col-12 px-md-5 px-3 pt-3 pb-0">
                                    <ProductSummary selectedPeople={orderFlow.selectedPeople}
                                                    selectedRecipePerWeek={orderFlow.selectedRecipePerWeek}
                                                    updateTotalPrice={updateTotalPrice}
                                                    selectedRecipes={orderFlow.selectedRecipes}/>
                                </div>
                                <div className="col-12 px-3 py-3 mt-0 mt-md-4">
                                    <div className="row">
                                        <div className="col-12 col-md-4 text-center px-3 mt-3">
                                            <i className="fi fi-sr-sack-dollar fs-4 text-primary"></i>
                                            <p className="body-text-small fw-medium mb-1">
                                                Save money
                                            </p>
                                            <p className="body-text-extra-small mb-0">
                                                Spend less on dinner every week.
                                            </p>
                                        </div>
                                        <div className="col-12 col-md-4 text-center px-3 mt-3">
                                            <i className="fi fi-sr-surprise fs-4 text-primary"></i>
                                            <p className="body-text-small fw-medium mb-1">
                                                No surprises
                                            </p>
                                            <p className="body-text-extra-small mb-0">
                                                Pause or skip to fit your schedule
                                            </p>
                                        </div>
                                        <div className="col-12 col-md-4 text-center px-3 mt-3">
                                            <i className="fi fi-br-calendar-xmark fs-4 text-primary"></i>
                                            <p className="body-text-small fw-medium mb-1">
                                                No commitment
                                            </p>
                                            <p className="body-text-extra-small mb-0">
                                                Pause or cancel anytime
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>);
}
