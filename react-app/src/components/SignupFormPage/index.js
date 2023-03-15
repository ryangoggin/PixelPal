import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/channels/@me" />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // custom frontend validations


  };

  const generateOptions = (start, end) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(<option key={i} value={i}>{i}</option>);
    }
    return options;
  };

  return (
    <div className="signup-container">
      <h1 className="signup-header">Create an account</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label htmlFor="email" className="signup-input-label">EMAIL</label>
        <input
          type="email"
          id="signup-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="signup-input signup-email"
        />
        <label htmlFor="username" className="signup-input-label">USERNAME</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="signup-input signup-username"
        />
        <label htmlFor="password" className="signup-input-label">PASSWORD</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="signup-input signup-password"
        />
        <div className="signup-dob">
          <select id="month" value={month} onChange={(e) => setMonth(e.target.value)} className="signup-dob-select">
            <option value="">Month</option>
            {generateOptions(1, 12)}
          </select>
          <select id="day" value={day} onChange={(e) => setDay(e.target.value)} className="signup-dob-select">
            <option value="">Day</option>
            {generateOptions(1, 31)}
          </select>
          <select id="year" value={year} onChange={(e) => setYear(e.target.value)} className="signup-dob-select">
            <option value="">Year</option>
            {generateOptions(1900, new Date().getFullYear())}
          </select>
        </div>
        <button type="submit" className="signup-submit-btn">Continue</button>
      </form>
      <span className="signup-already-account">Already have an account?</span>
    </div>
  );
}


export default SignupPage;
