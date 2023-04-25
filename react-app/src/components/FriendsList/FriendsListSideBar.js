import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadAllDmsThunk } from "../../store/private";
import { NavLink } from "react-router-dom";
import './FriendsList.css'

export default function FriendsListSideBar() {
  const dispatch = useDispatch()

  const currentUser = useSelector(state => state.session.user)

  let currentUserId;
  if (currentUser) currentUserId = currentUser.id;

  const DMs = useSelector(state => state.private.allDMs)
  const dmsArr = Object.values(DMs)

  useEffect(() => {
    dispatch(loadAllDmsThunk(currentUserId))
  }, [dispatch, currentUserId])


  return (
    <>
    <div className='friendslist-channel-container'>
        <div className='friendslist-search-div'>
          <input placeholder='Find or start a conversation' id='friendslist-search'></input>
        </div>
        <div className='friendslist-channel-friendscontainer'>
          <i className="fa-solid fa-user-group" />
          <NavLink to='/channels/@me' className='friendslist-dm-link'>
            <div className='friendslist-channel-item'> Friends </div>
          </NavLink>
        </div>

        <div className='friendslist-channel-dm-container'>
          <div className='friendslist-channel-dm'> Direct Messages </div>
          {dmsArr.map(dm => {
            return (
              <>
              <NavLink to={`/channels/@me/${dm.id}`} className='friendslist-dm-link'>
              <div className='friendslist-dm-user-container'>
                <img src={dm.user.id === currentUserId ? dm.userTwo.prof_pic : dm.user.prof_pic} className='friendslist-profpic'/>
                <div className='friendslist-dm-username'> {dm.user.id === currentUserId ? dm.userTwo.username.split("#")[0] : dm.user.username.split("#")[0]}</div>
              </div>
              </NavLink>
              </>
            )
          })}


        </div>
      </div>
    </>



  )

}
