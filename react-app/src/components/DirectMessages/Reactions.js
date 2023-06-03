import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createDMReactionThunk, deleteDMReactionThunk } from '../../store/private';

import './DirectMessages.css'
import '../MessageItem/Reaction.css'



export default function DMReactions({reactions}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const addDMReaction = async (emojiId, messageId, userId) => {
    dispatch(createDMReactionThunk(emojiId, messageId, userId))
  }

  const deleteDMReaction = async (reactionId, messageId) => {
    dispatch(deleteDMReactionThunk(reactionId, messageId))
  }

  return (
    <>
      {reactions.map((reaction) => {
        return (
        <>
          <div
          className={+reaction.userId === +sessionUser?.id ? 'user-emoji-reaction' : 'other-user-reaction'}
          key={`reaction${reaction.id}`}
          // onClick={+reaction.userId === +sessionUser?.id ? () => { deleteDMReaction(reaction.id, reaction.messageId) } : () => { addDMReaction(reaction.emojiId, reaction.messageId, reaction.userId) }}
          >
            {String.fromCodePoint(reaction.emoji.url)} 1
          </div>
      </>
        )
      })}
    </>

  )
}
