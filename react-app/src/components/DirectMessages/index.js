import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/";
import { loadDMMessagesThunk, clearDMMessages } from "../../store/private";
import EmojisModal from "../EmojisModal/AllEmojisModal";
import './DirectMessages.css'



export default function DirectMessage({message}) {
  const dispatch = useDispatch()
  const {dmId} = useParams();

  const messages = useSelector(state => state.private.currentDM)
  if (message?.id) messages[message.id] = message
  const messagesArr = Object.values(messages)

  const allDMs = useSelector(state => state.private.allDMs)
  const currentDM = allDMs[+dmId]

  const user = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(loadDMMessagesThunk(+dmId))
    return () => dispatch(clearDMMessages())
  }, [dispatch, +dmId])

  if (!allDMs) return null;

  return (
    <>
    <div className='dm-upper-container'>
      <div className='dm-upper-user-container'>
      <div className='dm-upper-at'> @ </div>
      {currentDM?.user.id === user?.id ?
        <div className='dm-upper-username'>  {currentDM?.userTwo.username.split("#")[0]} </div>
      : <div className='dm-upper-username'> {currentDM?.user.username.split("#")[0]} </div> }
      </div>

    </div>
    <div className='dm-outer-container'>
      <div className='dm-chat-history-container'>
      {currentDM?.user.id === user?.id ?
      <>
        <img src={currentDM?.userTwo.prof_pic} className='dm-chat-history-pic'/>
        <div className='dm-chat-history-user'> {currentDM?.userTwo.username.split("#")[0]} </div>
        <div className='dm-chat-history-text'> This is the beginning of your direct message history with {currentDM?.userTwo.username.split("#")[0]}</div>
      </>
      :
      <>
        <img src={currentDM?.user.prof_pic} className='dm-chat-history-pic'/>
        <div className='dm-chat-history-user'> {currentDM?.user.username.split("#")[0]} </div>
        <div className='dm-chat-history-text'> This is the beginning of your direct message history with {currentDM?.user.username.split("#")[0]} </div>
      </>
      }
      </div>

      <div id='scroller'>
      <div className='dm-msg-item-overall'>
        {messagesArr.map(msg => {
          return (

          <div key={`msg-${msg?.id}`} className='dm-msg-container'>
            <div className='dm-msg-left'>
              <img src={msg?.user?.prof_pic} className='dm-msg-profpic'/>
            </div>

            <div className='dm-msg-center'>
              <div className='dm-msg-user'>
                <div className='dm-msg-username'> {msg.user?.username.split("#")[0]} </div>
                <div className='dm-msg-timestamp'> {msg.timestamp} </div>
              </div>
              <div className='dm-msg-content'> {msg.content} </div>
              <div className='dm-msg-reactions'>
                {msg.reactions.length ? <div> REACTIONS GO HERE </div> : null }
              </div>
            </div>

            <div className='dm-msg-right'>
              <EmojisModal props={{messageId: msg.id, dmId:true, sessionUserId: user}}/>
            </div>
          </div>
          )
        })}

        </div>
        <div id='anchor'></div>
      </div>

    </div>
    </>
  )
}
