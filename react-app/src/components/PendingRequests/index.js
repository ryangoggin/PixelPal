import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getReceivedRequests, getSentRequests, createSentRequest, deleteReceivedRequest, deleteSentRequest } from "../../store/request";
import { NavLink } from "react-router-dom";
import './PendingRequests.css'

export default function PendingRequests() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getReceivedRequests());
    dispatch(getSentRequests());
  }, [dispatch])

  const receivedRequestsObj = useSelector(state => state.requests.received);
  const sentRequestsObj = useSelector(state => state.requests.sent);

  if(!receivedRequestsObj) return null;
  if(!sentRequestsObj) return null;

  const receivedRequestsArr = Object.values(receivedRequestsObj);
  const sentRequestsArr = Object.values(sentRequestsObj);

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
        </div>

        <div className='friendslist-received-container'> RECEIVED REQUESTS - {receivedRequestsArr.length} </div>
        <div>
            {receivedRequestsArr.map(receivedRequest => {
            return (
                <div className='friendslist-request-user-container' key={`friend${receivedRequest.senderUser.id}`}>
                <div className='friendslist-pic-username'>
                    <div> <img className='request-profile-image' src={receivedRequest.senderUser.prof_pic} alt='profile_pic_user' /> </div>
                    <div className='friendslist-username'> {receivedRequest.senderUser.username.split("#")[0]} </div>
                    <div className='friendslist-tag'> #{receivedRequest.senderUser.username.split("#")[1]} </div>
                </div>

                <div className='friendslist-chat-icon'>
                    <div className='icon-hover'> <i className="fa-solid fa-check"></i> </div>
                </div>
                </div>
            )
            })}
        </div>
        <div className='friendslist-sent-container'> SENT REQUESTS - {sentRequestsArr.length} </div>
        <div>
            {sentRequestsArr.map(sentRequest => {
            return (
                <div className='friendslist-request-user-container sent-request-container' key={`friend${sentRequest.receiverUser.id}`}>
                <div className='friendslist-pic-username'>
                    <div> <img className='request-profile-image' src={sentRequest.receiverUser.prof_pic} alt='profile_pic_user' /> </div>
                    <div className='friendslist-username'> {sentRequest.receiverUser.username.split("#")[0]} </div>
                    <div className='friendslist-tag'> #{sentRequest.receiverUser.username.split("#")[1]} </div>
                </div>

                <div className='friendslist-chat-icon'>
                    <div className='icon-hover'> <i className="fa-solid fa-message" /> </div>
                </div>
                </div>
            )
            })}
        </div>


      </div>
    </div>
  )
}
