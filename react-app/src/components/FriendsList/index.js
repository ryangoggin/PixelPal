// import { useHistory } from "react-router-dom"
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { logout } from "../../store/session";
// import { getAllFriendsThunk } from "../../store/friends";
import './FriendsList.css'

export default function FriendsList() {
  // const history = useHistory();
  // const dispatch = useDispatch()

  // const allFriends = useSelector(state => state.friends)
  // const currentUserId = useSelector(state => state.session.user.id)

  // useEffect(() => {
  //   dispatch(getAllFriendsThunk(currentUserId))
  // })

//   const handleLogout = async (e) => {
//     e.preventDefault()

//     dispatch(logout())
//     .then(history.push("/login"))
// }

  return (
    <div>
      <h1> HELLO ! </h1>
      {/* <button onClick={handleLogout}> Logout </button> */}
    </div>
  )
}
