import ProductSummary from "../ProductSummary";

export default function ChangeBoxSizePopup() {
  return (
    <div
      className="modal fade"
      id="changeBoxSizePopup"
      tabIndex="-1"
      aria-labelledby="changeBoxSizePopupLabel"
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
                <span>Manage Your Delivery</span>
              </p>
              <h1 className="text-primary mt-2 fw-bold">
                Monday, December 04 2023
              </h1>

              <div className="text-start my-4">
                <div className="plan-size plan-size-people d-flex align-items-center justify-content-between my-3">
                  <p className="mb-0">Number of People</p>
                  <div className="d-flex">
                    <div>
                      <input
                        type="radio"
                        id="planPeople1"
                        name="planPeople"
                        value="2"
                      />
                      <label
                        className="plan-size-label btn btn-primary w-auto px-4"
                        htmlFor="planPeople1"
                      >
                        2
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="planPeople2"
                        name="planPeople"
                        value="3"
                      />
                      <label
                        className="plan-size-label btn btn-primary w-auto px-4"
                        htmlFor="planPeople2"
                      >
                        3
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="planPeople3"
                        name="planPeople"
                        value="4"
                      />
                      <label
                        className="plan-size-label btn btn-primary w-auto px-4"
                        htmlFor="planPeople3"
                      >
                        4
                      </label>
                    </div>
                  </div>
                </div>
                <div className="plan-size plan-size-recipe d-flex align-items-center justify-content-between my-3">
                  <p className="mb-0">Recipe per Week</p>
                  <div className="d-flex">
                    <div>
                      <input
                        type="radio"
                        id="recipePerWeek1"
                        name="recipePerWeek"
                        value="2"
                      />
                      <label
                        className="plan-size-label btn btn-primary w-auto px-4"
                        htmlFor="recipePerWeek1"
                      >
                        2
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="recipePerWeek2"
                        name="recipePerWeek"
                        value="3"
                      />
                      <label
                        className="plan-size-label btn btn-primary w-auto px-4"
                        htmlFor="recipePerWeek2"
                      >
                        3
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="recipePerWeek3"
                        name="recipePerWeek"
                        value="4"
                      />
                      <label
                        className="plan-size-label btn btn-primary w-auto px-4"
                        htmlFor="recipePerWeek3"
                      >
                        4
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="recipePerWeek4"
                        name="recipePerWeek"
                        value="5"
                      />
                      <label
                        className="plan-size-label btn btn-primary w-auto px-4"
                        htmlFor="recipePerWeek4"
                      >
                        5
                      </label>
                    </div>
                  </div>
                </div>
                <ProductSummary />
                <div className="text-center mt-3">
                  <button
                    className="btn btn-transparent aj-button body-text-small fw-700 px-5 me-3"
                    data-bs-toggle="modal"
                    data-bs-target="#editDeliveryPopup"
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary aj-button body-text-small fw-700 px-4 me-3"
                    data-bs-dismiss="modal"
                  >
                    Update Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
