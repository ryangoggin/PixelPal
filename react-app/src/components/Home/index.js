import React, {useEffect} from 'react';
import { useHistory } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';


// Create logic for if user

export default function Home() {

  const history = useHistory();

  const user = state => state.session.user

  useEffect(() => {
    (user === null ? history.push("/login") : history.push(`/channels/@me`))
  }, [])

}
