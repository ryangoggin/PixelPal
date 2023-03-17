import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
import { useModal } from "../../context/Modal";
import { addServer } from "../../store/server";
import "./EditServer.css";

function ServerEditModal({ server }) {
	const dispatch = useDispatch();
	const history = useHistory();

	const [newServer, setNewServer] = useState({ ...server })
	const [errors, setErrors] = useState([]);
	const [formErrors, setFormErrors] = useState({});
	const { closeModal } = useModal();

	const user = useSelector(state => state.session.user);

	const handleUpdate = async (e) => {
		setNewServer({ ...newServer, [e.target.name]: e.target.value })
	}

	const validateForm = () => {
		let err = {};

		if (newServer.name === '') {
			err.name = 'Server Name is required';
		}

		if (newServer.server_picture !== "" && !(newServer.server_picture.endsWith('.jpg') || newServer.server_picture.endsWith('.jpeg') || newServer.server_picture.endsWith('.png'))) {
			err.serverImage = 'Server Image must end in .jpg, .jpeg, or .png';
		}

		setFormErrors({ ...err });

		return true;
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		validateForm();

		// let newServer = {
		// 	"name": name,
		// 	"owner_id": user.id,
		// 	"server_picture": server_picture
		// }

		// try {
		// 	let createdServer = await dispatch(addServer(newServer));
		// 	if (createdServer) {
		// 		history.push(`/channels/${createdServer.id}/${createdServer.channels[0].id}`)
		// 		closeModal();
		// 	}
		// }
		// catch (response) {
		// 	const data = await response.json();
		// 	if (data && data.errors) setErrors(data.errors);
		// }

		console.log('checking validation')
	};

	return (
		<>
			<div className='edit-server-page'>
				<div className='edit-server-modal'>
					<h1 className='edit-server-header'>Edit A Server </h1>
					<p className='edit-server-para'>Your server is where your and your pals hang out. Personalize it to make it yours. </p>
					<form className='edit-server-form' onSubmit={handleSubmit}>
						<ul>
							{errors.map((error, idx) => (
								<li key={idx}>{error}</li>
							))}
						</ul>
						<div className='edit-server-form-group'>
							<label className='edit-server-form-label'>
								Server Name
							</label>
							<br></br>
							<input className='edit-server-form-input'
								type="text"
								id="name"
								name="name"
								value={newServer.name}
								onChange={handleUpdate}

							/>
							<div className='edit-server-error'>{formErrors.name}</div>
						</div>
						<br></br>
						<div className='edit-server-form-group'>
							<label className='edit-server-form-label'>
								Server Image
							</label>
							<br></br>
							<input className='edit-server-form-input'
								type="text"
								id="server_picture"
								name="server_picture"
								value={newServer.server_picture}
								onChange={handleUpdate}
								required
							/>
							<div className='edit-server-error'>{formErrors.serverImage}</div>
						</div>
						<br></br>
						<div>
							<button
								disabled={!newServer.name}
								className={!newServer.name ? "disabled-btn" : "edit-server-form-button"} type="submit">Update Server</button>
						</div>

					</form>
				</div>
			</div>
		</>
	);
}

export default ServerEditModal;