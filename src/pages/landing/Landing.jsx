import React, { useEffect } from "react";
import "./landing.css";

import landingImage from "../../assets/landingImage.jpg";
import { useAuth } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    user && navigate("/");
  });

  return (
    <>
      <div className="landing-container">
        <img
          className="landing-image"
          src={landingImage}
          alt="coffee-and-keyboard"
        />
        <div className="intro mr-2">
          <h1 className="px-1">Save Notes and Ideas </h1>
          <h1 className="primary-text px-1">at one place...</h1>
          <p className="text-md mt-2 fw-700 px-1">
            Dazzle notes provides an easier way to save lists, notes and more...
          </p>
        </div>
      </div>
    </>
  );
};

export { Landing };
