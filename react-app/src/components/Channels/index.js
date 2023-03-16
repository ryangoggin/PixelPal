import React, { useEffect, useState } from 'react';
import { useHistory, Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './channels.css';


// Create logic for if user

function Channels() {

  const history = useHistory();

  const user = useSelector(state => state.session.user);

  // (user === null ? history.push(`/channels/@me`) : history.push("/login"))

  useEffect(() => {
    (user === null ? history.push("/login") : history.push(`/channels/@me`))
  }, [])


  return (
    null
  )
}


export default Channels;
