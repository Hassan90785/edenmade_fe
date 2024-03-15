import RecipeCard from "../components/RecipeCard";

export default function ChangeMeal() {
  return (
    <div className="bg-doodle py-md-5 py-3">
      <div className="container my-md-5 my-3">
        <div className="row">
          <div className="col-12 background-primary rounded rounded-pill py-3 px-5 bg-vegetables">
            <p className="text-white body-text-extra-small mb-0">
              Your Order Detail for
            </p>
            <h1 className="text-white my-2 fs-2">Mon, Dec 04</h1>
            <p className="text-white body-text-extra-small mb-0 d-flex align-items-center">
              3 meals for 4 People (12 Servings)
            </p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12">
            <div className="row mb-3 ">
              <div className="col-md-8 col-12">
                <div className="d-flex align-items-center">
                  <button className="btn btn-primary aj-button body-text-small fw-700 px-3 me-4">
                    <i className="fi fi-rr-box-open-full fs-5 lh-1 align-middle"></i>
                  </button>
                  <div className="d-inline-block">
                    <h1>Add a 4th Meal</h1>
                    <p className="fw-medium my-0">
                      this week for just
                      <span className="text-primary fw-bold">£3.99</span> per
                      person
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-4 col-12 text-end my-auto">
                <button className="btn btn-primary aj-button body-text-small fw-700 px-5">
                  Update Order
                </button>
              </div>
            </div>
            <div className="row mb-5 recipe-category-wrapper aj-drop-shadow">
              <div className="col-12">
                <ul className="recipe-categories pt-2">
                  <li>ALL</li>
                  <li>Chinese</li>
                  <li>Thai</li>
                  <li className="selected">Seasonal</li>
                  <li>Continental</li>
                  <li>Mexican</li>
                  <li>Italian</li>
                  <li>Arabian</li>
                  <li>B.B.Q</li>
                  <li>Region</li>
                </ul>
              </div>
            </div>
            <div className="row">
              <RecipeCard />
              <RecipeCard />
              <RecipeCard />
              <RecipeCard />
              <RecipeCard />
              <RecipeCard />
              <RecipeCard />
              <RecipeCard />
              <RecipeCard />
              <RecipeCard />
              <RecipeCard />
              <RecipeCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
