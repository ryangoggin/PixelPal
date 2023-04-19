import { useState, useRef, useEffect } from "react";
import GetAllEmojis from "./index";
import '../EmojisModal/GetAllEmojis.css'

export default function EmojisModal({ props }) {
  const ulRef = useRef()
  const [showMenu, setShowMenu] = useState(false);


  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);


  const ulClassName = 'emojismodal-openmodalmenu' + (showMenu ? "" : " hidden")

  return (
    <div className='emojis-modal-container'>
      <div className='tooltip-wrap'>
        <div className='addreaction-container'>
          <i className="fa-solid fa-face-smile-beam open-emojis-modal-button"
            onClick={openMenu} />
          <i className="fa-solid fa-plus open-emojis-modal-button"
            onClick={openMenu} />
        </div>
        <div className='tooltip-content'> Add Reaction </div>
      </div>
      <div className={ulClassName} ref={ulRef}>
        <ul className='emojismodal-menu-allemojis'>
          <GetAllEmojis props={props} />
        </ul>
      </div>
    </div>
  )
}
