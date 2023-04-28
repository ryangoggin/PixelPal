import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/";
import { useEffect, useState } from "react";
import { createDMMessageThunk } from "../../store/private";
import { io } from 'socket.io-client';
import DirectMessage from ".";
import './DirectMessages.css'

let socket;


export default function DirectMessageForm() {
  const dispatch = useDispatch()
  const {dmId} = useParams();

  const [content, setContent] = useState("");
  const [msg, setMessages] = useState({})

  const user = useSelector(state => state.session.user)
  const allDMs = useSelector(state => state.private.allDMs)
  const currentDM = allDMs[+dmId]


  // useeffect for web socket
  useEffect(() => {
    socket = io();

    if (socket && user) {
        socket.emit('join_dm', { private_id: +dmId, username: user.username })
        console.log('join dm room')
        // receive a message from the server
        socket.on("dm_chat", (chat) => setMessages(chat) )
    }
    // when component unmounts, disconnect
    return (() => {
      console.log('leaving DM room')
      socket.emit('leave_dm', { private_id: +dmId, username: user.username })
      socket.disconnect()
    })
  }, [+dmId, user])

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    let message = { userId: user?.id, channel_id: '', content: content, timestamp: new Date(), private_id: +dmId };
    let createdMsg = await dispatch(createDMMessageThunk(message));

    if (socket) {
      const dmRoom = `room-dm${dmId}`;
      const messageData = { ...createdMsg, room: dmRoom };
      socket.emit("dm_chat", messageData, dmRoom);
    }
    setContent("");
};

const enterKey = (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit();
    }
}



return (
  <>
    <DirectMessage message={msg} />

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
    </>
  )

}
