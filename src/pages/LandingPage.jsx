import { useAuth } from "../auth/authContext";
import RecipeCard from "../components/RecipeCard";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    // Navigate to the "/orderFlow" route
    navigate("/order-flow");
  };
  const {   authUser } = useAuth();

  return (
    <>
      <section className="banner-section">
        <div className="container">
          <div className="row pt-md-5 pt-3">
            <div className="col-12 text-center my-4">
              <h1 className="my-3 mb-4">
                Eat healthy, save time, and hone your skills in the kitchen.
              </h1>
              <h2 className="mb-4">Now with more choices every week</h2>
              {!authUser?<button
                className="btn btn-primary aj-button body-text-small fw-700 px-4"
                onClick={handleButtonClick}
              >
                <i className="fi fi-rr-box-open-full me-2 fs-5 lh-1 align-middle"></i>
                View our Boxe
              </button>:null}
              
            </div>
          </div>
        </div>
      </section>

      <section className="why-us-section my-0">
        <div className="container">
          <div className="row py-md-5 py-3 text-center">
            <div className="col-12">
              <h1 className="text-primary mb-3">Why Edenmade.io</h1>
            </div>
            <div className="col-12 col-md-4 text-center px-3 mt-3">
              <i className="fi fi-sr-heart fs-3 text-primary"></i>
              <h2 className="fw-medium mb-1">Something for everyone</h2>
              <p className="mb-0">
                Set dietary preferences then just sit back and let us do the
                hard yards as we deliver everything you&apos;ll need to cook
                delicious dinners right to your door.
              </p>
            </div>
            <div className="col-12 col-md-4 text-center px-3 mt-3">
              <i className="fi fi-sr-restaurant fs-3 text-primary"></i>
              <h2 className="fw-medium mb-1">Near endless variety</h2>
              <p className="mb-0">
                Each week, our chefs curate 20 deliciously simple recipes
                featuring a variety of ingredients and flavors.
              </p>
            </div>
            <div className="col-12 col-md-4 text-center px-3 mt-3">
              <i className="fi fi-ss-soup fs-3 text-primary"></i>
              <h2 className="fw-medium mb-1">Little effort, big reward</h2>
              <p className="mb-0">
                All you need to do is follow our step-by-step recipe cards and
                you&apos;ll be eating picture perfect dinners that&apos;ll
                impress everyone every night.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="recipe-section my-5">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-12 my-auto">
              <h1>
                Over <span className="text-primary">20+</span> fresh recipes
                every week
              </h1>
              <p className="fw-medium mt-2">
                Easy meals designed by professional chefs and nutritionists
              </p>
            </div>
            <div className="col-md-4 col-12 text-end">
            {!authUser?<button
                className="btn btn-primary aj-button body-text-small fw-700 px-4"
                onClick={handleButtonClick}
              >
                <i className="fi fi-rr-box-open-full me-2 fs-5 lh-1 align-middle"></i>
                View our Boxe
              </button>:null}
            </div>
          </div>
          <div className="row">
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
          </div>
        </div>
      </section>

      <section className="cta-section my-5">
        <div className="container py-3 py-md-5">
          <div className="row py-md-5 py-3">
            <div className="col-12 text-center my-auto">
              <h2 className="fs-2 fw-bold mb-4">
                Take the stress out of meal time
              </h2>
              <h2 className="fs-5 mb-4">
                Eat healthy, save time, and hone your skills in the kitchen. Now
                with more choices every week
              </h2>
              {!authUser?<button
                className="btn btn-primary aj-button body-text-small fw-700 px-4"
                onClick={handleButtonClick}
              >
                <i className="fi fi-rr-box-open-full me-2 fs-5 lh-1 align-middle"></i>
                View our Boxe
              </button>:null}
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section container">
        <div className="row">
          <div className="col-12">
            <h1 className="mb-3">Frequently Asked Questions</h1>
          </div>
        </div>
      </section>
    </>
  );
}
