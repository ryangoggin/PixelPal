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

  const redirect = async (e) => {
    e.preventDefault()
    history.push('/emojis/test')

  }

  return (
    <div>
      <h1> HELLO ! </h1>
      {/* <button type='button' onClick={redirect}> Emojis </button> */}
      <button type='submit' onClick={handleLogout}> Logout </button>
    </div>
  )
}
