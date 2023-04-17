import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal"
import { getUpdatedChannel, updateChannel, removeChannel, getServerChannels } from '../../store/channels';
import './update-channel.css';

function UpdateChannel({ channelId, serverId }) {

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [errors, setErrors] = useState('');
  const history = useHistory();

  const { closeModal } = useModal();

  const updatedChannel = useSelector(state => state.channels.updatedChannel)
  const serverChannels = useSelector(state => state.channels.currServerChannels)


  useEffect(() => {
    dispatch(getUpdatedChannel(channelId))
  }, [dispatch, channelId]);

  useEffect(() => {
    if (updatedChannel) setName(updatedChannel.name)
  }, [updatedChannel])


  if (!serverChannels) return null;
  let channelArr = Object.values(serverChannels);


  const handleUpdate = async (e) => {
    e.preventDefault();
    await dispatch(updateChannel(channelId, name))
      .then(() => {
        dispatch(getServerChannels(serverId))
        closeModal();
      })
  };

  const handleDelete = async (e) => {
    e.preventDefault();


    if (channelArr.length === 1) {
      setErrors('There must be at least one channel in a server.')
      return
    }

    await dispatch(removeChannel(channelId))
      .then(() => {
        dispatch(getServerChannels(serverId))
      })

    for (let i=0; i<channelArr.length; i++) {
      if (channelArr[i].id === channelId) {
        channelArr.splice(i, 1)
      }
    }

    history.push(`/channels/${serverId}/${channelArr[0].id}`)
    closeModal();
  };






  return (
    <div className="channel-update-form-container">
      <form className="channel-update-form">
        <span className="channel-update-form-title">Update Channel</span>
        {errors && (
          <div className='update-ch-err-div'>
              <span className='err-msg'>{errors}</span>
          </div>
        )}
        <div className="channel-update-form-field">
          <span className="channel-update-form-label">Name</span>
          <input
            type="text"
            id="ch-name-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="channel-update-form-input"
          />
        </div>
        <div className='btn-option-div'>
          <span onClick={closeModal} className="channel-update-form-cancel">Cancel</span>
          <button type="button" onClick={handleDelete} className="channel-update-form-delete">Delete Channel</button>
          <button type="submit" className={`channel-update-form-submit${name.length === 0 ? ' cursor-not-allowed' : ''}`} onClick={handleUpdate} disabled={name.length === 0}>Update Channel</button>
        </div>
      </form>
    </div>
  );

















}

export default UpdateChannel;
