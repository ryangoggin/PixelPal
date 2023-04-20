import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { addServerMember, getServer, getServers } from "../../store/server";
import { getServerChannels } from "../../store/channels";
import "./ServerCreate.css";

function ServerMemberAdd({ server }) {
	let members = server.members;

	const dispatch = useDispatch();
	const [errors, setErrors] = useState([]);

	const user = useSelector(state => state.session.user);
	let friends = useSelector(state => state.friends)

	friends = Object.values(friends);

	const { closeModal } = useModal();

	const isMember = (friend) => {
		for (let member of members) {
			if (friend.id === member.id) return true;
		}
		return false;
	}

	const handleAdd = async (e, friend) => {
		e.preventDefault();

		const data = await dispatch(addServerMember(server.id, friend));

		if (data) {
			setErrors(data);
		} else {
			closeModal();
			dispatch(getServers(user));
			dispatch(getServer(server.id));
			dispatch(getServerChannels(server.id));
		}
	}

	return (
		<div className='create-server-modal'>
			<div className='create-server-modal-content'>
				<h1 className='create-server-header'>Add a Friend to {server.name} </h1>
				{errors.length > 0 && (
					<ul className='modal-errors'>
						{errors.map((error, idx) => <li key={idx} className='modal-error'>{error}</li>)}
					</ul>
				)}
				{friends.map(friend => (
					<>
						{!isMember(friend) ?
							<div onClick={(e) => handleAdd(e, friend)} className='friendslist-user-container' id="server-members-add-container" key={`member${friend.id}`}>
								<div className='friendslist-pic-username'>
									<div> <img className='friendslist-profile-image' src={friend.prof_pic} alt='profile_pic_user' /> </div>
									<div className='friendslist-username'> {friend.username.split("#")[0]} </div>
									<div className='friendslist-tag'> #{friend.username.split("#")[1]} </div>
								</div>
							</div>
							:
							""}
					</>
				))}
			</div >
		</div >
	);
}

export default ServerMemberAdd;