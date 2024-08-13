import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SampleNextArrow = ({ className, style, onClick }) => (
    <div
        className={className}
        style={{ ...style, display: "block", background: "#ff6900", borderRadius: "50%", padding: "0.5rem" }}
        onClick={onClick}
        id={'next'}
    >
        <i className="fas fa-chevron-right" style={{ color: "white", fontSize: "1.5rem" }}></i>
    </div>
);

const SamplePrevArrow = ({ className, style, onClick }) => (
    <div
        id={'prev'}
        className={className}
        style={{ ...style, display: "block",  borderRadius: "50%", padding: "0.5rem" }}
        onClick={onClick}
    >
        <i className="fas fa-chevron-left" style={{ color: "white", fontSize: "1.5rem" }}></i>
    </div>
);

export default function AddonCard({ orderInfo, itemSource, addRemoveAddOns, canSelected, snackOrder }) {
    const [selectedAddons, setSelectedAddons] = useState([]);
    console.log('selectedAddons: ', selectedAddons);

    const handleAddOnSelection = (snack) => {
        if (canSelected) {
            const isSelected = selectedAddons.some(item => item.snacks_id === snack.snacks_id);
            let updatedAddons;
            if (isSelected) {
                updatedAddons = selectedAddons.filter(item => item.snacks_id !== snack.snacks_id);
            } else {
                updatedAddons = [...selectedAddons, { ...snack, portion: 1 }];
            }
            setSelectedAddons(updatedAddons);
            addRemoveAddOns(updatedAddons);
        }
    };

    const handlePortionChange = (snackId, delta) => {
        const updatedAddons = selectedAddons.map(item => {
            if (item.snacks_id === snackId) {
                const newportion = Math.max(1, item.portion + delta);
                return { ...item, portion: newportion };
            }
            return item;
        });
        setSelectedAddons(updatedAddons);
        addRemoveAddOns(updatedAddons);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        rows: 4,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    return (
        <Slider {...settings}>
            {itemSource?.map((snack) => {
                const selectedSnack = selectedAddons.find(item => item.snacks_id === snack.snacks_id);
                return (
                    <div key={snack.snacks_id}>
                        <div
                            className={`col-sm-6 col-md-8 col-lg mt-3 ${selectedSnack ? 'ordered_recipe' : ''}`}
                            onClick={() => handleAddOnSelection(snack)}>
                            <div className="card border-0 rounded-0 aj-drop-shadow">
                                <div className="aj-badge">
                                    <p className="text-white body-text-extra-small my-0 py-0 fw-bold">
                                        Movie Night
                                    </p>
                                </div>
                                <img
                                    className="card-img-top rounded-0"
                                    src={`/edenmade/addon.png`}
                                    alt="Snack Image"
                                />
                                <div className="card-body">
                                    <h5 className="card-title body-text-small fw-bold mb-0 lh-2">
                                        {snack.name}
                                    </h5>
                                    <p className="card-text body-text-small text-accent mt-1">
                                        <span className="fw-bold">+ £{snack.price}</span> / {snack.portion === 0 ? 'Portion' : `${snack.portion} Portion`}
                                    </p>
                                    {selectedSnack && (
                                        <div
                                            className="d-inline-flex align-items-center float-end mt-2"
                                            style={{
                                                backgroundColor: '#ff6900',
                                                borderRadius: '50px',
                                                padding: '0.15rem 0.5rem',
                                                width: 'auto',
                                            }}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <button
                                                type="button"
                                                className="btn p-0 m-0 text-white"
                                                style={{
                                                    backgroundColor: 'transparent', border: 'none',
                                                    fontWeight: "bold",
                                                    fontSize: '1rem'
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handlePortionChange(snack.snacks_id, -1);
                                                }}
                                            >
                                                -
                                            </button>
                                            <input
                                                type="text"
                                                className="text-center mx-2"
                                                value={selectedSnack.portion}
                                                disabled={true}
                                                style={{
                                                    width: '30px',
                                                    backgroundColor: 'transparent',
                                                    color: 'white',
                                                    border: 'none',
                                                    outline: 'none',
                                                    fontSize: '1rem',
                                                }}
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                            <button
                                                type="button"
                                                className="btn p-0 m-0 text-white"
                                                style={{
                                                    backgroundColor: 'transparent', border: 'none',
                                                    fontWeight: "bold",
                                                    fontSize: '1rem'
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handlePortionChange(snack.snacks_id, 1);
                                                }}
                                            >
                                                +
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </Slider>
    );
}
