import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';


// Create logic for if user

export default function Home() {

  const user = useSelector(state => state.session.user);

  // (user === null ? history.push(`/channels/@me`) : history.push("/login"))

  if (user) {
    return (<Redirect to="/channels/@me" />)
  } else {
    return (<Redirect to="/" />)
  }


}
