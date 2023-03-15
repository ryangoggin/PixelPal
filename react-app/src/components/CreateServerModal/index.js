import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./CreateServer.css";

function CreateServerModal() {
	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [server_picture, setServerPicture] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		window.alert('hi')

		// if (password === confirmPassword) {
		// 	const data = await dispatch(signUp(username, email, password));
		// 	if (data) {
		// 		setErrors(data);
		// 	} else {
		// 		closeModal();
		// 	}
		// } else {
		// 	setErrors([
		// 		"Confirm Password field must be the same as the Password field",
		// 	]);
		// }
	};

	return (
		<>
			<div className='create-server-page'>
				<div className='create-server-modal'>
					<h1 className='create-server-header'>Create A Server </h1>
					<p className='create-server-para'>Your server is where your and your friends hang out. Make yours and start talking. </p>
					<form className='create-server-form' onSubmit={handleSubmit}>
						<ul>
							{errors.map((error, idx) => (
								<li key={idx}>{error}</li>
							))}
						</ul>
						<div className='create-server-form-group'>
							<label className='create-server-form-label'>
								Server Name
							</label>
							<br></br>
							<input className='create-server-form-input'
								type="text"
								id="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</div>
						<div className='create-server-form-group'>
							<label className='create-server-form-label'>
								Description
							</label>
							<br></br>
							<textarea className='create-server-form-input'
								type="text"
								id="description"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								required
							/>

						</div>
						<div className='create-server-form-group'>
							<label className='create-server-form-label'>
								Server Image
							</label>
							<br></br>
							<input className='create-server-form-input'
								type="text"
								id="server_picture"
								value={server_picture}
								onChange={(e) => setServerPicture(e.target.value)}
								required
							/>
						</div>

						<div>
							<button className='create-server-form-button' type="submit">Create Server</button>
						</div>

					</form>
				</div>
			</div>
		</>
	);
}

export default CreateServerModal;