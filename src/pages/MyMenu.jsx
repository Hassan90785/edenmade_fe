import AddonCard from "../components/AddonCard";
import RecipeCard from "../components/RecipeCard";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import {useAuth} from "../auth/authContext";
import ChangeBoxSizePopup from "../components/popups/ChangeBoxSizePopup";
import {getOrderInfo} from "../rest_apis/restApi.jsx";


export default function MyMenu() {
    const navigate = useNavigate();
    const {user} = useAuth();
    const handleButtonClickMyMenu = () => {
        // Navigate to the "/orderFlow" route
        navigate("/change-meal", {state: activeWeekOrder});
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

    const [activeWeekOrder, setActiveWeekOrder] = useState(null); // State for holding order details of active week
    const [orderDetails, setOrderDetails] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [selectedWeek, setSelectedWeek] = useState(1);
    const [upcoming, setUpcoming] = useState(null);


    useEffect(() => {
        async function fetchData() {
            try {
                let orderId = localStorage.getItem('order_id')
                console.log('orderInfo: ', orderId)
                if (orderId) {
                    orderId = Number(orderId)
                }
                const orderInfo = await getOrderInfo({orderId: orderId})
                console.log('orderInfo: ', orderInfo)
                const deliveryDate = getDeliveryDateWithNullPayment(orderInfo);
                setUpcoming(deliveryDate);
                setOrderDetails(orderInfo);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        setActiveWeek();
    }, [orderDetails]);
    const setActiveWeek = () => {
        if (orderDetails && orderDetails.active_week) {
            // Retrieve the order details for the active week
            const activeWeek = orderDetails.active_week;
            const activeWeekOrderDetails = orderDetails.order_details.find(order => order.week === activeWeek);
            const {order_details, ...cleanedOrderDetails} = orderDetails;
            cleanedOrderDetails['activeWeekOrderDetails'] = activeWeekOrderDetails
            localStorage.setItem('activeWeekOrder', JSON.stringify(activeWeekOrder))
            console.log('activeWeekOrder: ', activeWeekOrder)
            console.log('order_details: ', order_details)
            setActiveWeekOrder(cleanedOrderDetails);

        }
    }
    const addSuffix = (day) => {
        if (!day || isNaN(day)) return ""; // Handle invalid day
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

    const renderFormattedDate = (dateString) => {
        function formatDate(dateString) {
            if (!dateString) return null; // Handle null or undefined cases

            const date = new Date(dateString);
            if (isNaN(date.getTime())) return null; // Handle invalid date string

            const options = {weekday: 'short', month: 'short', day: 'numeric'};
            const formattedDate = date.toLocaleString('default', options);
            const parts = formattedDate.split(' '); // Split the date into parts
            const day = parseInt(parts[2]); // Extract the day part and parse it
            const suffixDay = addSuffix(day); // Add suffix to the day part
            parts[2] = suffixDay; // Replace the original day part with the suffixed one
            return parts.join(' '); // Join the parts back into a formatted date
        }

        const formattedDate = formatDate(dateString);
        if (!formattedDate) return null; // Handle null or invalid date string

        return (
            <>
                <span className={'mr-3'}>{formattedDate}</span>
            </>
        );
    };

    const handleDeliverySelection = (weekDetail) => {
        console.log('orderDetails: ', orderDetails)
        console.log('weekDetail: ', weekDetail)
        console.log('selectedWeek: ', selectedWeek);
        setSelectedWeek(weekDetail.week)
    }
    const getDeliveryDateWithNullPayment = (orders) => {
        console.log('getDeliveryDateWithNullPayment', orders);
        if (orders && orders.order_details.length > 0) {
            const orderWithNullPayment = orders.order_details.find(order => order.payment_id === null);
            console.log('getDeliveryDateWithNullPayment', orderWithNullPayment.delivery_date)
            return orderWithNullPayment ? orderWithNullPayment.delivery_date : null;
        } else {
            return null;
        }
    };

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
                                <h1 className="text-white fs-1 mt-3">
                                    {renderFormattedDate(upcoming)}
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
                                    {orderDetails?.order_details?.map((weekDetail, index) => {
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
                ${selectedWeek === weekDetail.week ? 'active' : ''}`}
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
                                    className="text-primary">{activeWeekOrder?.activeWeekOrderDetails?.items?.length} meals</span> we
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
                            {activeWeekOrder && activeWeekOrder.activeWeekOrderDetails.items.map((item, index) => (
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
