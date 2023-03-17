import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { useState } from 'react';
import { createChannel } from '../../store/channels'
import './create-channel.css';


function NewChannel({ serverId }) {
    const dispatch = useDispatch();


    const [name, setName] = useState('');
    const [channelType, setChannelType] = useState('text');
    const [errors, setErrors] = useState([]);

    const { closeModal } = useModal();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(createChannel(name, serverId));
        if (data) {
          setErrors(data);
        } else {
          closeModal();
        }
      }

    return (
        <div className='create-channel-modal'>
            <div className='modal-content'>
            <form className="create-channel-form" onSubmit={handleSubmit}>
                <span className='modal-header'>Create Channel</span>
                <span className="subheading-modal">in Text Channels</span>
                {errors.length > 0 && (
                <ul className='modal-errors'>
                    {errors.map((error, idx) => <li key={idx} className='modal-error'>{error}</li>)}
                </ul>
                )}
                <span className="channel-type">CHANNEL TYPE</span>
                <div className="radio-buttons-container">
                    <div className="radio-button">
                        <i class="fa-regular fa-hashtag"></i>
                        <div className="text-radio-option">
                            <span className="text-radio">Text</span>
                            <span className="text-radio-desc">Send messages, images, GIFs, emojis, opinions, and puns</span>
                        </div>
                        <input type="radio" id="text" name="channel-type" value="text" checked={channelType === "text"} onChange={() => setChannelType("text")} />
                    </div>
                </div>
                <div className="radio-buttons-container">
                    <div className="radio-button-na">
                        <i class="fa-solid fa-volume-high"></i>
                        <div className="text-radio-option">
                            <span className="text-radio">Voice</span>
                            <span className="text-radio-desc">Hang out together with voice, video, and screenshare</span>
                        </div>
                        <input type="radio" id="text" name="channel-type" value="text" disabled/>
                    </div>
                </div>
                <label className='modal-label'>
                Name:
                <input
                    className='modal-input'
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                </label>
                <button className='modal-submit' type='submit'>Create</button>
                <button className='modal-cancel' onClick={closeModal}>Cancel</button>
            </form>
            </div>
        </div>
    )
}

export default NewChannel;
