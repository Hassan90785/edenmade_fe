import ProductSummary from "../components/ProductSummary";
import RecipeCard from "../components/RecipeCard";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";

export default function Cart() {
    const navigate = useNavigate();
    const [orderDetails, setOrderDetails] = useState({});
    const handleButtonClickMyMenu = () => {
        navigate("/change-meal");
    };
    useEffect(() => {
        const activeOrder = localStorage.getItem('activeWeekOrder')
        console.log('activeOrder', JSON.parse(activeOrder))
        if (JSON.parse(activeOrder)) {
            setOrderDetails(JSON.parse(activeOrder))
        }
    }, []);
    const updateTotalPrice = () =>{

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
                            {orderDetails && (
                                <>
                        <span className={'mr-3'}>
                            {new Date(orderDetails?.activeWeekOrderDetails?.delivery_date).
                            toLocaleString('default', {weekday: 'short'})},
                        </span>
                                    <span className={'mr-3'}>
                            {new Date(orderDetails.activeWeekOrderDetails?.delivery_date).
                            toLocaleString('default', {month: 'short'})}
                        </span>
                                    {new Date(orderDetails.activeWeekOrderDetails?.delivery_date).
                                    toLocaleString('default', {day: 'numeric'})}
                                </>
                            )}
                        </h1>
                        <p className="text-white body-text-extra-small mb-0 d-flex align-items-center">
                            {orderDetails?.activeWeekOrderDetails?.meals_per_week} meals for {orderDetails?.activeWeekOrderDetails?.number_of_people} People ({orderDetails?.activeWeekOrderDetails?.meals_per_week *orderDetails?.activeWeekOrderDetails?.number_of_people} Servings)
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
                            <div className="col-md-6 col-12">
                                <div className="d-flex align-items-center">
                                    <button className="btn btn-primary aj-button body-text-small fw-700 px-3 me-4">
                                        <i className="fi fi-bs-plus fs-5 lh-1 align-middle"></i>
                                    </button>
                                    <div className="d-inline-block">
                                        <h1>Add-ons</h1>
                                        <p className="fw-medium my-0">
                                            Shop for desserts, Snacks and More
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-12 text-end my-auto">
                                <button className="btn btn-transparent aj-button body-text-small fw-700 px-5 me-3">
                                    Empty Cart
                                </button>
                                <button
                                    className="btn btn-primary aj-button body-text-small fw-700 px-5"
                                    onClick={handleButtonClickMyMenu}
                                >
                                    Update Cart
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <ProductSummary selectedPeople={orderDetails?.activeWeekOrderDetails?.number_of_people}
                                        selectedRecipePerWeek={orderDetails?.activeWeekOrderDetails?.meals_per_week}
                                        updateTotalPrice={updateTotalPrice}
                                        selectedRecipes={orderDetails?.activeWeekOrderDetails?.amount_paid}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
