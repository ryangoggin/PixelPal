import React, { useState } from "react";
import {useDispatch} from 'react-redux'
import { useModal, setModalContent } from "../../context/Modal";
import { getAllEmojisThunk, createReactionThunk, getOneEmojiThunk } from "../../store/emojis";

import "./GetAllEmojis.css"

{/* <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                className="signUpText"
                modalComponent={<SignupFormModal />}
              /> */}


function GetAllEmojis(messageId, userId) {

  const dispatch = useDispatch()
  const {closeModal} = useModal()

  emojis = dispatch(getAllEmojisThunk())

  const handleClick = (e) => {
    // get create a reaction from the click

    let new_reaction = dispatch(createReactionThunk(emoji.id, messageId, userId))

    // query for the emoji if the reaction successfully worked
    if (new_reaction) {
      let emoji = dispatch(getOneEmojiThunk())
    }
    // paste the emoji
    // how to add emoji to

    closeModal
  }


  return (
    <div>
      {emojis.forEach(emoji => {
        <p>{emoji.url}</p>
      })}
    </div>
  )
}
