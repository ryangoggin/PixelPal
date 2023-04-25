import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/";
import { loadDMMessagesThunk, clearDMMessages } from "../../store/private";
import EmojisModal from "../EmojisModal/AllEmojisModal";
import { io } from 'socket.io-client';
import './DirectMessages.css'

let socket;

export default function DirectMessage() {
  const dispatch = useDispatch()
  const {dmId} = useParams();

  // setting up web sockets now
  const [content, setContent] = useState("");
  const [msg, setMsg] = useState({});

  const messages = useSelector(state => state.private.currentDM)
  const messagesArr = Object.values(messages)

  const allDMs = useSelector(state => state.private.allDMs)
  const dmsArr = Object.values(allDMs)
  const currentDM = dmsArr.filter(dm => dm.id === +dmId)

  const user = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(loadDMMessagesThunk(+dmId))
    return () => dispatch(clearDMMessages())
  }, [dispatch, +dmId])

  // useeffect for web socket
  useEffect(() => {
    socket = io();

    if (socket && user) {
        socket.emit('join', { private_id: +dmId, username: user.username })
        socket.on("chat", (chat) => setMsg(chat) )
    }
    // when component unmounts, disconnect
    return (() => socket.disconnect() )
  }, [+dmId, user])

  if (!allDMs) return null;

  const handleSubmit = async (e) => {
    // e is undefined if message sent with Enter key, check if it exists (message sent by clicking Send button) before running e.preventDefault()
    if (e) e.preventDefault();

    let message = { userId: user?.id, private_id: dmId, content: content, timestamp: new Date() };
    // let createdMsg = await dispatch(createMessage(message));

    // if (socket) socket.emit("chat", createdMsg);
    // setContent("");
  };

  const enterKey = (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit();
    }
  }


  return (
    <>
    <div className='dm-upper-container'>
      <div className='dm-upper-user-container'>
      <div className='dm-upper-at'> @ </div>
      {currentDM[0]?.user.id === user?.id ?
        <div className='dm-upper-username'>  {currentDM[0]?.userTwo.username.split("#")[0]} </div>
      : <div> {currentDM[0]?.user.username.split("#")[0]} </div> }
      </div>

    </div>
    <div className='dm-outer-container'>
      <div className='dm-chat-history-container'>
      {currentDM[0]?.user.id === user?.id ?
      <>
        <img src={currentDM[0]?.userTwo.prof_pic} className='dm-chat-history-pic'/>
        <div className='dm-chat-history-user'> {currentDM[0]?.userTwo.username.split("#")[0]} </div>
        <div className='dm-chat-history-text'> This is the beginning of your direct message history with {currentDM[0]?.userTwo.username.split("#")[0]}</div>
      </>
      :
      <>
        <img src={currentDM[0]?.user.prof_pic} className='dm-chat-history-pic'/>
        <div className='dm-chat-history-user'> {currentDM[0]?.user.username.split("#")[0]} </div>
        <div> This is the beginning of your direct message history with {currentDM[0]?.user.username.split("#")[0]} </div>
      </>
      }
      </div>


      <div>
        {messagesArr.map(msg => {
          return (
          <div key={`msg-${msg.id}`} className='dm-msg-container'>
            <div className='dm-msg-left'>
              <img src={msg.user.prof_pic} className='dm-msg-profpic'/>
            </div>
            <div className='dm-msg-center'>
              <div className='dm-msg-user'>
                <div className='dm-msg-username'> {msg.user.username.split("#")[0]} </div>
                <div className='dm-msg-timestamp'> {msg.timestamp} </div>
              </div>
              <div className='dm-msg-content'> {msg.content} </div>
              <div className='dm-msg-reactions'>
                {msg.reactions.length ? <div> REACTIONS GO HERE </div> : null }
              </div>
            </div>
            <div className='dm-msg-right'>
              <EmojisModal props={msg.id}/>
            </div>
          </div>
          )
        })}
      </div>
      <div className='dm-msg-form-background'>
        <div className='dm-msg-form-container'>
          <form onSubmit={handleSubmit} className='dm-msg-form'>
            <textarea
            className='dm-msg-form-input'
            type='text'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`Message <<FRIEND>>`}
            onKeyPress={enterKey}
            required
            />

          <div className='dm-msg-form-right'>
            <div className={content.length >= 1800 ? (content.length > 2000 ? "dm-character-count-error" : "dm-character-count-warning") : "dm-msg-hidden"}>{2000 - content.length}</div>
            <button className={content.length > 2000 ? "dm-msg-form-button dm-msg-form-text dm-msg-form-disabled" : "message-form-button message-form-text"} type="submit" disabled={content.length > 2000}>Send</button>
          </div>

          </form>
        </div>
      </div>
    </div>
    </>
  )
}
