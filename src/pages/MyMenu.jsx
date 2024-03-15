import AddonCard from "../components/AddonCard";
import RecipeCard from "../components/RecipeCard";

export default function MyMenu() {
  return (
    <div className="bg-doodle py-md-5 py-3">
      <div className="container my-md-5 my-3">
        <div className="row">
          <div className="col-12 background-primary rounded rounded-pill py-3 px-5 bg-vegetables">
            <div className="row">
              <div className="col-md-4 col-12">
                <p className="text-white body-text-extra-small mb-0">
                  Upcomming
                </p>
                <h1 className="text-white my-2 fs-2">Mon, Dec 04</h1>
                <p
                  className="text-white body-text-extra-small mb-0 d-flex align-items-center"
                  style={{ cursor: "pointer" }}
                  data-bs-toggle="modal"
                  data-bs-target="#editDeliveryPopup"
                >
                  <i className="fi fi-sr-pen-square me-2 fs-6 lh-1"></i>
                  <span className="text-decoration-underline">
                    Edit Delivery by Dec 04
                  </span>
                </p>
              </div>
              <div className="col-md-8 col-12 d-flex align-items-center">
                <button className="btn btn-transparent text-white">
                  <i className="fi fi-sr-angle-left fs-4"></i>
                </button>
                <div className="upcoming-date-wrapper mx-2">
                  <div className="upcoming-date active text-center mx-2">
                    <p className="text-white body-text-extra-small mb-0">Mon</p>
                    <h1 className="text-white">04</h1>
                    <p className="text-white body-text-extra-small mb-0">Dec</p>
                  </div>
                  <div className="upcoming-date text-center mx-2">
                    <p className="text-white body-text-extra-small mb-0">Mon</p>
                    <h1 className="text-white">11</h1>
                    <p className="text-white body-text-extra-small mb-0">Dec</p>
                  </div>
                  <div className="upcoming-date text-center mx-2">
                    <p className="text-white body-text-extra-small mb-0">Mon</p>
                    <h1 className="text-white">18</h1>
                    <p className="text-white body-text-extra-small mb-0">Dec</p>
                  </div>
                  <div className="upcoming-date text-center mx-2">
                    <p className="text-white body-text-extra-small mb-0">Mon</p>
                    <h1 className="text-white">25</h1>
                    <p className="text-white body-text-extra-small mb-0">Dec</p>
                  </div>
                </div>
                <button className="btn btn-transparent text-white">
                  <i className="fi fi-sr-angle-right fs-4"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12">
            <div className="row">
              <div className="col-md-6 col-12">
                <h1>Your Order</h1>
                <p className="fw-medium mt-2">
                  We picked <span className="text-primary">3 meals</span> we
                  thought you would like.
                </p>
              </div>
              <div className="col-md-6 col-12 text-end my-auto">
                <button className="btn btn-primary aj-button body-text-small fw-700 px-4 me-3">
                  <i className="fi fi-sr-restaurant me-2 fs-5 lh-1 align-middle"></i>
                  Change Meals
                </button>
                <button className="btn btn-primary aj-button body-text-small fw-700 px-3">
                  <i className="fi fi-rr-box-open-full fs-5 lh-1 align-middle"></i>
                </button>
              </div>
            </div>
            <div className="row mb-5">
              <RecipeCard />
              <RecipeCard />
              <RecipeCard />
              <RecipeCard />
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12">
            <div className="row">
              <div className="col-md-8 col-12">
                <h1>Products you’ll Love</h1>
                <p className="fw-medium mt-2">
                  Round out your meal planning with desserts, sides, snacks and
                  more!
                </p>
              </div>
              <div className="col-md-4 col-12 text-end my-auto">
                <button className="btn btn-primary aj-button body-text-small fw-700 px-4 me-3">
                  <i className="fi fi-sr-shopping-cart me-2 fs-5 lh-1 align-middle"></i>
                  Shop for More
                </button>
              </div>
            </div>
            <div className="row">
              <AddonCard />
              <AddonCard />
              <AddonCard />
              <AddonCard />
              <AddonCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
