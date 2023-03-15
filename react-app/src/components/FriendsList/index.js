import { useHistory } from "react-router-dom"
import { useState } from "react";
import OpenModalMenuItem from '../EmojisModal/OpenModalMenuItem';
import GetAllEmojis from "../EmojisModal";
import '../EmojisModal/GetAllEmojis.css'

export default function FriendsList() {
  const history = useHistory();

  const redirect = async (e) => {
    e.preventDefault()
    history.push('/emojis/test')
  }
const [showMenu, setShowMenu] = useState(false);
  const closeMenu = () => setShowMenu(false);

  {/* <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                className="signUpText"
                modalComponent={<GetAllEmojis />}
              /> */}

  return (
    <div>
      <h1> HELLO ! </h1>
      <div className='emojis-modal-container'>
      <OpenModalMenuItem
                itemText="Emojis"
                onItemClick={closeMenu}
                className="emojis-modal-button"
                modalComponent={<GetAllEmojis />}
              />
      </div>
    </div>
  )
}
