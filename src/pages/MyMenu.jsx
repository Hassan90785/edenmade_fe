import AddonCard from "../components/AddonCard";
import RecipeCard from "../components/RecipeCard";
import { useNavigate } from "react-router-dom"; 
import React, { useState, useEffect } from 'react';
import { useAuth } from "../auth/authContext";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ChangeBoxSizePopup from "../components/popups/ChangeBoxSizePopup";


export default function MyMenu() {
  const navigate = useNavigate();
  const { 
    authUser, 
  } = useAuth();
  const handleButtonClickMyMenu = () => {
    // Navigate to the "/orderFlow" route
    navigate("/change-meal");
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleButtonClickForSelectedMeal = () => {
    console.log(
      "🚀 ~ file: OrderFlow.jsx:27 ~ handleButtonClickMyMenu ~ consol:"
    );
    // Navigate to the "/orderFlow" route
    navigate("/selected-meals-cart");
  };
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(); 
  const [orderDetails, setOrderDetails] = useState();
  const [orderDetail, setOrderDetail] = useState();
  const [userOrderRecipesDetail, setUserOrderRecipesDetail] = useState(null);
 
const fetchUserData = async () => {
  const endpoint = 'http://localhost:8800/getUserFromEmail'; 
  const email =  authUser.email;   

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("data",data)
    fetchOrderDetails(data[0].id)
    setUserData(data)
  } catch (error) {
    console.error('Error:', error.message);
    // Handle the error
  }
};
const fetchOrderDetails = async (userId) => {
  const endpoint = 'http://localhost:8800/orderdetails';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    // Check if the request was successful (status code 2xx)
    if (response.ok) {
      // Parse the response JSON
      const data = await response.json();
      console.log("orderde",data)
      setOrderDetails(data);
      setOrderDetail(data[0])
      getUserOrderRecipesDetail(data[0].id)
      return data;
    } else {
      // Handle the error, e.g., by throwing an error or returning an error object
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    // Handle network errors, e.g., connection refused, timeout, etc.
    console.error('Error:', error.message);
    throw error; // Rethrow the error to let the calling code handle it
  }
};
const getUserOrderRecipesDetail = async (orderDetailId) => {
  try {
    const response = await fetch('http://localhost:8800/userOrderRecipesDetail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderDetailId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to fetch data');
    }

    const data = await response.json();
   
    setUserOrderRecipesDetail(data);
    setError(null); // Clear any previous errors
  } catch (error) {
    console.error('Error fetching data:', error.message);
    setUserOrderRecipesDetail(null); // Clear previous data
    setError(error.message);
  }
};
  
useEffect(() => {
  fetchUserData();
}, []); 
 
  useEffect(() => {
    setTimeout(() => {
      fetchUserData();
      
    }, 1000);
   ;
  }, [authUser,authUser?.email]);  
  const [showPopup, setShowPopup] = useState(false);
  return (
    <div className="bg-doodle py-md-5 py-3">
      
      <div>
      {/* Your other content */}
      <button onClick={() => setShowPopup(true)}>Open Popup</button>

      {showPopup && <ChangeBoxSizePopup onClose={() => setShowPopup(false)} />}
    </div>
      <div className="container my-md-5 my-3">
        <div className="row">
          <div className="col-12 background-primary rounded rounded-pill py-3 px-5 bg-vegetables">
            <div className="row">
              <div className="col-md-4 col-12">
                <p className="text-white body-text-extra-small mb-0">
                  Upcomming
                </p>
                <h1 className="text-white my-2 fs-2"> {orderDetail&& new Date(orderDetail.deliveryDate).toLocaleString('default', { weekday: 'short' })}, {orderDetail&& new Date(orderDetail.deliveryDate).toLocaleString('default', { month: 'short' })}  {orderDetail&& new Date(orderDetail.deliveryDate).toLocaleString('default', { day: 'numeric' })}</h1>
               {/* <>{JSON.stringify(orderDetail)}</> */}
                <p
                  className="text-white body-text-extra-small mb-0 d-flex align-items-center"
                  style={{ cursor: "pointer" }}
                  data-bs-toggle="modal"
                  data-bs-target="#editDeliveryPopup"
                >
                  {/* <i className="fi fi-sr-pen-square me-2 fs-6 lh-1"></i> */}
                  {/* <span className="text-decoration-underline">
                    Edit Delivery by Dec 04
                  </span> */}
                </p>
              </div>
              <div className="col-md-8 col-12 d-flex align-items-center">
                <button className="btn btn-transparent text-white">
                  <i className="fi fi-sr-angle-left fs-4"></i>
                </button>
                <div className="upcoming-date-wrapper mx-2">

                {orderDetails?.slice(0, 4)?.map((delivery,index) => (  
                    <div
                    key={index}
                    className={`upcoming-date   text-center mx-2 ${orderDetail.id === delivery.id ? 'active' : ''}`}
                    onClick={() => {
                      getUserOrderRecipesDetail(delivery.id);
                      setOrderDetail(delivery);
                    }}
                  >
        <p className="text-white body-text-extra-small mb-0">
          {new Date(delivery.deliveryDate).toLocaleString('default', { weekday: 'short' })}</p>
      <h1 className="text-white">
          {new Date(delivery.deliveryDate).toLocaleString('default', {   day: 'numeric' })} </h1>
        <p className="text-white body-text-extra-small mb-0">
          {new Date(delivery.deliveryDate).toLocaleString('default', { month: 'short' })}</p>
      </div>
     
     
      ))}
                 
                </div>
                <button className="btn btn-transparent text-white">
                  <i className="fi fi-sr-angle-right fs-4"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12">
            <div className="row">
              <div className="col-md-6 col-12">
                <h1>Your Order</h1> 
                
                <p className="fw-medium mt-2">
                  We picked <span className="text-primary">{userOrderRecipesDetail?.length} meals</span> we
                  thought you would like.
                </p>
              </div>
              <div className="col-md-6 col-12 text-end my-auto">
                <button
                  className="btn btn-primary aj-button body-text-small fw-700 px-4 me-3"
                  onClick={handleButtonClickMyMenu}
                >
                  <i className="fi fi-sr-restaurant me-2 fs-5 lh-1 align-middle"></i>
                  Change Meals
                </button>
                <button onClick={handleOpen} className="btn btn-primary aj-button body-text-small fw-700 px-3">
                  <i className="fi fi-rr-box-open-full fs-5 lh-1 align-middle"></i>
                </button>
 
              </div>
            </div> 
            <div className="row mb-5">
              {userOrderRecipesDetail?.map((item,index)=><RecipeCard  categoryName={item.categoryName} recipeName={item.recipeName} />)}
              
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12">
            <div className="row">
              <div className="col-md-8 col-12">
                <h1>Products you’ll Love</h1>
                <p className="fw-medium mt-2">
                  Round out your meal planning with desserts, sides, snacks and
                  more!
                </p>
              </div>
              <div className="col-md-4 col-12 text-end my-auto">
                <button
                  className="btn btn-primary aj-button body-text-small fw-700 px-4 me-3"
                  onClick={handleButtonClickForSelectedMeal}
                >
                  <i className="fi fi-sr-shopping-cart me-2 fs-5 lh-1 align-middle"></i>
                  Shop for More
                </button>
              </div>
            </div>
            <div className="row">
              <AddonCard />
              <AddonCard />
              <AddonCard />
              <AddonCard />
              <AddonCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
