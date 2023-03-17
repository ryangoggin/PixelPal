import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { editServer } from "../../store/server";
import "./EditServer.css";

function ServerEditModal({ server }) {
	const dispatch = useDispatch();

	const [newServer, setNewServer] = useState({ ...server })
	const [errors, setErrors] = useState([]);
	const [formErrors, setFormErrors] = useState({});
	const { closeModal } = useModal();

	const handleUpdate = async (e) => {
		setNewServer({ ...newServer, [e.target.name]: e.target.value })
	}

	const validateForm = () => {
		let err = {};

		if (newServer.name === '') {
			err.name = 'Server Name is required';
		}

		if (newServer.server_picture === null) {
			newServer.server_picture = "";
		}

		if (newServer.server_picture !== "" && !(newServer.server_picture.endsWith('.jpg') || newServer.server_picture.endsWith('.jpeg') || newServer.server_picture.endsWith('.png'))) {
			err.serverImage = 'Server Image must end in .jpg, .jpeg, or .png';
		}

		setFormErrors({ ...err });
		return (Object.keys(err).length === 0);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm(newServer)) {
			return;
		};

		try {
			let edittedServer = await dispatch(editServer(server.id, newServer));
			if (edittedServer) {
				// history.push(`/channels/${createdServer.id}/${createdServer.channels[0].id}`)
				closeModal();
			}
		}
		catch (response) {
			const data = await response.json();
			if (data && data.errors) setErrors(data.errors);
		}
	};

	return (
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
	);
}

export default ServerEditModal;