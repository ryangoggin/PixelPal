// import { Redirect, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import { logout } from "../../store/session";
import { getAllFriendsThunk } from "../../store/friends";
import './FriendsList.css'

export default function FriendsList() {
  // const history = useHistory();
  const dispatch = useDispatch()

  const currentUserId = useSelector(state => state.session.user.id)

  const allFriends = useSelector(state => state.friends)
  const friendsArr = Object.values(allFriends)
  console.log('friends Arr with object.values', friendsArr)
  // console.log('friends from dispatching thunk in component', allFriends)

  useEffect( async () => {
    dispatch(getAllFriendsThunk(currentUserId))
    // console.log('use effect running to dispatch allfriends thunk')
  }, [])

//   if (!currentUserId) {
//     return (<Redirect to="/login"/>)
//   }
//   const handleLogout = async (e) => {
//     e.preventDefault()

//     dispatch(logout())
//     .then(history.push("/login"))
// }

  return (
    <div className='friendslist-container'>
      <div className='friendslist-header-container'>
        <span className='friendslist-friends'> Friends </span>
        <span className='friendslist-pending'> Pending </span>
        <span className='friendslist-addfriend-button'> Add Friend </span>
      </div>
      {friendsArr.map(friend => {
        return (
          <div className='friendslist-user-container' key={friend.id}>
            <span className='friendslist-profile-image'>DEFAULT IMG! </span>
            <span className='friendslist-username'> username: {friend.username.split("#")[0]} </span>
            {/* on hover it should show their tag */}
          </div>
        )
      })}
      {/* <button onClick={handleLogout}> Logout </button> */}
    </div>
  )
}
