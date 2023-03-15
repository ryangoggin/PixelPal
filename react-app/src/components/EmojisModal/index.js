import React, { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux'
import { useModal } from "../../context/Modal";
import OpenModalMenuItem from './OpenModalMenuItem';
import { getAllEmojisThunk, createReactionThunk, loadOneEmojiThunk, allEmojis } from "../../store/emojis";

import "./GetAllEmojis.css"

export default function GetAllEmojis({messageId}) {

  const dispatch = useDispatch()
  const {closeModal} = useModal()

  useEffect(() => {
    dispatch(getAllEmojisThunk())
  }, [dispatch])

  const emojis = useSelector(state => state.emoji.allEmojis)
  const emojisArr = Object.values(emojis)


  // console.log('emojis arr', emojisArr)

  const userId = useSelector(state => state.session.user?.id)

  // const createReaction = (emojiId, messageId, userId) => {
  // get create a reaction from the click
  //   let new_reaction = await dispatch(createReactionThunk(emojiId, messageId, userId))

  //   return new_reaction
  //   .then(closeModal)
  //   }

  // to handle clicking on an existing reaction to delete it with value of reactionid
  // const deleteReaction = (reactionId) => {
    // let deleted_reaction = await dispatch(deleteReactionThunk(reactionId))


  // }



  return (
    <div className='emoji-modal-container'>
      {emojisArr.map(emoji => {
        return (<div className='emoji-modal-emoji'
                value={emoji.id}
                // onClick = {createReaction(emojiId=emoji.id, messageId, userId)}
                >
                {String.fromCodePoint(emoji.url)}
                </div>)
      })}
    </div>
  )
}
