import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

function RecipeCardChangeMeal({ recipe, selectedOrder, spiceLevels, onAddRemoveRecipe, onUpdateOrder }) {
    const { recipe_id, title, category_name } = recipe;

    // Find the recipe in the order details
    const orderedRecipe = selectedOrder.items.find(item => item.recipe_id === recipe_id);

    // Find the spice level associated with the recipe, if any
    const spiceLevel = orderedRecipe ? spiceLevels.find(spice => spice.spice_level_id === orderedRecipe.spice_level_id) : null;
    const [selectedSpiceLevel, setSelectedSpiceLevel] = useState(spiceLevel);

    const [showModal, setShowModal] = useState(false);

    const handleAddRemoveRecipe = () => {
        onAddRemoveRecipe({ ...recipe, spice_level_id: selectedSpiceLevel ? selectedSpiceLevel.spice_level_id : null });
    };

    const handleSpiceLevelChange = (event) => {
        const selectedSpiceId = parseInt(event.target.value);
        setSelectedSpiceLevel(spiceLevels.find(spice => spice.spice_level_id === selectedSpiceId));
        onUpdateOrder({
            ...selectedOrder,
            items: selectedOrder.items.map(item => item.recipe_id === recipe_id ? {
                ...item,
                spice_level_id: selectedSpiceId
            } : item)
        });
    };

    const handleSelectClick = (event) => {
        event.stopPropagation();
    };

    const handleExpandClick = (event) => {
        event.stopPropagation();
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className={`col-md-6 col-lg-3 col-12 mt-3`}>
            <div className={`card border-0 rounded-0 aj-drop-shadow ${orderedRecipe ? "ordered_recipe" : ""}`}
                 onClick={orderedRecipe ? handleAddRemoveRecipe : null}>
                <div className="position-relative">
                    <i className={"fi fi-bs-expand-arrows position-absolute expand-btn"} onClick={handleExpandClick}></i>
                    <img
                        className="card-img-top rounded-0"
                        src="/edenmade/meal.png"
                        alt="meal image"
                    />
                    {!orderedRecipe ? (
                        <button className="add-button btn-transparent position-absolute px-3 py-2"
                                onClick={handleAddRemoveRecipe}>Add</button>
                    ) : null}
                </div>
                <div className="card-body">
                    <h5 className="card-title body-text-small fw-bold mb-0 lh-2">
                        {title}
                    </h5>
                    <div className="row">
                        <div className="col">
                            <p className="card-text body-text-extra-small mb-2">with Sauce</p>
                            <p className="card-text body-text-extra-small">
                                <span className="fw-bold">10 min</span> | {category_name}
                            </p>
                        </div>
                    </div>
                    {spiceLevels && (
                        <div className="row">
                            <div className="col">
                                <select
                                    className="form-select border-select"
                                    aria-label="Spice Level Select"
                                    onChange={handleSpiceLevelChange}
                                    onClick={handleSelectClick} // Prevents click event from bubbling up
                                    value={selectedSpiceLevel ? selectedSpiceLevel.spice_level_id : ""}
                                >
                                    <option value="" disabled>Select Spice Level</option>
                                    {spiceLevels.map(spice => (
                                        <option key={spice.spice_level_id} value={spice.spice_level_id}>
                                            {spice.spice_level_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal for image expansion */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <img
                        className="img-fluid w-100"
                        src="/edenmade/meal.png"
                        alt="Expanded meal image"
                    />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default RecipeCardChangeMeal;
