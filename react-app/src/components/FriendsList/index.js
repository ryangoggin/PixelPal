import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllFriendsThunk } from "../../store/friends";
import { loadAllDmsThunk } from "../../store/private";
import { NavLink } from "react-router-dom";
import './FriendsList.css'

export default function FriendsList() {
  const dispatch = useDispatch()

  const currentUser = useSelector(state => state.session.user)

  let currentUserId;
  if (currentUser) currentUserId = currentUser.id;


  const allFriends = useSelector(state => state.friends)
  const friendsArr = Object.values(allFriends)

  // const DMs = useSelector(state => state.private.allDMs)


  useEffect(() => {
    dispatch(getAllFriendsThunk(currentUserId))
    dispatch(loadAllDmsThunk(currentUserId))
  }, [dispatch, currentUserId])


  const handleOptions = (e) => {
    e.preventDefault();
    window.alert('More Options Feature Coming Soon!');
  }



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

        <div className='friendslist-user-container-1'> ALL FRIENDS - {friendsArr.length} </div>
        {friendsArr.map(friend => {
          return (
            <>

            <div className='friendslist-user-container' key={`friend${friend.id}`}>
              <div className='friendslist-pic-username'>
                <div> <img className='friendslist-profile-image' src={friend.prof_pic} alt='profile_pic_user' /> </div>
                <div className='friendslist-username'> {friend.username.split("#")[0]} </div>
                <div className='friendslist-tag'> #{friend.username.split("#")[1]} </div>
              </div>

              <div className='friendslist-chat-icon'>
                {/* <div className='icon-hover'> <i className="fa-solid fa-message" /> </div> */}
                <div className='icon-hover' onClick={handleOptions}> <i className="fa-solid fa-ellipsis-vertical" /></div>
              </div>
            </div>

            </>
          )
        })}

      </div>
    </div>
  )
}
