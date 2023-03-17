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
	const [description, setDescription] = useState("");
	const [server_picture, setServerPicture] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const user = useSelector(state => state.session.user);

	const handleSubmit = async (e) => {
		e.preventDefault();

		let newServer = {
			"name": name,
			"owner_id": user.id,
			"server_picture": server_picture
		}

		try {
			let createdServer = await dispatch(addServer(newServer));
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

export default ServerCreateModal;