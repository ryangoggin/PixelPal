import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './LoginPage.css';
import wallpaper from "../../static/pixelpal-wallpaper.png";
import { login } from '../../store/session';

function LoginPage() {
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();

	const dispatch = useDispatch();

	useEffect(() => {
	}, [errors]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await dispatch(login(email, password))
				.then(() => {
					history.push(`/channels/@me`)
				})
		} catch (err) {
			setErrors([err.message]);
		}
	};

	const handleDemoLogin = async (e) => {
		e.preventDefault();
		await dispatch(login('demo@aa.io', 'password'))
			.then(() => {
				history.push(`/channels/@me`)
			})
	};
	const handleDemoLogin2 = async (e) => {
		e.preventDefault();
		await dispatch(login('marnie@aa.io', 'password'))
			.then(() => {
				history.push(`/channels/@me`)
			})
	};

	return (
		<>
			<img className='wallpaper' src={wallpaper} alt="wallpaper" />
			<div className="login-page">
				<div className="login-box">
					<div className="login-headings">
						<span className="login-title">Welcome back!</span>
						<span className="login-subtitle">We're so excited to see you again!</span>
						{errors.length > 0 && (
							<span className='error-msgs'>{`${errors}. Please try again.`}</span>
						)}
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
						<button className="demo-button" onClick={handleDemoLogin}>Demo User 1</button>
						<button className="demo-button" onClick={handleDemoLogin2}>Demo User 2</button>
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
