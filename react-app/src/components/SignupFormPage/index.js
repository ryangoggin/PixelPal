import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import wallpaper from "../../static/pixelpal-wallpaper.png";
import './SignupForm.css';

function SignupPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(signUp(username, email, password))
      .then(() => {
        history.push(`/channels/@me`)
      })
  };

  const generateOptions = (start, end) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(<option key={i} value={i}>{i}</option>);
    }
    return options;
  };

  return (
    <div className="signup-page-container">
      <img className='wallpaper' src={wallpaper} alt="wallpaper" />
      <div className="signup-container">
        <div className="signup-heading">
          <span className="signup-header">Create an account</span>
        </div>
        <form className="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="email" id='email-label' className="signup-input-label">EMAIL</label>
          <input
            type="email"
            id="signup-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signup-input signup-email"
            required
          />
          <label htmlFor="username" id='username-label' className="signup-input-label">USERNAME</label>
          <input
            type="text"
            id="signup-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="signup-input signup-username"
            required
          />
          <label htmlFor="password" id='password-label' className="signup-input-label">PASSWORD</label>
          <input
            type="password"
            id="signup-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signup-input signup-password"
            required
          />
          <div className="signup-dob-label">DATE OF BIRTH</div>
          <div className="signup-dob">
            <select id="month" value={month} onChange={(e) => setMonth(e.target.value)} className="signup-dob-select" required>
              <option value="">Month</option>
              {generateOptions(1, 12)}
            </select>
            <select id="day" value={day} onChange={(e) => setDay(e.target.value)} className="signup-dob-select" required>
              <option value="">Day</option>
              {generateOptions(1, 31)}
            </select>
            <select id="year" value={year} onChange={(e) => setYear(e.target.value)} className="signup-dob-select" required>
              <option value="">Year</option>
              {generateOptions(1940, new Date().getFullYear())}
            </select>
          </div>
          <button type="submit" className="signup-submit-btn">Continue</button>
        </form>
        <Link to='/login' className="signup-already-account">Already have an account?</Link>
        <span className="signup-tos">By registering, you agree to PixelPal's Terms of Service and Privacy Policy.</span>
      </div>
    </div>
  );
}

export default SignupPage;
