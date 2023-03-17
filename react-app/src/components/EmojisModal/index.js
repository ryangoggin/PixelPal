import React, { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { useModal } from "../../context/Modal";
import { getAllEmojisThunk  } from "../../store/emojis";
import { createReactionThunk } from "../../store/message";


import "./GetAllEmojis.css"

export default function GetAllEmojis({props: {messageId, userId, emojisArr}}) {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllEmojisThunk())
  }, [dispatch])

  const emojis = useSelector(state => state.emoji.allEmojis)
  const allEmojisArr = Object.values(emojis)

  const createReaction = async (emojiId, messageId, userId) => {
    let new_reaction = await dispatch(createReactionThunk(emojiId, messageId, userId))
    return (new_reaction)
    }


  return (
    <div className='emoji-modal-container'>
      {allEmojisArr.map(emoji => {
        return (
        <div className='emoji-modal-emoji'
        value={emoji.id}
        onClick={() => {createReaction(emoji.id, messageId, userId)}}
        >
          {String.fromCodePoint(emoji.url)}
          </div>
          )
      })}
    </div>
  )
}
