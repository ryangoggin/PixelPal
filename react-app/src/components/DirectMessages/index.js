import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/";
import { loadDMMessagesThunk, clearDMMessages, createDMMessageThunk } from "../../store/private";
import EmojisModal from "../EmojisModal/AllEmojisModal";
import { io } from 'socket.io-client';
import './DirectMessages.css'

let socket;

export default function DirectMessage() {
  const dispatch = useDispatch()
  const {dmId} = useParams();

  const [content, setContent] = useState("");
  const [msg, setMsg] = useState([])

  const messages = useSelector(state => state.private.currentDM)
  const messagesArr = Object.values(messages)

  const allDMs = useSelector(state => state.private.allDMs)
  const currentDM = allDMs[+dmId]

  const user = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(loadDMMessagesThunk(+dmId))
    return () => dispatch(clearDMMessages())
  }, [dispatch, +dmId])

  // useeffect for web socket
  useEffect(() => {
    socket = io();

    if (socket && user) {
        socket.emit('join_dm', { private_id: +dmId, username: user.username })

        // receive a message from the server
        socket.on("dm_chat", async (chat) => dispatch(createDMMessageThunk(chat)))
    }
    // when component unmounts, disconnect
    return (() => socket.disconnect() )
  }, [+dmId, user])

  if (!allDMs) return null;


  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    let message = { userId: user?.id, privateId: +dmId, content: content, timestamp: new Date(), channelId: ''};

    // send a message to the server
    if (socket) socket.emit("dm_chat", message);
    setContent("");
  };

  const enterKey = (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit();
        setContent("");
    }
  }


  return (
    <>
    <div className='dm-upper-container'>
      <div className='dm-upper-user-container'>
      <div className='dm-upper-at'> @ </div>
      {currentDM?.user.id === user?.id ?
        <div className='dm-upper-username'>  {currentDM?.userTwo.username.split("#")[0]} </div>
      : <div> {currentDM?.user.username.split("#")[0]} </div> }
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
        <div> This is the beginning of your direct message history with {currentDM?.user.username.split("#")[0]} </div>
      </>
      }
      </div>


      <div className='dm-msg-item-overall' id='scroller'>
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
              <EmojisModal props={msg.id}/>
            </div>
          </div>
          )
        })}

        <div id='anchor'></div>
      </div>
      <div className='dm-msg-form-background'>
        <div className='dm-msg-form-container'>
          <form onSubmit={handleSubmit} className='dm-msg-form'>
            <textarea
            className='dm-msg-form-input'
            type='text'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder= {currentDM?.user.id === user?.id ? `Message ${currentDM?.userTwo.username.split("#")[0]}` : `Message ${currentDM?.user.username.split("#")[0]}`}
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
