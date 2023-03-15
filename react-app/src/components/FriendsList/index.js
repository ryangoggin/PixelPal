import './FriendsList.css'
import React, {useState} from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/session';




export default function FriendsList() {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = async (e) => {
    e.preventDefault()

    dispatch(logout())
    .then(history.push("/login"))
  }

  return (
    <div>
      <h1> HELLO ! </h1>
      <button type='submit' onClick={handleLogout}> Logout </button>
    </div>
  )
}
