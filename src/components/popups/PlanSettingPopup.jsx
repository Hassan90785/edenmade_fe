export default function PlanSettingPopup() {
  return (
    <div
      className="modal fade"
      id="planSettingPopup"
      tabIndex="-1"
      aria-labelledby="planSettingPopupLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <div className="text-end">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fi fi-sr-rectangle-xmark"></i>
              </button>
            </div>
            <div className="text-center">
              <p className="mb-0 d-flex align-items-center fw-medium justify-content-center">
                <i className="fi fi-sr-pen-square me-2 fs-4 lh-1 text-primary"></i>
                <span>Plan Settings</span>
              </p>
              <div className="my-4 text-start">
                {/* MEAL PREFERENCES */}
                <div>
                  <p className="mb-2 fw-medium">Meal Preferences</p>
                  <form>
                    <label className="body-text-small">
                      What Kind of Recipes do you Like
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="selectedRecipe"
                      placeholder="Seasonal"
                    />
                    <div className="row mt-2">
                      <div className="col-12 col-md-6">
                        <label className="body-text-small">
                          Number of People
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="numberOfPeople"
                          placeholder="3 Persons"
                        />
                      </div>
                      <div className="col-12 col-md-6">
                        <label className="body-text-small">
                          Recipes per week
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          name="recipePerWeek"
                          placeholder="3 meals"
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <hr />
                {/* DELIVERY */}
                <div>
                  <p className="mb-2 fw-medium">Delivery</p>
                  <form>
                    <label className="body-text-small">
                      Upcoming Delivery Date
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="deliveryDate"
                      placeholder="Mon, Dec 04, 2023"
                    />
                  </form>
                </div>
                <hr />
                {/* PAYMENT DETAILS */}
                <div>
                  <p className="mb-2 fw-medium">Payment Details</p>
                  <div className="w-100 border border-2 py-1 px-3">
                    <div className="row">
                      <div className="col-6">
                        <p className="body-text-extra-small fw-medium mb-1">
                          Weekly Subscription
                        </p>
                      </div>
                      <div className="col-6">
                        <p className="body-text-extra-small fw-bold mb-1 text-end">
                          £39.99
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-100 border border-2 border-top-0 py-1 px-3">
                    <div className="row">
                      <div className="col-6">
                        <p className="body-text-extra-small fw-medium mb-1">
                          Next Payment Due
                        </p>
                      </div>
                      <div className="col-6">
                        <p className="body-text-extra-small fw-bold mb-1 text-end">
                          Mon, Dec 11, 2023
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                {/* STATUS */}
                <div>
                  <div className="row mb-2">
                    <div className="col-6">
                      <p className="mb-0 fw-medium">Status</p>
                    </div>
                    <div className="col-6 text-end">
                      <p className="mb-0 text-primary body-text-small fw-medium">
                        Your Plan is Active
                      </p>
                    </div>
                  </div>
                  <p className="body-text-small mb-1">Want to take a break?</p>
                  <p
                    className="body-text-extra-small mb-2"
                    style={{ lineHeight: 1.4 }}
                  >
                    If you are out of town or simply want a break from cooking,
                    you can pause your subscription and
                    <a className="text-primary ms-1" href="#">
                      skip your weekly delivery
                    </a>
                  </p>
                  <p className="body-text-small mb-1">Want to Cancel</p>
                  <p
                    className="body-text-extra-small mb-1"
                    style={{ lineHeight: 1.4 }}
                  >
                    We are sorry to see you go.
                    <br />
                    Please note that canceling your subscription will also
                    remove any earned promotions and rewards.
                    <a
                      className="text-primary ms-1"
                      href="#"
                      data-bs-toggle="modal"
                      data-bs-target="#cancelSubscriptionPopup"
                    >
                      Cancel Subscription.
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center mb-3 mt-4">
              <button
                className="btn btn-primary aj-button body-text-small fw-700 px-5 me-3"
                data-bs-dismiss="modal"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
