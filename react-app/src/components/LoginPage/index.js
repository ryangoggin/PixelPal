import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './LoginPage.css';
import SignupFormPage from '../SignupFormPage';
import { login } from '../../store/session';



function LoginPage() {

	const sessionUser = useSelector(state => state.session.user);
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState('');
  	const [password, setPassword] = useState('');

	const dispatch = useDispatch();

  	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = await dispatch(login(email, password));
		if (data) {
			setErrors(data);
		}

	};

	if (sessionUser) return <Redirect to="/channels/@me" />;

	// DEMO USER copied from airbnb
  // const demoUser = (e) => {
  //   e.preventDefault();
  //   return dispatch(sessionActions.login({'credential': 'Demo-lition', 'password': 'password'}))
  //     .then(closeModal)
  //     .catch(
  //       async (res) => {
  //         const data = await res.json();
  //         if (data && data.errors) setErrors(data.errors);
  //       }
  //     )
  // }


	// error handling provided by starter code, put this in wherever
			{/* <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul> */}




	return (
		<>
			<div className="login-page">
				<div className="login-box">
					<div className="login-headings">
						<span className="login-title">Welcome back!</span>
						<span className="login-subtitle">We're so excited to see you again!</span>
					</div>
					<form className="login-form" onSubmit={handleSubmit}>
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
							onChange={(e) => setEmail(e.target.value)}
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
							onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<button className="login-button" type="submit">Log In</button>
						<div className="register-group">
							<span className="label-register">Need an account?</span>
							<Link to='/register' className="register">Register</Link>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default LoginPage;
