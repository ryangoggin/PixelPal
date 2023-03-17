import React, { useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { useModal } from "../../context/Modal";
import { getAllEmojisThunk  } from "../../store/emojis";
import { createReactionThunk } from "../../store/message";


//createReactionThunk

import "./GetAllEmojis.css"

export default function GetAllEmojis({props: {messageId, userId, emojisArr}}) {

  const dispatch = useDispatch()
  const {closeModal} = useModal()

  useEffect(() => {
    dispatch(getAllEmojisThunk())
  }, [dispatch])

  const emojis = useSelector(state => state.emoji.allEmojis)
  // const emoji = useSelector(state => state.emoji.emoji)
  const allEmojisArr = Object.values(emojis)


  // useEffect(() => {
  //   console.log('use effect to create reaction thunk running')
  //   console.log(reaction)
  //   dispatch(createReactionThunk(emoji, userId, messageId))
  // }, [reaction])

  const createReaction = async (emojiId, messageId, userId) => {
  // get create a reaction from the click
    // console.log('am i passing this into the function correclty', emojiId, messageId, userId)
    let new_reaction = await dispatch(createReactionThunk(emojiId, messageId, userId))
    // console.log(new_reaction)
    return (new_reaction)
    }

  // to handle clicking on an existing reaction to delete it with value of reactionid
  // const deleteReaction = (reactionId) => {
    // let deleted_reaction = await dispatch(deleteReactionThunk(reactionId))


  // }


  // onClick = {createReaction(emojiId=emoji.id, messageId, userId)}>


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
