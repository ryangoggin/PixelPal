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
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <div className="login-page">
          <div className="login-box">
            <h1 className="login-title">Welcome back!</h1>
            <h3 className="login-subtitle">We're so excited to see you again!</h3>
            <form className="login-form">
              <div className="form-group">
                <label className="form-label" htmlFor="emailOrPhone">
                  Email or Phone Number:
                </label>
                <input
                  className="form-input"
                  type="text"
                  id="emailOrPhone"
                  name="emailOrPhone"
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="password">
                  Password:
                </label>
                <input
                  className="form-input"
                  type="password"
                  id="password"
                  name="password"
                />
              </div>
              <div className="form-group">
                <p className="form-text">
                  Need an account? <a className="form-link" href="/signup">Register</a>
                </p>
              </div>
              <button className="form-button" type="submit">Log In</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
