import { useHistory } from "react-router-dom"
import { useState,  } from "react";
import OpenModalMenuItem from '../EmojisModal/OpenModalMenuItem';
import GetAllEmojis from "../EmojisModal";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import '../EmojisModal/GetAllEmojis.css'

export default function FriendsList() {
  const history = useHistory();
  const dispatch = useDispatch()


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
