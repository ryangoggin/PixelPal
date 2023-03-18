import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Home() {
  const history = useHistory();
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    if (user === null) {
      history.push("/login");
    } else {
      history.push("/channels/@me");
    }
  }, [history, user]);

  console.log(user)

  return null;
}
