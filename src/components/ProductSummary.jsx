import {useEffect, useState} from 'react';
import {getPrices} from '../rest_apis/restApi.jsx'; // Assuming these functions are defined in a file called data.js

export default function ProductSummary({selectedPeople, selectedRecipePerWeek, selectedRecipes, updateTotalPrice}) {
    const [totalPrice, setTotalPrice] = useState(0);
    const prices = getPrices();

    useEffect(() => {
        // Calculate total price when any of the selected options change
        const boxPrice = prices.find(price => price.id === 'boxPrice').value;
        const servings = selectedPeople * selectedRecipePerWeek;
        const pricePerServing = prices.find(price => price.id === 'pricePerServing').value;
        const totalPrice = (selectedRecipePerWeek * boxPrice) + (selectedPeople * pricePerServing);
        setTotalPrice(totalPrice);
        updateTotalPrice(totalPrice);
    }, [selectedPeople, selectedRecipePerWeek, selectedRecipes]);

    return (
        <div id="productSummary">
            <div className="w-100 border border-2 py-2 px-3">
                <p className="body-text-small fw-bold mb-1">Current Subscription Plan</p>
                <p className="body-text-small lh-sm fw-500">
                    {selectedRecipePerWeek} meals for {selectedPeople} people per week
                    <br/>
                    {selectedPeople * selectedRecipePerWeek} total servings
                </p>
            </div>
            <div className="w-100 border border-2 border-top-0 border-bottom-0 py-2 px-3">
                {prices.map(price => (
                    <div key={price.id} className="row">
                        <div className="col-6">
                            <p className="body-text-small fw-bold mb-1">{price.label}
                                <span
                                    className={'ms-3'}>{price.id === 'boxPrice' ? (selectedRecipePerWeek || 1) + ' x ' + price.value : (selectedPeople || 1) + ' x ' + price.value}</span>
                            </p>
                        </div>
                        <div className="col-6">
                            <p className="body-text-small fw-bold mb-1 text-end">
                                £ {price.id === 'boxPrice' ? ((selectedRecipePerWeek * price.value).toFixed(2)) : ((selectedPeople * price.value).toFixed(2))}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-100 border border-2 py-2 px-3 background-secondary">
                <div className="row">
                    <div className="col-6">
                        <p className="body-text-small fw-bolder mb-1">Total Price</p>
                    </div>
                    <div className="col-6">
                        <p className="body-text-small fw-bolder mb-1 text-end">£{totalPrice.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
