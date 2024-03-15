export default function RecipeCard({recipeName,categoryName}) {
  return (
    <div className="col-md-6 col-lg-3 col-12 mt-3">
      <div className="card border-0 rounded-0 aj-drop-shadow">
        <img
          className="card-img-top rounded-0"
          src="/meal.png"
          alt="meal image"
        />
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
