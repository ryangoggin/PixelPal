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
		const data = await dispatch(login(email, password))
			.catch(
				async (res) => {
					const errData = await res.json();
					console.log(errData)
				}
			)
	};

	const handleDemoLogin = async (e) => {
		e.preventDefault();
		const data = await dispatch(login('demo@aa.io', 'password'))
		  .catch(
			async (res) => {
			  const errData = await res.json();
			  console.log(errData)
			}
		  )
	  };

	if (sessionUser) return <Redirect to="/channels/@me" />;



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
							required
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
							required
							onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<button className="login-button" type="submit">Log In</button>
						<button className="demo-button" onClick={handleDemoLogin}>Demo User</button>
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
