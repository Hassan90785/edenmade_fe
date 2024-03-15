export default function Header() {
  return (
    <div className="aj-drop-shadow background-white">
      <div className="container">
        <nav className="navbar navbar-expand-lg bg-body-tertiary background-white">
          <div className="container-fluid px-0">
            <a className="navbar-brand aj-site-logo" href="/">
              EDENMADE.IO
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    About Us
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    How it Works
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Our Recipes
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Contact Us
                  </a>
                </li>
              </ul>
              <div className="d-flex">
                {/* For Unregistered User */}
                {/* <button className="btn btn-primary">Login</button> */}

                {/* For Registered User */}
                <button className="btn btn-primary mx-3">My Menu</button>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item dropdown text-primary d-flex align-items-center">
                    <i className="fi fi-sr-user"></i>
                    <a
                      className="nav-link dropdown-toggle text-primary"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Account
                    </a>

                    <ul className="dropdown-menu aj-drop-shadow">
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#planSettingPopup"
                        >
                          Plan Settings
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Account Info
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          My Cart
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Payment Methods
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Log Out
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
