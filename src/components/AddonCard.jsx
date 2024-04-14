import { useEffect, useState } from "react";
import { getSnacks } from "../rest_apis/restApi.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function AddonCard({orderDetails}) {
  const [snacks, setSnacks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const allSnacks = await getSnacks();
        setSnacks(allSnacks);
      } catch (error) {
        console.error("Error fetching getAllSnacks:", error);
      }
      console.log('orderDetails:: ', orderDetails)
    }

    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  return (
      <Slider {...settings}>
        {snacks.map((snack) => (
            <div key={snack.snacks_id}>
              <div className="col-sm-6 col-md-8 col-lg mt-3">
                <div className="card border-0 rounded-0 aj-drop-shadow">
                  <div className="aj-badge">
                    <p className="text-white body-text-extra-small my-0 py-0 fw-bold">
                      Movie Night
                    </p>
                  </div>
                  <img
                      className="card-img-top rounded-0"
                      src={`/edenmade/addon.png`}
                      alt="Snack Image"
                  />
                  <div className="card-body">
                    <h5 className="card-title body-text-small fw-bold mb-0 lh-2">
                      {snack.name}
                    </h5>
                    <p className="card-text body-text-small text-accent mt-1">
                      <span className="fw-bold">+ £{snack.price}</span> / Portion
                    </p>
                  </div>
                </div>
              </div>
            </div>
        ))}
      </Slider>
  );
}
