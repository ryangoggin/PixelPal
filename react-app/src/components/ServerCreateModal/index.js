import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
import { useModal } from "../../context/Modal";
import { addServer } from "../../store/server";
import "./ServerCreate.css";

function ServerCreateModal() {
	const dispatch = useDispatch();
	const history = useHistory();

	const [name, setName] = useState("");
	const [server_picture, setServerPicture] = useState("");
	const [errors, setErrors] = useState([]);
	const [formErrors, setFormErrors] = useState({});
	const { closeModal } = useModal();

	const user = useSelector(state => state.session.user);

	const validateForm = (newServer) => {
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

		let newServer = {
			"name": name,
			"owner_id": user.id,
			"server_picture": server_picture
		}

		if (!validateForm(newServer)) {
			return;
		};

		try {
			let createdServer = await dispatch(addServer(newServer, user.username));
			if (createdServer) {
				history.push(`/channels/${createdServer.id}/${createdServer.channels[0].id}`)
				closeModal();
			}
		}
		catch (response) {
			const data = await response.json();
			if (data && data.errors) setErrors(data.errors);
		}

	};

	return (
		<div className='create-server-modal'>
			<div className='create-server-modal-content'>
				<form className='create-server-form' onSubmit={handleSubmit}>
					<h1 className='create-server-header'>Create A Server </h1>
					<p className='create-server-para'>Your server is where your and your friends hang out. Make yours and start talking. </p>
					<ul>
						{errors.map((error, idx) => (
							<li key={idx}>{error}</li>
						))}
					</ul>
					<div className='create-server-form-group'>
						<span className='create-server-form-label'>
							Server Name
						</span>
						<input style={{ height: '30px' }} className='modal-input'
							type="text"
							id="name"
							name="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<div className='create-server-error'>{formErrors.name}</div>
					</div>
					<br></br>
					<div className='create-server-form-group'>
						<span className='create-server-form-label'>
							Server Image
						</span>
						<br></br>
						<input style={{ height: '30px' }} className='modal-input'
							type="text"
							id="server_picture"
							name="server_picture"
							value={server_picture}
							onChange={(e) => setServerPicture(e.target.value)}
						/>
						<div className='create-server-error'>{formErrors.serverImage}</div>
					</div>
					<br></br>
					<div>
						<button
							disabled={!name}
							className={!name ? "disabled-btn" : "edit-server-form-button"} type="submit">Create Server</button>
						<span onClick={closeModal} className="channel-update-form-cancel">Cancel</span>
					</div>

				</form>
			</div >
		</div >
	);
}

export default ServerCreateModal;