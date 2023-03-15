import { useHistory } from "react-router-dom"
import { useState,  } from "react";
import OpenModalMenuItem from './OpenModalMenuItem';
import GetAllEmojis from "./index";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import '../EmojisModal/GetAllEmojis.css'



export default function EmojisModal() {
  const [showMenu, setShowMenu] = useState(false);
  const closeMenu = () => setShowMenu(false);

  return (
    <div className='emojis-modal-openmodalmenuitem'>
      <OpenModalMenuItem
                itemText="Reactions"
                onItemClick={closeMenu}
                className="emojis-modal-button"
                modalComponent={<GetAllEmojis />}
              />
      </div>

  )
}
