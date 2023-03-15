import { useHistory } from "react-router-dom"

export default function FriendsList() {
  const history = useHistory();

  const redirect = async (e) => {
    e.preventDefault()
    history.push('/emojis/test')
  }

  return (
    <div>
      <h1> HELLO ! </h1>
      <button onClick={redirect}> Emojis</button>
    </div>
  )
}
