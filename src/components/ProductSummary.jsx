export default function ProductSummary() {
  return (
    <div id="productSummary">
      <div className="w-100 border border-2 py-2 px-3">
        <p className="body-text-small fw-bold mb-1">Price Summary</p>
        <p className="body-text-small lh-sm fw-500">
          4 meals for 3 people per week
          <br />
          12 total servings
        </p>
      </div>
      <div className="w-100 border border-2 border-top-0 border-bottom-0 py-2 px-3">
        <div className="row">
          <div className="col-6">
            <p className="body-text-small fw-bold mb-1">Box Price</p>
          </div>
          <div className="col-6">
            <p className="body-text-small fw-bold mb-1 text-end">£47.99</p>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <p className="body-text-small fw-bold mb-1">Price Per Serving</p>
          </div>
          <div className="col-6">
            <p className="body-text-small fw-bold mb-1 text-end">£4.00</p>
          </div>
        </div>
      </div>
      <div className="w-100 border border-2 py-2 px-3 background-secondary">
        <div className="row">
          <div className="col-6">
            <p className="body-text-small fw-bolder mb-1">Total Price</p>
          </div>
          <div className="col-6">
            <p className="body-text-small fw-bolder mb-1 text-end">£47.99</p>
          </div>
        </div>
      </div>
    </div>
  );
}
