import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="homepage">
      {isLoaded && (
        <div className="login-page">
          <div className="login-box">
            <div className="login-headings">
              <span className="login-title">Welcome back!</span>
              <span className="login-subtitle">We're so excited to see you again!</span>
            </div>
            <form className="login-form">
              <div className="form-group">
                <label className="form-label" htmlFor="emailOrPhone">
                  EMAIL OR PHONE NUMBER
                </label>
                <br></br>
                <input
                  className="form-input"
                  type="text"
                  id="emailOrPhone"
                  name="emailOrPhone"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="password">
                  PASSWORD
                </label>
                <br></br>
                <input
                  className="form-input"
                  type="password"
                  id="password"
                  name="password"
                />
              </div>
              <button className="login-button" type="submit">Log In</button>
              <div className="register-group">
                <span className="label-register">Need an account?</span>
                <span className="register">Register</span>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
