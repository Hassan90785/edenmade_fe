import React from 'react';

export default function SnackSummary({ snacksOrder }) {
    // Calculate total price of all snacks
    const totalPrice = snacksOrder.snacks.reduce((acc, snack) => acc + snack.price, 0);

    return (
        <div id="productSummary">
            <div className="w-100 border border-2 py-2 px-3">
                <p className="body-text-small fw-bold mb-1">Snacks Summary</p>
                {snacksOrder?.snacks?.map(snack => (
                    <div className="row" key={snack.snacks_id}>
                        <div className="col-6">
                            <p className="body-text-small fw-500 mb-1">{snack.name}</p>
                        </div>
                        <div className="col-6 text-end">
                            <p className="body-text-small fw-500 mb-1">£{snack.price.toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-100 border border-2 py-2 px-3 background-secondary">
                <div className="row">
                    <div className="col-6">
                        <p className="body-text-small fw-bolder mb-1">Amount Payable</p>
                    </div>
                    <div className="col-6 text-end">
                        <p className="body-text-small fw-bolder mb-1">£{totalPrice.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
