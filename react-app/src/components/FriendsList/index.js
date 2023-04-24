import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllFriendsThunk } from "../../store/friends";
import { loadAllDmsThunk } from "../../store/private";
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
  }, [dispatch, currentUserId])


  const handleOptions = (e) => {
    e.preventDefault();
    window.alert('More Options Feature Coming Soon!');
  }



  return (
    <div>
      <div className='friendslist-channel-container'>
        <div className='friendslist-search-div'>
          <input placeholder='Find or start a conversation' id='friendslist-search'></input>
        </div>
        <div className='friendslist-channel-friendscontainer'>
          <i className="fa-solid fa-user-group" />
          <div className='friendslist-channel-item'> Friends </div>
        </div>

        <div className='friendslist-channel-dm-container'>
          <div className='friendslist-channel-dm'> Direct Messages </div>
          <div className='friendslist-dm-channel'> PLACEHOLDER </div>
          <div className='friendslist-dm-channel'> PLACEHOLDER </div>
          <div className='friendslist-dm-channel'> PLACEHOLDER </div>
          <div className='friendslist-dm-channel'> PLACEHOLDER </div>


        </div>
      </div>

      <div className='friendslist-container'>
        <div className='friendslist-header-container'>
          <i className="fa-solid fa-user-group" />
          <div className='friendslist-friends'> Friends </div>
        </div>
        <div className='friendslist-user-container-1'> Online - {friendsArr.length} </div>
        {friendsArr.map(friend => {
          return (
            <div className='friendslist-user-container' key={`friend${friend.id}`}>
              <div className='friendslist-pic-username'>
                <div> <img className='friendslist-profile-image' src={friend.prof_pic} alt='profile_pic_user' /> </div>
                <div className='friendslist-username'> {friend.username.split("#")[0]} </div>
                <div className='friendslist-tag'> #{friend.username.split("#")[1]} </div>
              </div>

              <div className='friendslist-chat-icon'>
                <div className='icon-hover'> <i class="fa-solid fa-message" /> </div>
                <div className='icon-hover' onClick={handleOptions}> <i class="fa-solid fa-ellipsis-vertical" /></div>
              </div>
            </div>
          )
        })}

      </div>
    </div>
  )
}
