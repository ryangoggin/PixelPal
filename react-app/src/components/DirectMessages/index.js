import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom/";
import { loadDMMessagesThunk, clearDMMessages } from "../../store/private";
import EmojisModal from "../EmojisModal/AllEmojisModal";
import './DirectMessages.css'

export default function DirectMessage() {
  const dispatch = useDispatch()
  const {dmId} = useParams();

  const messages = useSelector(state => state.private.currentDM)
  const messagesArr = Object.values(messages)

  console.log('messagesArr', messagesArr)

  const allDMs = useSelector(state => state.private.allDMs)
  const dmsArr = Object.values(allDMs)
  const currentDM = dmsArr.filter(dm => dm.id === +dmId)

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



      : <div> This is the beginning of your direct message history with {currentDM[0]?.user.username.split("#")[0]} </div> }
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
                <div> {msg.user.username.split("#")[0]} </div>
                <div> {msg.timestamp} </div>
              </div>
              <div className='dm-msg-content'> {msg.content} </div>
              <div className='dm-msg-reactions'> </div>
            </div>
            <div className='dm-msg-right'>
              <EmojisModal props={msg.id}/>
            </div>
          </div>
          )
        })}
      </div>
      <div>
        {/* <input > MESSAGE FORM</input> */}
      </div>
    </div>
    </>
  )
}
