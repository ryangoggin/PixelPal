// import { useRef } from "react-router-dom"
import { useState, useRef  } from "react";
import OpenModalMenuItem from './OpenModalMenuItem';
import GetAllEmojis from "./index";
// import { useEffect } from "react-redux";
import { useEffect } from "react";

import '../EmojisModal/GetAllEmojis.css'



export default function EmojisModal({messageId}) {

  const ulRef = useRef()
  // const dispatch = useDispatch()

  const [showMenu, setShowMenu] = useState(false);


  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const closeMenu = () => setShowMenu(false);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      setShowMenu(false);
      // if (!ulRef.current.contains(e.target)) {
      // }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);


  const ulClassName = 'emojismodal-openmodalmenu' + ( showMenu ? "" : " hidden" )

  return (
    <div className='emojis-modal-openmodalmenuitem'>
      <div className='tooltip-wrap'>
      <button onClick={openMenu} className='open-emojis-modal-button'>
        Reactions
      </button>
      <div className='tooltip-content'>
        Add Reaction
      </div>
      </div>
      <ul className={ulClassName} ref={ulRef}>
          <div className='emojismodal-menu-allemojis'>
            <GetAllEmojis />
          </div>
      </ul>

{/*
      <div class="tooltip-wrap">
      <div className='emojis-list-item-container'>
        <li className='emojismodalitem' onClick={onClick}>{itemText}</li>
      </div>
      <div class="tooltip-content">
          Add Reaction
      </div>
    </div> */}



      {/* <button >
      <OpenModalMenuItem
                // can i change this to an image? or do i need to stop using modal?
                itemText="Reactions"
                onItemClick= {openMenu}
                className="emojis-modal-button"
                modalComponent={<GetAllEmojis />}
                // how to add as a prop?
              />

      </button> */}
      </div>

  )
}
