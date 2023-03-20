import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
import { useModal } from "../../context/Modal";
import { deleteServer, getServers } from "../../store/server";
import "./ServerDelete.css"

function ServerDeleteModal({ server }) {
	const dispatch = useDispatch();
	const user = useSelector(state => state.session.user);
	const history = useHistory();
	const { closeModal } = useModal();
	const [errors, setErrors] = useState([])

	const handleDelete = async (e) => {
		e.preventDefault();

		try {
			await dispatch(deleteServer(server.id));
			await dispatch(getServers(user));
			closeModal();
			history.push(`/channels/@me`);

		}
		catch (response) {
			const data = await response.json();
			if (data && data.errors) setErrors(data.errors);
		}
	}

	const handleNo = () => {
		closeModal();
	}

	return (
		<div className='delete-server-modal'>
			<div className='delete-server-modal-content'>
				<form>
					<h1 className='delete-server-header'>Delete '{server.name}'</h1>
					<p className='delete-server-para'>Are you sure you want to delete <span style={{ fontWeight: 'bolder' }}>'{server.name}'</span>? This action cannot be undone.</p>
					<div>
						<span><button type="button" onClick={handleDelete} className="delete-server-form-button">Delete Server</button></span>
						<span onClick={closeModal} className="delete-form-cancel">Cancel</span>
					</div>
				</form>
			</div>
		</div>
	)
}

export default ServerDeleteModal;