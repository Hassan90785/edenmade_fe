import ProductSummary from "../components/ProductSummary";
import RecipeCard from "../components/RecipeCard";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import AddonCard from "../components/AddonCard.jsx";
import {
    addNewSnacksMapping,
    create_checkout_session_v2,
    getActiveOrderInfo,
    getSnackOrder,
    getSnacks
} from "../rest_apis/restApi.jsx";
import {loadStripe} from "@stripe/stripe-js";
import {useAuth} from "../auth_v2/authContext.jsx";
import SnackSummary from "../components/SnackSummary.jsx";
import {toast} from "react-toastify";

export default function Cart() {
    const navigate = useNavigate();
    const {user} = useAuth(); // Access login function from auth context
    const [orderDetails, setOrderDetails] = useState({});
    const [snacks, setSnacks] = useState([]);
    const [snacksOrder, setSnacksOrder] = useState({
        order_id: null,
        week: null,
        snacks: []
    });
    const [showAddon, setShowAddon] = useState(false);
    const [cartUpdated, setCartUpdated] = useState(false);
    const handleButtonClickMyMenu = () => {
        navigate("/change-meal");
    };
    useEffect(() => {
        updateSnacksOrderDetails('order_id', orderDetails.order_id)
        updateSnacksOrderDetails('week', orderDetails.active_week)
    }, [orderDetails]);
    useEffect(() => {
        async function fetchActiveOrder() {
            try {
                console.log('----------activeOrder--------')
                console.log('user:::', user)
                let userStr = localStorage.getItem('user')
                let userJSON = null;
                if (userStr) {
                    userJSON = JSON.parse(userStr)
                }
                if (userJSON && userJSON.customer_id) {
                    const activeOrder = await getActiveOrderInfo({customer_id: userJSON.customer_id})
                    console.log('activeOrder', activeOrder)
                    setOrderDetails(activeOrder)
                }
            } catch (error) {
                console.error("Error fetching getAllSnacks:", error);
            }
        }

        fetchActiveOrder();
    }, []);
    useEffect(() => {
        async function fetchData() {
            try {
                const allSnacks = await getSnacks();
                setSnacks(allSnacks);
            } catch (error) {
                console.error("Error fetching getAllSnacks:", error);
            }
        }

        fetchData();
    }, []);
    useEffect(() => {
        async function fetchData() {
            try {
                const getSnackOrderDetails = await getSnackOrder({
                    active_week: orderDetails.active_week,
                    order_id: orderDetails.order_id
                });
                console.log('getSnackOrder: ', getSnackOrderDetails)
            } catch (error) {
                console.error("Error fetching getSnackOrder:", error);
            }
        }

        fetchData();
    }, []);
    const updateSnacksOrderDetails = (prop, value) => {
        setSnacksOrder(prevState => ({
            ...prevState,
            [prop]: value
        }));
    };
    const updateTotalPrice = () => {

    }
    const makeSnackOrder = async () => {
        if (cartUpdated) {
            console.log('snackOrder', snacksOrder);
            const result = await addNewSnacksMapping(snacksOrder);
            console.log('result', result);
            await proccedToStripe(result.order_id, result.total_amount);
        } else {
            toast.warning('Please update your cart first!')
        }
    }
    const addNewAddOns = (addOns) => {
        console.log('addNewAddOns: ', addOns);
        updateSnacksOrderDetails('snacks', addOns)
    };

    const handleClearCart = () => {
        setSnacksOrder(prevState => ({
            ...prevState,
            snacks: []
        }));
        setShowAddon(false)
        setCartUpdated(false)
    };
    const handleUpdateCart = () => {
        setCartUpdated(true)
        toast.success('Cart updated successfully!')
    };
    const proccedToStripe = async (order_id, total_amount) => {
        const stripe = await loadStripe('pk_test_51Os7kqANqKE86m4zdS4G0wU1OkKxGjgcdj8601Ezm9ugHnAV2IJ3ZpUn4CSqdmIMTqSBKJOzvqLvYxcix6r6293900u66JYNI9');
        console.log('user: ', user)
        const {priceId, productId} = await create_checkout_session_v2({
            productName: 'edenmade_snacks_' + order_id,
            price: total_amount.toFixed(2)
        })
        const {error} = await stripe.redirectToCheckout({
            mode: 'payment',
            lineItems: [{
                price: priceId, // Replace with your Price ID
                quantity: 1,
            }],
            customerEmail: user.email,
            successUrl: `${window.location.origin}/edenmade/selected-meals-cart?success`,
            cancelUrl: `${window.location.origin}/edenmade/selected-meals-cart?error`,


        });

        if (error) {
            console.error('Error redirecting to checkout:', error);
        }
    };
    return (
        <div className="bg-doodle py-md-5 py-3">
            <div className="container my-md-5 my-3">
                <div className="row">
                    <div className="col-12 background-primary rounded rounded-pill py-3 px-5 bg-vegetables">
                        <p className="text-white body-text-extra-small mb-0">
                            Your Order Detail for
                        </p>
                        <h1 className="text-white my-2 fs-2">
                            {orderDetails && (
                                <>
                        <span className={'mr-3'}>
                            {new Date(orderDetails?.activeWeekOrderDetails?.delivery_date).toLocaleString('default', {weekday: 'short'})},
                        </span>
                                    <span className={'mr-3'}>
                            {new Date(orderDetails.activeWeekOrderDetails?.delivery_date).toLocaleString('default', {month: 'short'})}
                        </span>
                                    {new Date(orderDetails.activeWeekOrderDetails?.delivery_date).toLocaleString('default', {day: 'numeric'})}
                                </>
                            )}
                        </h1>
                        <p className="text-white body-text-extra-small mb-0 d-flex align-items-center">
                            {orderDetails?.activeWeekOrderDetails?.meals_per_week} meals
                            for {orderDetails?.activeWeekOrderDetails?.number_of_people} People
                            ({orderDetails?.activeWeekOrderDetails?.meals_per_week * orderDetails?.activeWeekOrderDetails?.number_of_people} Servings)
                        </p>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12">
                        <div className="row">
                            {orderDetails && orderDetails.activeWeekOrderDetails?.items.map((item, index) => (
                                <React.Fragment key={index}>
                                    <RecipeCard categoryName={item.spice_level_name} recipeName={item.recipe_name}/>
                                </React.Fragment>
                            ))}
                        </div>
                        <div className="row my-5 ">
                            <div className="col-md-4 col-12">
                                <div className="d-flex align-items-center">
                                    <button className="btn btn-primary aj-button body-text-small fw-700 px-3 me-4"
                                            onClick={() =>
                                                setShowAddon(!showAddon)}>
                                        {showAddon ? (
                                            <i className="fi fi-bs-minus fs-5 lh-1 align-middle"></i>
                                        ) : (
                                            <i className="fi fi-bs-plus fs-5 lh-1 align-middle"></i>
                                        )}
                                    </button>

                                    <div className="d-inline-block">
                                        <h1>Add-ons</h1>
                                        <p className="fw-medium my-0">
                                            Shop for desserts, Snacks and More
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8 col-12 text-end my-auto">
                                {snacksOrder.snacks && snacksOrder.snacks.length > 0 &&
                                    <button onClick={makeSnackOrder}
                                            disabled={!cartUpdated}
                                            className="btn btn-primary aj-button background-secondary  body-text-small  border-0 fw-700 px-5 me-3">
                                        <i className="fi fi-brands-paypal fs-6 me-2 align-middle lh-1"></i>{" "}
                                        Continue with Stripe
                                    </button>
                                }
                                <button className="btn btn-transparent aj-button body-text-small fw-700 px-5 me-3"
                                        onClick={handleClearCart}>
                                    Empty Cart
                                </button>
                                <button
                                    className="btn btn-primary aj-button body-text-small fw-700 px-5"
                                    onClick={handleUpdateCart}
                                >
                                    Update Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {showAddon &&
                    <div className="row mb-3">
                        <AddonCard orderInfo={orderDetails} itemSource={snacks} addRemoveAddOns={addNewAddOns}
                                   canSelected={true} snackOrder={false}/>
                    </div>
                }
                <div className="row my-5">
                    <div className="col-12">
                        <ProductSummary selectedPeople={orderDetails?.activeWeekOrderDetails?.number_of_people}
                                        selectedRecipePerWeek={orderDetails?.activeWeekOrderDetails?.meals_per_week}
                                        updateTotalPrice={updateTotalPrice}
                                        selectedRecipes={orderDetails?.activeWeekOrderDetails?.amount_paid}/>
                    </div>
                </div>
                <div className="row my-5">
                    <div className="col-12">
                        {snacksOrder && snacksOrder.snacks && snacksOrder.snacks.length > 0 && (
                            <div className="row">
                                <div className="col-md-12">
                                    <SnackSummary snacksOrder={snacksOrder}></SnackSummary>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
