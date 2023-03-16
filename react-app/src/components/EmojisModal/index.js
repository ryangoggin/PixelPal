import React, { useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { useModal } from "../../context/Modal";
import { getAllEmojisThunk,  } from "../../store/emojis";

//createReactionThunk

import "./GetAllEmojis.css"

export default function GetAllEmojis({messageId}) {

  const dispatch = useDispatch()
  const {closeModal} = useModal()

  useEffect(() => {
    dispatch(getAllEmojisThunk())
  }, [dispatch])

  const emojis = useSelector(state => state.emoji.allEmojis)
  const emojisArr = Object.values(emojis)



  // const userId = useSelector(state => state.session.user?.id)

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


  // onClick = {createReaction(emojiId=emoji.id, messageId, userId)}>


  return (
    <div className='emoji-modal-container'>
      {emojisArr.map(emoji => {
        return (
        <div className='emoji-modal-emoji'>
          {String.fromCodePoint(emoji.url)}
          </div>
          )
      })}
    </div>
  )
}
