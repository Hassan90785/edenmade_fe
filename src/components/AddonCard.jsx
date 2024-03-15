export default function AddonCard() {
  return (
    <div className="col-sm-6 col-md-3 col-lg mt-3">
      <div className="card border-0 rounded-0 aj-drop-shadow">
        <div className="aj-badge">
          <p className="text-white body-text-extra-small my-0 py-0 fw-bold">
            Movie Night
          </p>
        </div>
        <img
          className="card-img-top rounded-0"
          src="/addon.png"
          alt="meal image"
        />
        <div className="card-body">
          <h5 className="card-title body-text-small fw-bold mb-0 lh-2">
            Parsely Sauce
          </h5>
          <p className="card-text body-text-small text-accent mt-1">
            <span className="fw-bold">+ £2.99</span> / Portion
          </p>
        </div>
      </div>
    </div>
  );
}
