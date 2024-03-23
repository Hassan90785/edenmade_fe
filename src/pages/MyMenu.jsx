import AddonCard from "../components/AddonCard";
import RecipeCard from "../components/RecipeCard";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import {useAuth} from "../auth/authContext";
import ChangeBoxSizePopup from "../components/popups/ChangeBoxSizePopup";
import config from "../auth_v2/config.js";
import {toast} from "react-toastify";


export default function MyMenu() {
    const navigate = useNavigate();
    const {
        authUser,
    } = useAuth();
    const handleButtonClickMyMenu = () => {
        // Navigate to the "/orderFlow" route
        navigate("/change-meal");
    };
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleButtonClickForSelectedMeal = () => {
        console.log(
            "🚀 ~ file: OrderFlow.jsx:27 ~ handleButtonClickMyMenu ~ consol:"
        );
        // Navigate to the "/orderFlow" route
        navigate("/selected-meals-cart");
    };
    const [customer, setCustomer] = useState({
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
    const [ws, setWs] = useState(null);
    const [selectedDelivery, setSelectedDelivery] = useState(null); // State for holding selected delivery
    const [activeWeekOrder, setActiveWeekOrder] = useState(null); // State for holding order details of active week
    const [orderDetails, setOrderDetails] = useState({
        "active_week": 1,
        "amount_paid": 8799,
        "customer_email": "tdest@xyz.com",
        "customer_id": 96,
        "customer_name": "Hassan Syed",
        "initial_payment_id": 321231,
        "order_details": [
            {
                "delivery_date": "2024-04-11T07:31:11.000Z",
                "items": [
                    {
                        "created_at": "2024-03-21T07:31:11.000Z",
                        "recipe_id": 25,
                        "recipe_name": "Mexican Dish 5",
                        "recipe_price": "12.99",
                        "spice_level_id": 2,
                        "spice_level_name": "Medium"
                    },
                    {
                        "created_at": "2024-03-21T07:31:11.000Z",
                        "recipe_id": 25,
                        "recipe_name": "Italian Dish 3",
                        "recipe_price": "12.99",
                        "spice_level_id": 2,
                        "spice_level_name": "Medium"
                    },
                    {
                        "created_at": "2024-03-21T07:31:11.000Z",
                        "recipe_id": 25,
                        "recipe_name": "Thai Dish 1",
                        "recipe_price": "12.99",
                        "spice_level_id": 2,
                        "spice_level_name": "Medium"
                    }
                ],
                "meals_per_week": 4,
                "number_of_people": 4,
                "payment_date": null,
                "payment_id": null,
                "week": 1
            },
            {
                "delivery_date": "2024-03-28T07:31:11.000Z",
                "items": [
                    {
                        "created_at": "2024-03-21T07:31:11.000Z",
                        "recipe_id": 25,
                        "recipe_name": "Mexican Dish 5",
                        "recipe_price": "12.99",
                        "spice_level_id": 2,
                        "spice_level_name": "Medium"
                    },
                    {
                        "created_at": "2024-03-21T07:31:11.000Z",
                        "recipe_id": 15,
                        "recipe_name": "Italian Dish 3",
                        "recipe_price": "12.99",
                        "spice_level_id": 2,
                        "spice_level_name": "Medium"
                    },
                    {
                        "created_at": "2024-03-21T07:31:11.000Z",
                        "recipe_id": 22,
                        "recipe_name": "Thai Dish 1",
                        "recipe_price": "12.99",
                        "spice_level_id": 2,
                        "spice_level_name": "Medium"
                    }
                ],
                "meals_per_week": 4,
                "number_of_people": 4,
                "payment_date": null,
                "payment_id": null,
                "week": 2
            },
            {
                "delivery_date": "2024-04-04T07:31:11.000Z",
                "items": [
                    {
                        "created_at": "2024-03-21T07:31:11.000Z",
                        "recipe_id": 25,
                        "recipe_name": "Mexican Dish 5",
                        "recipe_price": "12.99",
                        "spice_level_id": 2,
                        "spice_level_name": "Medium"
                    },
                    {
                        "created_at": "2024-03-21T07:31:11.000Z",
                        "recipe_id": 25,
                        "recipe_name": "Italian Dish 3",
                        "recipe_price": "12.99",
                        "spice_level_id": 2,
                        "spice_level_name": "Medium"
                    },
                    {
                        "created_at": "2024-03-21T07:31:11.000Z",
                        "recipe_id": 25,
                        "recipe_name": "Thai Dish 1",
                        "recipe_price": "12.99",
                        "spice_level_id": 2,
                        "spice_level_name": "Medium"
                    }
                ],
                "meals_per_week": 4,
                "number_of_people": 4,
                "payment_date": null,
                "payment_id": null,
                "week": 3
            },
            {
                "delivery_date": "2024-04-11T07:31:11.000Z",
                "items": [
                    {
                        "created_at": "2024-03-21T07:31:11.000Z",
                        "recipe_id": 25,
                        "recipe_name": "Mexican Dish 5",
                        "recipe_price": "12.99",
                        "spice_level_id": 2,
                        "spice_level_name": "Medium"
                    },
                    {
                        "created_at": "2024-03-21T07:31:11.000Z",
                        "recipe_id": 25,
                        "recipe_name": "Italian Dish 3",
                        "recipe_price": "12.99",
                        "spice_level_id": 2,
                        "spice_level_name": "Medium"
                    },
                    {
                        "created_at": "2024-03-21T07:31:11.000Z",
                        "recipe_id": 25,
                        "recipe_name": "Thai Dish 1",
                        "recipe_price": "12.99",
                        "spice_level_id": 2,
                        "spice_level_name": "Medium"
                    }
                ],
                "meals_per_week": 4,
                "number_of_people": 4,
                "payment_date": null,
                "payment_id": null,
                "week": 4
            }
        ],
        "order_id": 49,
        "subscription_id": 545454
    });
    const [showPopup, setShowPopup] = useState(false);
    const handleDeliverySelection = (delivery) => {
        // Set the selected delivery
        setSelectedDelivery(delivery);
        // Call a function to fetch and display details of the selected delivery order
        getUserOrderRecipesDetail(delivery.week);
    };

    useEffect(() => {
        // Check if orderDetails and active_week are available in the JSON data
        if (orderDetails && orderDetails.active_week) {
            // Retrieve the order details for the active week
            const activeWeek = orderDetails.active_week;
            const activeWeekOrderDetails = orderDetails.order_details.find(order => order.week === activeWeek);
            console.log('activeWeek: ', activeWeek)
            console.log('activeWeekOrderDetails: ', activeWeekOrderDetails)
            // Set the order details of active week in the state
            setActiveWeekOrder(activeWeekOrderDetails);
            if (activeWeekOrderDetails) {
                console.log('setting activeWeekOrderDetails',activeWeekOrderDetails)
                localStorage.setItem('activeWeekOrderDetails', JSON.stringify(activeWeekOrderDetails))
            }
            getUserOrderRecipesDetail(activeWeek);
        }
    }, [orderDetails]);
    const getUserOrderRecipesDetail = (selectedWeek) => {
        // Find the order detail for the selected week in the orderDetails state
        const selectedOrder = orderDetails.order_details.find(order => order.week === selectedWeek);

        // Do something with the selectedOrder, such as displaying its details or updating another state
        // You can perform further actions here, such as updating another state or displaying the details on the UI
    };
    useEffect(() => {
        const newWs = new WebSocket(config.WssUrl); // Replace with your WebSocket server URL
        setWs(newWs);

        return () => {
            // Clean up WebSocket connection when component unmounts
            // setTimeout(() => {
            newWs.close();
            // }, 5000)
        };
    }, []);


    useEffect(() => {
        if (!ws) {
            return;
        }
        // Handle WebSocket open event
        ws.onopen = () => {
            console.log('WebSocket connection opened');
            if (location.pathname === '/change-meal' && location.search.includes('success')) {
                toast.success("Payment has been successfully made!");
            }
            if (ws.readyState === WebSocket.OPEN) {
                const message = {type: 'notification', status: 200, code: 'A', message: 'Component Loaded from Client'}; // Define your message payload
                ws.send(JSON.stringify(message)); // Send the message as a JSON string
            } else {
                console.error('WebSocket connection is not open');
            }
        };
        // Handle incoming messages from the WebSocket server
        ws.onmessage = (event) => {
            const resp = JSON.parse(event.data);
            // setOrderDetails(resp)
            toast.success("Order has been successfully placed!");
        };

        // Handle WebSocket errors
        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        // Handle WebSocket close event
        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };
    }, [ws]);
    useEffect(() => {
        async function fetchData() {
            try {
                // const categoriesData = await getCategories();
                // const allRecipes = await getRecipes();
                await retrieveFromLocalStorage();
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }

        fetchData();
    }, []);
    const retrieveFromLocalStorage = async () => {
        const customer = localStorage.getItem('user');
        if (customer) {
            setCustomer(JSON.parse(customer));
        }
    }
    const addSuffix = (day) => {
        if (day >= 11 && day <= 13) {
            return `${day}th`;
        } else if (day % 10 === 1) {
            return `${day}st`;
        } else if (day % 10 === 2) {
            return `${day}nd`;
        } else if (day % 10 === 3) {
            return `${day}rd`;
        } else {
            return `${day}th`;
        }
    };

    useEffect(() => {
        // Function to find the active week order details
        const findActiveWeekOrder = () => {
            if (orderDetails && orderDetails.order_details) {
                let activeWeekOrderDetails = null;
                let latestPaymentDate = null;

                // Loop through each order detail to find the one with the latest payment date and payment id
                orderDetails.order_details.forEach(order => {
                    if (order.payment_id && order.payment_date) {
                        const paymentDate = new Date(order.payment_date);

                        // Check if this order has a later payment date than the current active week
                        if (!latestPaymentDate || paymentDate > latestPaymentDate) {
                            latestPaymentDate = paymentDate;
                            activeWeekOrderDetails = order;
                        }
                    }
                });
                console.log('activeWeekOrderDetails::', activeWeekOrderDetails)

                // If an active week order details is found, set it in the state
                if (activeWeekOrderDetails) {
                    console.log('again setting active week', activeWeekOrderDetails)
                    setActiveWeekOrder(activeWeekOrderDetails);
                    getUserOrderRecipesDetail(activeWeekOrderDetails.week);
                }
            }
        };

        findActiveWeekOrder(); // Call the function to find the active week order details
    }, [orderDetails, getUserOrderRecipesDetail]);
    return (
        <div className="bg-doodle py-md-5 py-3">

            <div>
                {/* Your other content */}
                <button onClick={() => setShowPopup(true)}>Open Popup</button>

                {showPopup && <ChangeBoxSizePopup onClose={() => setShowPopup(false)}/>}
            </div>
            <div className="container my-md-5 my-3">
                <div className="row">
                    <div className="col-12 background-primary rounded rounded-pill py-3 px-5 bg-vegetables">
                        <div className="row">
                            <div className="col-md-4 col-12">
                                <p className="text-white body-text-extra-small mb-0">
                                    Upcomming
                                </p>
                                <h1 className="text-white my-2 fs-2">
                                    {activeWeekOrder && (
                                        <>
                        <span className={'mr-3'}>
                            {new Date(activeWeekOrder.delivery_date).toLocaleString('default', {weekday: 'short'})},
                        </span>
                                            <span className={'mr-3'}>
                            {new Date(activeWeekOrder.delivery_date).toLocaleString('default', {month: 'short'})}
                        </span>
                                            {new Date(activeWeekOrder.delivery_date).toLocaleString('default', {day: 'numeric'})}
                                        </>
                                    )}
                                </h1>
                                {/* <>{JSON.stringify(orderDetail)}</> */}
                                <p
                                    className="text-white body-text-extra-small mb-0 d-flex align-items-center"
                                    style={{cursor: "pointer"}}
                                    data-bs-toggle="modal"
                                    data-bs-target="#editDeliveryPopup"
                                >

                                </p>
                            </div>
                            <div className="col-md-8 col-12 d-flex align-items-center">
                                <button className="btn btn-transparent text-white">
                                    <i className="fi fi-sr-angle-left fs-4"></i>
                                </button>
                                <div className="upcoming-date-wrapper mx-2">
                                    {/* Map through each order detail */}
                                    {orderDetails?.order_details.map((weekDetail, index) => {
                                        // Parse delivery date string into a Date object
                                        const deliveryDate = new Date(weekDetail.delivery_date);

                                        // Get the day, date, and month from the date object
                                        const options = {weekday: 'short', day: '2-digit', month: 'short'};
                                        const formattedDate = deliveryDate.toLocaleString('en-US', options);

                                        // Split the formatted date into individual parts
                                        const [day, date, month] = formattedDate.split(' ');

                                        return (
                                            <div
                                                key={index}
                                                className={`upcoming-date text-center mx-2 
                ${activeWeekOrder && activeWeekOrder.week === weekDetail.week ? 'active' : 'opacity-5'}`}
                                                onClick={() => handleDeliverySelection(weekDetail)}
                                            >
                <span className="date">
                    {day} <br/> {/* Displays only the day */}
                    <strong>{addSuffix(month)}</strong>  <br/> {/* Displays only the month */}
                    {date}{/* Displays only the date */}
                </span>
                                            </div>
                                        );
                                    })}
                                </div>


                                <button className="btn btn-transparent text-white">
                                    <i className="fi fi-sr-angle-right fs-4"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-md-6 col-12">
                                <h1>Your Order</h1>

                                <p className="fw-medium mt-2">
                                    We picked <span
                                    className="text-primary">{orderDetails?.order_details?.length} meals</span> we
                                    thought you would like.
                                </p>
                            </div>
                            <div className="col-md-6 col-12 text-end my-auto">
                                <button
                                    className="btn btn-primary aj-button body-text-small fw-700 px-4 me-3"
                                    onClick={handleButtonClickMyMenu}
                                >
                                    <i className="fi fi-sr-restaurant me-2 fs-5 lh-1 align-middle"></i>
                                    Change Meals
                                </button>
                                <button onClick={handleOpen}
                                        className="btn btn-primary aj-button body-text-small fw-700 px-3">
                                    <i className="fi fi-rr-box-open-full fs-5 lh-1 align-middle"></i>
                                </button>

                            </div>
                        </div>
                        <div className="row mb-5">
                            {activeWeekOrder && activeWeekOrder.items.map((item, index) => (
                                <React.Fragment key={index}>
                                    <RecipeCard categoryName={item.spice_level_name} recipeName={item.recipe_name}/>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-md-8 col-12">
                                <h1>Products you’ll Love</h1>
                                <p className="fw-medium mt-2">
                                    Round out your meal planning with desserts, sides, snacks and
                                    more!
                                </p>
                            </div>
                            <div className="col-md-4 col-12 text-end my-auto">
                                <button
                                    className="btn btn-primary aj-button body-text-small fw-700 px-4 me-3"
                                    onClick={handleButtonClickForSelectedMeal}
                                >
                                    <i className="fi fi-sr-shopping-cart me-2 fs-5 lh-1 align-middle"></i>
                                    Shop for More
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <AddonCard/>
                            <AddonCard/>
                            <AddonCard/>
                            <AddonCard/>
                            <AddonCard/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
