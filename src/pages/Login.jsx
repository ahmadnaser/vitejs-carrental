import React from "react";
import Image from "../assets/images/image.png";
import { useNavigate } from 'react-router-dom';
import GoogleSvg from "../assets/images/icons8-google.svg";
import '../styles/login.css';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleLoginClick = (e) => {
    e.preventDefault();
    onLogin();
    navigate('/dashboard');
  };

  return (
    <div className="login-main">
      <div className="login-left">
        <div className="login-left-container">
          <div className="login-center">
            <p>Welcome to our car rental shop. We offer a wide range of vehicles to meet all your transportation needs. Enjoy your ride with UberX.</p>
            <div className="login-left-image">
              <img src={Image} alt=""/>
            </div>
            <button className="guest-button" onClick={handleLoginClick}>
              Go As Guest<span><i className="ri-glasses-2-line"></i></span>{" "}
            </button>
          </div>
          <div className="info">
            <a href="#">About Us</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <h2><span><i className="ri-taxi-line"></i></span>{" "}UberX</h2>
          </div>
          <div className="login-center">
            <h2>Welcome back!</h2>
            <form onSubmit={handleLoginClick}>
              <input type="email" placeholder="Email" required />
              <input type='password' placeholder="Password" required />
              <div className="login-center-options">
                <div className="remember-div">
                  <input type="checkbox" id="remember-checkbox" />
                  <label htmlFor="remember-checkbox">Remember me</label>
                </div>
                <a href="#" className="forgot-pass-link">Forgot password?</a>
              </div>
              <div className="login-center-buttons">
                <button type="submit">Log In</button>
                <button type="button">
                  <img src={GoogleSvg} alt="" />
                  Log In with Google
                </button>
              </div>
            </form>
          </div>
          <p className="login-bottom-p">Don't have an account? <a href="#">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
