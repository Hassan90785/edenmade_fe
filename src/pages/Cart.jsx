import ProductSummary from "../components/ProductSummary";
import RecipeCard from "../components/RecipeCard";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const handleButtonClickMyMenu = () => {
    // console.log(
    //   "🚀 ~ file: OrderFlow.jsx:27 ~ handleButtonClickMyMenu ~ consol:"
    // );
    // Navigate to the "/orderFlow" route
    navigate("/change-meal");
  };
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
            <div className="row">
              <RecipeCard />
              <RecipeCard />
              <RecipeCard />
              <RecipeCard />
            </div>
            <div className="row my-5 ">
              <div className="col-md-6 col-12">
                <div className="d-flex align-items-center">
                  <button className="btn btn-primary aj-button body-text-small fw-700 px-3 me-4">
                    <i className="fi fi-bs-plus fs-5 lh-1 align-middle"></i>
                  </button>
                  <div className="d-inline-block">
                    <h1>Add-ons</h1>
                    <p className="fw-medium my-0">
                      Shop for desserts, Snacks and More
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12 text-end my-auto">
                <button className="btn btn-transparent aj-button body-text-small fw-700 px-5 me-3">
                  Empty Cart
                </button>
                <button
                  className="btn btn-primary aj-button body-text-small fw-700 px-5"
                  onClick={handleButtonClickMyMenu}
                >
                  Update Cart
                </button>
              </div>
            </div>
          </div>
          <div className="col-12">
            <ProductSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
