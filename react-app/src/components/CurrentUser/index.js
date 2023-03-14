import React, { useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { currentUser } from "../../store/user";

export function CurrentUser() {

  const user = useSelector(state => state.session.user)


  return (
    <div className="currentuser-side-nav">
      <p>{user.username} </p>
      <p> # Mutual Servers </p>
      <p> # Mutual Friend </p>
    </div>
  )

}
