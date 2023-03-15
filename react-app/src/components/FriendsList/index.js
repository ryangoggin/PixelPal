import { Redirect } from "react-router"
import { useHistory } from "react-router-dom"

export default function FriendsList() {
  const history = useHistory()

  const redirect = async (e) => {
    e.preventDefault()
    history.push('/messages')
  }

  return (
    <div>
      <h1> HELLO ! </h1>
      <button onClick={redirect}>Messages</button>
    </div>
  )
}
