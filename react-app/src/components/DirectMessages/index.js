import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom/";
import { loadDMMessagesThunk, clearDMMessages } from "../../store/private";
import './DirectMessages.css'

export default function DirectMessage() {
  const dispatch = useDispatch()
  const {dmId} = useParams();

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

  if (!allDMs) return null;

  return (
    <>
    <div className='dm-upper-container'>
      <div className='dm-upper-user-container'>
      <div className='dm-upper-at'> @ </div>
      {currentDM[0].user.id === user?.id ?
        <div className='dm-upper-username'>  {currentDM[0].userTwo.username.split("#")[0]} </div>
      : <div> {currentDM[0].user.username.split("#")[0]} </div> }
      </div>

    </div>
    <div className='dm-outer-container'>
      <div>
        {messagesArr.map(msg => {
          <>
          <div> content </div>
          </>
        })}
      </div>
      <div>
        {/* <input > MESSAGE FORM</input> */}
      </div>
    </div>
    </>
  )
}
