import { useState, useRef, useEffect  } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getAllEmojisThunk } from "../../store/emojis";
import { createReactionThunk } from "../../store/message";
import {createDMReactionThunk} from "../../store/private"
// import GetAllEmojis from "./index";
import '../EmojisModal/GetAllEmojis.css'

export default function EmojisModal({ props }) {
  console.log('what is props passed in from dm message?', props)

  const dispatch = useDispatch()
  const ulRef = useRef()
  const [showMenu, setShowMenu] = useState(false);
  const [clicked, setClicked] = useState(false);

  const emojis = useSelector(state => state.emoji.allEmojis)
  const allEmojisArr = Object.values(emojis)

  let {messageId, sessionUserId, dm} = props


  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = (e) => { setShowMenu(false); };
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  useEffect(() => {
    if (clicked) { dispatch(getAllEmojisThunk()) }
  }, [dispatch, clicked])

  const createReaction = (emojiId, messageId, sessionUserId) => {
    dispatch(createReactionThunk(emojiId, messageId, sessionUserId))
  }


  const ulClassName = 'emojismodal-openmodalmenu' + (showMenu ? "" : " hidden")

  return (
    <div className='emojis-modal-container'>
      <div className='tooltip-wrap'>
        <div className='addreaction-container'
        onClick={() => {setClicked(true); openMenu()}}>
          <i className="fa-solid fa-face-smile-beam open-emojis-modal-button"/>
          <i className="fa-solid fa-plus open-emojis-modal-button"/>
        </div>
        <div className='tooltip-content'> Add Reaction </div>
      </div>
      <div className={ulClassName} ref={ulRef}>
        <ul className='emojismodal-menu-allemojis'>

          <div className='emojis-modal-container-container'>
            <div className='emoji-modal-container'>
              {allEmojisArr.map(emoji => {
                return (
                  <div className='emoji-modal-emoji'
                    key={`emojimodal${emoji.id}`}
                    value={emoji.id}
                    onClick={() => { dm ? createDMReaction(emoji.id, messageId, sessionUserId): createReaction(emoji.id, messageId, sessionUserId) }}
                  >
                    {String.fromCodePoint(emoji.url)}
                  </div>
                )
              })}
            </div>
          </div>

        </ul>
      </div>
    </div>
  )
}
