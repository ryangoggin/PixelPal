import React, { useState } from "react";
import {useDispatch, useSelector} from 'react-redux'

export function CurrentUser() {

  const user = useSelector(state => state.session.user)
  // need to change this to account for who you are chatting with and their info

  return (
    <div className="currentuser-side-nav">
      <p>{user.username} </p>
      <p> # Mutual Servers </p>
      <p> # Mutual Friend </p>
    </div>
  )

}
