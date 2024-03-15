import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
// import ChangeMeal from "./pages/ChangeMeal";
import EditDeliveryPopup from "./components/popups/EditDeliveryPopup";
// import Cart from "./pages/Cart";
import MyMenu from "./pages/MyMenu";
import ChangeBoxSizePopup from "./components/popups/ChangeBoxSizePopup";
import PlanSettingPopup from "./components/popups/PlanSettingPopup";
import CancelSubscriptionPopup from "./components/popups/CancelSubscriptionPopup";
// import OrderFlow from "./pages/OrderFlow";
// import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <>
      <Header />
      {/* <LandingPage /> */}
      {/* <OrderFlow /> */}
      <MyMenu />
      {/* <Cart /> */}
      {/* <ChangeMeal /> */}
      <Footer />
      <EditDeliveryPopup />
      <ChangeBoxSizePopup />
      <PlanSettingPopup />
      <CancelSubscriptionPopup />
    </>
  );
}

export default App;
