export default function EditDeliveryPopup() {
  return (
    <div
      className="modal fade"
      id="editDeliveryPopup"
      tabIndex="-1"
      aria-labelledby="editDeliveryPopupLabel"
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
              <div className="my-4">
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
            </div>
            <div className="text-center mb-3 mt-5 pt-5">
              <p className="fw-medium mb-2">Got Other Plans?</p>
              <button
                className="btn btn-primary aj-button body-text-small fw-700 px-4 me-3"
                data-bs-dismiss="modal"
              >
                <i className="fi fi-sr-undo-alt me-2 fs-6 lh-1 align-text-bottom"></i>
                Skip this Week
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
