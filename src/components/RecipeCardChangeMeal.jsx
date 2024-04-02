export default function RecipeCardChangeMeal({recipeName, categoryName, recipe_id, active_order, addRemoveRecipes}) {
    const orderedRecipeIds = active_order ? active_order.items.map(item => item.recipe_id) : [];
    const isOrdered = orderedRecipeIds.includes(recipe_id);

    const addRemoveRecipe = () => {
        addRemoveRecipes(recipe_id)
    }
    return (
        <div className={`col-md-6 col-lg-3 col-12 mt-3`}>
            <div className={`card border-0 rounded-0 aj-drop-shadow ${isOrdered ? "ordered_recipe" : ""}`}
                 onClick={isOrdered ? addRemoveRecipe : null}>
                <div className="position-relative">
                    <img
                        className="card-img-top rounded-0"
                        src="/edenmade/meal.png"
                        alt="meal image"
                    />
                    {!isOrdered ? (
                        <button className="add-button btn-transparent position-absolute px-3 py-2"
                                onClick={addRemoveRecipe}>Add</button>
                    ) : (
                        '' // or any other content you want to render when isOrdered is true
                    )}
                </div>
                <div className="card-body">
                    <h5 className="card-title body-text-small fw-bold mb-0 lh-2">
                        {recipeName}
                    </h5>
                    <p className="card-text body-text-extra-small mb-2">with Sauce</p>
                    <p className="card-text body-text-extra-small">
                        <span className="fw-bold">10 min</span> | {categoryName}
                    </p>
                </div>
            </div>
        </div>
    );
}
