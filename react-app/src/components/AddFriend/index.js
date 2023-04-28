import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getSentRequests } from "../../store/request";
import { createSentRequest } from "../../store/request";
import { NavLink } from "react-router-dom";
import waitingWumpus from '../../static/Requests/waiting-wumpus-discord.svg';
import './AddFriend.css'

export default function AddFriend() {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [redOrGreen, setRedOrGreen] = useState("");

  useEffect(() => {
    dispatch(getSentRequests());
  }, [dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(createSentRequest(username));
    if (data.success) {
        setMessage(`Success! Your friend request to ${data.success} was sent.`);
        setRedOrGreen("green");
        setUsername("");
    }
    if (data.username) {
        setMessage(data.username);
        setRedOrGreen("red");
    }

  };

  return (
    <div>
      <div className='friendslist-container'>
        <div className='friendslist-header-container'>
          <i className="fa-solid fa-user-group" />
          <div className='friendslist-friends'> Friends </div>
          <NavLink exact to={`/channels/@me`} className='friendslist-all-link'>
            <div className='friendslist-all'> All </div>
          </NavLink>
          <NavLink exact to={`/channels/@me/pending`} className='friendslist-all-link'>
            <div className='friendslist-all'> Pending </div>
          </NavLink>
          <NavLink exact to={`/channels/@me/add`} className='friendslist-add-link'>
            <div className='friendslist-all'> Add Friend </div>
          </NavLink>
        </div>
        <div className='wumpus-waiting-container'>
            <img className='no-pending-wumpus' src={waitingWumpus} alt="no pending friends wumpus" />
            <p className="wumpus-text">Wumpus cannot add friends. You can though!</p>
        </div>
        <div className="add-friend-container">
            <p className="add-friend-text">ADD FRIEND</p>
            <p className="case-sensitive-text">You can add a friend with their PixelPal Username. It's cAsE sEnSiTiVe!</p>
            <form className={redOrGreen === "" ? "add-friend-form" : (redOrGreen === "green" ? "green-outline add-friend-form" : "red-outline add-friend-form")} onSubmit={handleSubmit}>
                <input
                    type="text"
                    maxLength={40}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={`Enter a Username#0000`}
                    required
                />
                <div className="message-form-right-side">
                    <button className={username.length === 0 ? "disabled-send-request-button" : "send-request-button"} type="submit">Send Friend Request</button>
                </div>
            </form>
            <p className={redOrGreen === "green" ? "green-request-success" : "red-request-errors"}>{message}</p>
        </div>
      </div>
    </div>
  )
}
