import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import './FriendsList.css'

export default function FriendsList() {
  const history = useHistory();
  const dispatch = useDispatch()

  const allFriends = useSelector(state => state.friends)


  const handleLogout = async (e) => {
    e.preventDefault()

    dispatch(logout())
    .then(history.push("/login"))
}

  return (
    <div>
      <h1> HELLO ! </h1>
      <button onClick={handleLogout}> Logout </button>
    </div>
  )
}
