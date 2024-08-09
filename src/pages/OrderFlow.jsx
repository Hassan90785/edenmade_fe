import React, {useEffect, useState} from "react";
import ProductSummary from "../components/ProductSummary";
import {
    deleteOrder,
    generate_stripe_subscription,
    getCategories,
    getPeoplePerWeek,
    getPrices,
    getRecipePerWeek,
    placeOrder,
    signup,
    socialLogin,
    updateCustomerDetails
} from "../rest_apis/restApi.jsx";
import {toast} from "react-toastify";
import {useLocation, useNavigate} from "react-router-dom";
import {loadStripe} from "@stripe/stripe-js";
import {ValidatedInput} from "../components/ValidateInput.jsx";
import {useGoogleLogin} from "@react-oauth/google";
import FacebookLogin from 'react-facebook-login';
import {useAuth} from "../auth_v2/authContext.jsx";

export default function OrderFlow() {
    const navigate = useNavigate();
    const [currentState, setCurrentState] = useState(1);
    const [highestStateReached, setHighestStateReached] = useState(1);
    const recipePerWeekOptions = getRecipePerWeek();
    const [categories, setCategories] = useState([]);
    const peopleOptions = getPeoplePerWeek();
    const prices = getPrices();
    const [message, setMessage] = useState('');
    const {user, setUserDetails} = useAuth();
    const [orderDetails, setOrderDetails] = useState(null);
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
    const location = useLocation();
    const [errors, setErrors] = useState({email: '', password: ''});
    const states = [
        {id: 1, icon: 'fi fi-sr-ticket-alt', label: 'Select Plan'},
        {id: 2, icon: 'fi fi-sr-user', label: 'Register'},
        {id: 3, icon: 'fi fi-br-id-badge', label: 'Details'},
        {id: 4, icon: 'fi fi-sr-credit-card', label: 'Checkout'},
        {id: 5, icon: 'fi fi-sr-bowl-rice', label: 'Select Meals'}
    ];


    useEffect(() => {
        // Define an async function inside useEffect to handle async operations
        const handleError = async () => {
            // Check URL for error parameter
            const isError = location.search.includes('error');
            console.log('Error::: ', isError);

            if (isError) {
                // Restore state from localStorage
                const savedOrderFlow = localStorage.getItem('orderFlow');
                const savedCurrentState = localStorage.getItem('currentState');
                const savedUserState = localStorage.getItem('user');
                const savedOrderId = localStorage.getItem('order_id');

                if (savedOrderFlow) {
                    setOrderFlow(JSON.parse(savedOrderFlow));
                }

                if (savedCurrentState) {
                    setCurrentState(parseInt(savedCurrentState, 10));
                }
                if (savedUserState) {
                    setUserDetails(JSON.parse(savedUserState));
                }

                if (savedOrderId) {
                    console.log('savedOrderId::: ', savedOrderId);
                    try {
                        // Assuming deleteOrder is an async function that you have defined
                        await deleteOrder({ order_id: Number(savedOrderId) });
                        console.log('Order deleted successfully');
                    } catch (error) {
                        console.error('Error deleting order:', error);
                    }
                }
            }
        };

        handleError();
    }, []);



    const updateState = (newState) => {
        setCurrentState(newState);
        if (newState > highestStateReached) {
            setHighestStateReached(newState);
        }
    };
// Function to update order flow properties
    const updateOrderFlow = (prop, value) => {
        setOrderFlow(prevState => ({
            ...prevState,
            [prop]: value
        }));
    };
    const updateUserDetails = (prop, value) => {
        const updatedUser = {...user, [prop]: value};
        // Update user details using setUserDetails function
        setUserDetails(updatedUser);
    };
// Function to update order flow properties
    const updateUserLogin = (prop, value) => {
        setUserLogin(prevState => ({
            ...prevState,
            [prop]: value
        }));
    };
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
        return passwordRegex.test(password);
    };
    const handleEmailChange = (e) => {
        const email = e.target.value;
        updateUserLogin('email', email);
        const validate = validateEmail(email);
        if (!validate) {
            setErrors(prevErrors => ({
                ...prevErrors,
                email: 'Invalid email format'
            }));
        } else {
            setErrors(prevErrors => ({
                ...prevErrors,
                email: ''
            }));
        }
    };

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        updateUserLogin('password', password);
        const validate = validatePassword(password);
        if (!validate) {
            setErrors(prevErrors => ({
                ...prevErrors,
                password: 'Password must be at least 8 characters long and include at least one uppercase letter'
            }));
        } else {
            setErrors(prevErrors => ({
                ...prevErrors,
                password: ''
            }));
        }
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
        if (user && !user.customer_id) {
            updateState(2);
        } else {
            toast.success("User already signed up: " + user.first_name + ' ' + user.last_name);
            updateState(3);
        }
        // All required fields are filled, proceed to the next step
    };
    const goToStep4 = async (indicator = true) => {
        // Validate that all required fields are filled
        if (!user.first_name || !user.last_name || !user.phone_number || !user.address) {
            toast.error("Please fill in all required fields");
            console.error("Please fill in all required fields");
        } else {
            if (indicator) {
                const data = await updateCustomerDetails(user);
                toast.success("Customer details updated Successfully");
            }
            updateState(4);

        }

    };
    const login = useGoogleLogin({
        onSuccess: async tokenResponse => {
            try {
                const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`
                    }
                });

                if (!userInfoResponse.ok) {
                    throw new Error('Failed to fetch user info from Google.');
                }

                const userInfo = await userInfoResponse.json();
                const email = userInfo.email;
                // const indicator = getIndicator(); // Replace this with your logic to get the indicator

                if (email) {
                    await makeSocialLoginCall(email, 'G')
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        },
    });
    const makeSocialLoginCall = async (email, indicator) => {
        const resp = await socialLogin({email, indicator});
        toast.success("Google SignIn Successfully");
        setUserDetails(resp);

        setCurrentState(3)
    }
    const FacebookSignIn = () => {
        const responseFacebook = (response) => {
            // Handle the successful authentication response
        };

        const onFailure = (error) => {
            console.error(error);
            // Handle failure
        };
    }
    const goToStep3 = async (indicator = true) => {
        // Validate that all required fields are filled
        if (!userLogin.email || !userLogin.password) {
            // If any required field is missing, show an error or handle it as needed
            toast.error("Please fill in all required fields");
            console.error("Please fill in all required fields");
        } else {
            if (indicator) {
                try {
                    const data = await signup(userLogin);
                    toast.success("SignUp User Successfully");
                    setUserDetails(data);

                    updateState(3);

                } catch (error) {
                    console.error('Error during sign-up:', error);
                }
            } else {
                updateState(3);

            }
        }
    };

    const makePayment = async () => {
        const payload = {};
        payload['amount_paid'] = orderFlow.totalPrice
        payload['customer_id'] = user.customer_id
        payload['active_week'] = 1
        payload['order_type'] = 'S'
        payload['meals_per_week'] = orderFlow.selectedRecipePerWeek
        payload['selected_recipes'] = orderFlow.selectedRecipes.join(',')
        payload['number_of_people'] = orderFlow.selectedPeople
        const order_resp = await placeOrder(payload)
        if (order_resp) {
            localStorage.setItem('order_id', order_resp.order_id)
            proccedToStripe(order_resp.order_id)

        }
    };
    const proccedToStripe = async (order_id) => {
        const stripe = await loadStripe('pk_test_51Os7kqANqKE86m4zdS4G0wU1OkKxGjgcdj8601Ezm9ugHnAV2IJ3ZpUn4CSqdmIMTqSBKJOzvqLvYxcix6r6293900u66JYNI9');
        savingData();
        const {priceId, productId} = await generate_stripe_subscription({
            productName: 'edenmade_' + order_id,
            price: orderFlow.totalPrice.toFixed(2)
        })
        const {error} = await stripe.redirectToCheckout({
            mode: 'subscription',
            lineItems: [{
                price: priceId, // Replace with your Price ID
                quantity: 1,
            }],
            customerEmail: user.email,
            successUrl: `${window.location.origin}/edenmade/?success`,
            cancelUrl: `${window.location.origin}/edenmade/order-flow?error`,


        });

        if (error) {
            console.error('Error redirecting to checkout:', error);
        }
    };
    const savingData = () => {
        localStorage.setItem('currentState', JSON.stringify(currentState));
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('orderFlow', JSON.stringify(orderFlow));
        const keys = Object.keys(localStorage);
    }

    const validateState = (state) => {
        if (state > currentState) {
            // Handle validation when trying to go to a future state
            if (state === 2) {
                goToStep2();
            } else if (state === 3) {
                goToStep3(false);
            } else if (state === 4) {
                goToStep4(false);
            }
        } else {
            // Allow going back to a completed state
            if (state === 2) {
                goToStep2();
            } else {
                setCurrentState(state);
            }
        }
    };

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-12 order-progress-bar">
                    <div className="aj-drop-shadow background-white p-3 text-center">
                        <ul className="progress-bar-status p-0">
                            {states.map((state, index) => {
                                const isCompleted = state.id <= highestStateReached;
                                const isActive = state.id === currentState;

                                return (
                                    <React.Fragment key={state.id}>
                                        <li
                                            className={`${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''} d-block d-md-inline-block mb-3 mb-md-0 cursor-pointer`}
                                            onClick={() => isCompleted ? validateState(state.id) : null}
                                        >
                                            <i className={state.icon}></i>
                                            <span>{state.label}</span>
                                        </li>
                                        {index < states.length - 1 && (
                                            <li className="status-divider d-none d-md-inline-block">
                                                <hr/>
                                            </li>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                <div className="col-12 order-flow mt-4">
                    {/* SELECT PLAN */}
                    {currentState === 1 && (
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
                                        {categories && categories.map((category) => (
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
                                            {peopleOptions && peopleOptions.map((option) => (<div key={option.id}>
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
                                            {recipePerWeekOptions && recipePerWeekOptions.map((option) => (
                                                <div key={option.id}>
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
                    {currentState === 2 && (
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
                                        <img src="meals-image.png"/>
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
                                        onChange={handleEmailChange}/>
                                    <input
                                        required
                                        type="password"
                                        id="regPass"
                                        name="password"
                                        placeholder="Password"
                                        className="form-control mb-3"
                                        value={userLogin.password} // Bind the value to the state
                                        onChange={handlePasswordChange}
                                    />
                                    {errors.email && <div className={'form-error'}>{errors.email}</div>}
                                    {errors.password && <div className={'form-error'}>{errors.password}</div>}

                                    <div className="form-check mb-3">
                                        {/* Other form elements... */}
                                    </div>

                                    <button
                                        className="w-100 btn btn-primary aj-button body-text-small fw-700"
                                        disabled={errors.email || errors.password}
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
                                                onClick={login}
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
                                            <FacebookLogin
                                                appId="981357549998663"
                                                autoLoad={false}
                                                fields="name,email,picture"
                                                callback={FacebookSignIn}
                                                cssClass="w-100 btn btn-primary aj-button facebook-button py-2 fw-700 px-2 lh-1"
                                                icon="fi fi-brands-facebook px-2"
                                                render={renderProps => (
                                                    <button onClick={renderProps.onClick}>
                                                        Continue with Facebook
                                                    </button>)}
                                            />
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
                    {currentState === 3 && (
                        <div
                            id="detailOrderFlow"
                            className="aj-drop-shadow background-white px-md-5 px-3 py-4 min-height-600"
                        >
                            <h1 className="text-center">Let&apos;s Save Your Details</h1>
                            <div className="row mt-5">
                                <div className="col-12 px-md-5 px-3 my-5">
                                    <div className="row">
                                        <div className="col-md-6 col-12">
                                            <ValidatedInput
                                                type="text"
                                                id="deatilFirstName"
                                                name="first_name"
                                                placeholder="First Name*"
                                                value={user?.first_name}
                                                inputType={'s'}
                                                onChange={(value) => updateUserDetails("first_name", value)}
                                            />

                                        </div>
                                        <div className="col-md-6 col-12">
                                            <ValidatedInput
                                                type="text"
                                                id="deatilLastName"
                                                name="last_name"
                                                placeholder="Last Name*"
                                                value={user?.last_name}
                                                inputType={'s'}
                                                onChange={(value) => updateUserDetails("last_name", value)}
                                            />

                                        </div>
                                        <div className="col-md-6 col-12">
                                            <ValidatedInput
                                                type="text"
                                                id="deatilPhone"
                                                name="phone_number"
                                                placeholder="Phone Number"
                                                value={user?.phone_number}
                                                inputType={'n'}
                                                onChange={(value) => updateUserDetails("phone_number", value)}
                                            />

                                        </div>
                                        <div className="col-md-6 col-12">

                                            <ValidatedInput
                                                type="text"
                                                id="deatilAddress"
                                                name="address"
                                                placeholder="Address"
                                                value={user?.address}
                                                inputType={'e'}
                                                onChange={(value) => updateUserDetails("address", value)}
                                            />
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <ValidatedInput
                                                type="text"
                                                id="deatilCity"
                                                name="city"
                                                placeholder="City"
                                                value={user?.city}
                                                inputType={'s'}
                                                onChange={(value) => updateUserDetails("city", value)}
                                            />
                                        </div>
                                        <div className="col-md-6 col-12">
                                            <ValidatedInput
                                                type="text"
                                                id="deatilZip"
                                                name="postal_code"
                                                placeholder="Postal Code"
                                                value={user?.postal_code}
                                                inputType={'b'}
                                                onChange={(value) => updateUserDetails("postal_code", value)}
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
                    {currentState === 4 && (
                        <div
                            id="checkoutOrderFlow"
                            className="aj-drop-shadow background-white px-md-5 px-3 py-4 min-height-600"
                        >
                            <h1 className="text-center">Payment Details</h1>
                            <div className="row mt-5">
                                <div
                                    className="col-md-6 col-12 d-flex justify-content-center align-items-center px-md-5 px-3 pt-3 pb-0">
                                    <button
                                        onClick={makePayment}
                                        className="btn btn-primary aj-button body-text-small fw-700 background-secondary border-0">
                                        <i className="fi fi-brands-paypal fs-6 me-2 align-middle lh-1"></i> Continue
                                        with Stripe
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
