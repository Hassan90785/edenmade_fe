import React from 'react';
import RecipeCard from "./RecipeCard.jsx";

const OrderDetails = ({ orderDetails, selectedWeek }) => {
    // Filter order details based on selected week
    const selectedWeekOrder = orderDetails?.find(order => order.week === selectedWeek);
    if (!selectedWeekOrder) {
        // Handle case where no order details found for selected week
        return <div>No order details found for the selected week.</div>;
    }

    return (
        <div className="row mb-5">
            {selectedWeekOrder.items.map((item, index) => (
                <React.Fragment key={index}>
                    <RecipeCard categoryName={item.spice_level_name} recipeName={item.recipe_name}/>
                </React.Fragment>
            ))}
        </div>
    );
};

export default OrderDetails;
