import React, { useState, useEffect } from "react";
import { getAllRecipes } from "../rest_apis/restApi.jsx";

export default function Recipes() {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    useEffect(() => {
        async function fetchAllRecipes() {
            try {
                const resp = await getAllRecipes();
                if (resp && resp.status === 1) {
                    setRecipes(resp.data);
                }
            } catch (error) {
                console.error("Error fetching all recipes:", error);
            }
        }

        fetchAllRecipes();
    }, []);

    const openRecipeModal = (recipe) => {
        setSelectedRecipe(recipe);
        // Example: Trigger modal display code here
        // You can use Bootstrap modal or any other modal library/modal component
    };

    const closeRecipeModal = () => {
        setSelectedRecipe(null);
        // Example: Close modal code here
    };

    return (
        <div className="container my-5 aj-drop-shadow background-white">
            <div className="row py-3">
                <div className="col">
                    <h1 className={"text-center my-3 aj-site-logo"}>Our Recipes</h1>
                    <div className="row">
                        {recipes?.map((recipe) => (
                            <div key={recipe.recipe_id} className="col-md-3 mb-4">
                                <div className="card cursor-pointer"  onClick={() => openRecipeModal(recipe)}>
                                    <img
                                        src={`/edenmade/meal.png`}
                                        className="card-img-top"
                                        alt={recipe.title}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title ">{recipe.title}</h5>
                                        <p className="card-text">Category: {recipe.category_name}</p>
                                        <p className="card-text">Price: ${recipe.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal for displaying recipe details */}
            {selectedRecipe && (
                <div className="modal fade show shadow-lg" tabIndex="-1" role="dialog" style={{ display: "block" }}>
                    <div className="modal-dialog modal-lg" role="document">
                        {/* Use modal-lg class for a larger width */}
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title aj-site-logo">{selectedRecipe.title}</h5>
                                <button type="button" className="btn-close" onClick={closeRecipeModal}>
                                    <i className="fi fi-rs-circle-xmark"></i>
                                </button>
                            </div>
                            <div className="modal-body">
                                <img
                                    src={`/edenmade/meal.png`}
                                    className="card-img-top"
                                    alt={selectedRecipe.title}
                                />
                                <p>Category: {selectedRecipe.category_name}</p>
                                <p>Price: ${selectedRecipe.price}</p>
                                {/* Add more details as needed */}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* End of Modal */}
        </div>
    );
}
