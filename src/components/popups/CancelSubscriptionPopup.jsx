export default function CancelSubscriptionPopup() {
  return (
    <div
      className="modal fade"
      id="cancelSubscriptionPopup"
      tabIndex="-1"
      aria-labelledby="cancelSubscriptionPopupLabel"
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
            <div className="text-center px-3">
              <p className="mb-5 fw-medium">
                Are You Sure You want to Cancel
                <br />
                Your Subscription!
              </p>
              <h1 className="text-primary mt-5 mb-3 fw-bold">
                Here are Some Other ways that We can help you
              </h1>
              <div className="mb-5">
                <button className="btn btn-primary background-secondary border-0 body-text-small fw-700 px-2 py-3 lh-1 mx-2">
                  <i className="fi fi-sr-calendar-clock fs-1 d-block mb-2"></i>
                  Change <br /> Delivery Date
                </button>
                <button
                  className="btn btn-primary background-secondary border-0 body-text-small fw-700 px-2 py-3 lh-1 mx-2"
                  data-bs-toggle="modal"
                  data-bs-target="#changeBoxSizePopup"
                >
                  <i className="fi fi-rr-box-open-full fs-1 d-block mb-2"></i>
                  Change <br /> Box Size
                </button>
              </div>
              <button
                className="btn btn-primary aj-button body-text-small fw-700 px-4 me-3 mb-4"
                data-bs-dismiss="modal"
              >
                Cancel Anyway
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
