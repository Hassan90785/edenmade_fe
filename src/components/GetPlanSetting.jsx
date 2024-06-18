// RegisterStep.js

import React, {useEffect, useState} from "react";
import {ValidatedInput} from "./ValidateInput.jsx";
import {cancel_subscription, getPlanSettings, pause_subscription, resume_subscription} from "../rest_apis/restApi.jsx";

const GetPlanSetting = ({data}) => {
    const [plan, setPlan] = useState(data);
    const formatSimpleDate = (dateString) => {
        const date = new Date(dateString);
        let daysToAdd = 5;

        while (daysToAdd > 0) {
            date.setDate(date.getDate() + 1);
            const dayOfWeek = date.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) { // 0 = Sunday, 6 = Saturday
                daysToAdd--;
            }
        }

        const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    useEffect(() => {
        setPlan(data);
    }, [data]);
    const getDateAfterAWeek = (dateString) => {
        const today = new Date(dateString);
        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);
        return nextWeek.toLocaleDateString('en-US', {weekday: 'short', month: 'short', day: 'numeric'});
    };
    const subscriptionHandler = async (code) => {
        if (code === 'P') {
            const resp = await pause_subscription({
                subscription_id: plan?.subscription_id
            });
            console.log('resp', resp)
        }
        if (code === 'C') {
            const resp = await cancel_subscription({
                subscription_id: plan?.subscription_id
            });
            console.log('resp', resp)
        }
        if (code === 'R') {
            const resp = await resume_subscription({
                subscription_id: plan?.subscription_id
            });
            console.log('resp', resp)
        }

        const orderInfo = await getPlanSettings({customer_id: plan?.customer_id})
        setPlan(orderInfo)
    };

    // Implement your UI and logic for registering
    return (
        <div>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="aj-site-logo w-100 text-center">Plan Setting</h1>
                        <button
                            type="button"
                            className="btn btn-close"
                            data-bs-dismiss="modal"
                        >
                            <i className="fi fi-rr-rectangle-xmark"></i>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="container-fluid my-3">
                            <div className="row">
                                <div className="col-12 ">
                                    <div className="row">
                                        <h5>Meal Preferences</h5>
                                        <div className="col-12">
                                            <label>
                                                What Kind of Recipes do you Like
                                            </label>
                                            <ValidatedInput
                                                type="text"
                                                id="detailSelectedRecipes"
                                                name="selected_recipes"
                                                placeholder="Selected Recipes"
                                                value={plan?.selected_recipes}
                                                inputType={'s'}
                                                disabled // Disable editing as this is just for display
                                            />
                                        </div>
                                        <div className="col-6">
                                            <label>
                                                Number of People
                                            </label>
                                            <ValidatedInput
                                                type="text"
                                                id="detailSubscriptionStatus"
                                                name="number_of_people"
                                                placeholder="Number of People"
                                                value={plan?.number_of_people + ' Persons'}
                                                inputType={'s'}
                                                disabled // Disable editing as this is just for display
                                            />
                                        </div>
                                        <div className="col-6">
                                            <label>
                                                Recipes per week
                                            </label>
                                            <ValidatedInput
                                                type="text"
                                                id="meals_per_week"
                                                name="meals_per_week"
                                                placeholder="Meals per week"
                                                value={plan?.meals_per_week + ' Meals'}
                                                inputType={'n'}
                                                disabled // Disable editing as this is just for display
                                            />
                                        </div>
                                        <hr/>
                                        <h5>Delivery</h5>
                                        <div className="col-12">
                                            <label htmlFor="">Upcoming Delivery Date</label>
                                            <ValidatedInput
                                                type="text"
                                                id="detailPaymentDate"
                                                name="payment_date"
                                                placeholder="Payment Date"
                                                value={formatSimpleDate(plan?.payment_date)}
                                                inputType={'s'} // Assuming payment_date is a string
                                                disabled // Disable editing as this is just for display
                                            />
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <hr/>

                                            </div>
                                        </div>
                                        <h5>Payment Details</h5>
                                        <div className="border-section">
                                            <div className="row">
                                                <div className="col-6">
                                                    Weekly Subscription
                                                </div>
                                                <div className="col-6 text-end fw-bold">
                                                    &pound;  {plan?.due_amount}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6">
                                                    Next Payment Due
                                                </div>
                                                <div className="col-6 text-end fw-bold">
                                                    {getDateAfterAWeek(plan?.payment_date)}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col">
                                                <hr/>

                                            </div>
                                        </div>

                                        <div className="row">

                                            <div className="col-6"><h5>Status</h5></div>
                                            <div className="col-6 text-end text-primary cursor-pointer">Your Plan
                                                is <span
                                                    className={'social-icon-menu'}>
                                             {plan?.subscription_status === 'A' ? 'Active' :
                                                 plan?.subscription_status === 'P' ? 'Paused' :
                                                     plan?.subscription_status === 'C' ? 'Cancelled' : 'Unknown'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {plan?.subscription_status === 'A' &&
                                        <div className="row">
                                            <div className="col">
                                                <p className={'mb-0'}> Want to take a break?</p>
                                                <span className={'body-text-extra-small'}> If you are out of town or simply want a break from cooking, you can pause your subscription and
                                            <span className={'ms-1 text-primary text-underline'}
                                                  onClick={() => subscriptionHandler('P')}>skip your weekly delivery</span></span>
                                            </div>
                                        </div>
                                    }
                                    {plan?.subscription_status === 'P' &&
                                        <div className="row">
                                            <div className="col">
                                                <p className={'mb-0'}>Ready to resume?</p>
                                                <span className={'body-text-extra-small'}>Welcome back! If you're ready to start receiving delicious meals again,
                                            you can <span className={'ms-1 text-primary text-underline'}
                                                          onClick={() => subscriptionHandler('R')}>resume your subscription</span> and enjoy your weekly deliveries as usual.</span>
                                            </div>
                                        </div>
                                    }
                                    {plan?.subscription_status !== 'C' &&
                                        <div className="row mt-2">
                                            <div className="col">
                                                <p className={'mb-0'}> Want to Cancel?</p>
                                                <span className={'body-text-extra-small'}> We are sorry to see you go. Please note that canceling your subscription will also remove any earned promotions and rewards.
                                             <span
                                                 className={'ms-1 text-primary text-underline'}
                                                 onClick={() => subscriptionHandler('C')}>Cancel Subscription.</span></span>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer d-flex justify-content-center">
                            <button
                                type="button"
                                data-bs-dismiss="modal"
                                className="btn btn-primary aj-button body-text-small fw-700 px-5"
                            >
                                Save changes
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default GetPlanSetting;
