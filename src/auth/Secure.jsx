"use client";

import { useEffect } from "react";
import { useAuth } from "./authContext";
import { useNavigate } from "react-router-dom";

const SecurePage = (props) => {
  const { Comment, data } = props;
  const navigate = useNavigate();
  const { loadingAuthUser, authUser } = useAuth();
  useEffect(() => {
    if (
      !loadingAuthUser &&
      !authUser &&
      (data !== "landing" || data !== "order")
    ) {
      console.log("🚀 ~ file: Secure.jsx:16 ~ useEffect ~ data:", data);
      navigate("/");
    }
  }, [authUser, loadingAuthUser]);
  return (
    <>
      <Comment />
    </>
  );
};

export default SecurePage;
