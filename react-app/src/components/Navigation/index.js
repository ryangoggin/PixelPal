import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
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
	);
}

export default Navigation;
