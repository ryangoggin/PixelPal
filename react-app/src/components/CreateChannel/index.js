import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { getServerChannels, createChannel } from '../../store/channels';
import { useHistory } from 'react-router-dom';
import './create-channel.css';


function NewChannel({ serverId }) {
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [channelType, setChannelType] = useState('text');
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(createChannel(name, serverId))
            .then((res) => {
                dispatch(getServerChannels(serverId))
                history.push(`/channels/${res.serverId}/${res.id}`)
                closeModal();
            })

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
                            <i className="fa-regular fa-hashtag"></i>
                            <div className="text-radio-option">
                                <span className="text-radio">Text</span>
                                <span className="text-radio-desc">Send messages, images, GIFs, emojis, opinions, and puns</span>
                            </div>
                            <input type="radio" id="text" name="channel-type" value="text" checked={channelType === "text"} onChange={() => setChannelType("text")} />
                        </div>
                    </div>
                    <div className="radio-buttons-container">
                        <div className="radio-button-na">
                            <i className="fa-solid fa-volume-high"></i>
                            <div className="text-radio-option voice">
                                <span className="text-radio">Voice</span>
                                <span className="text-radio-desc">Hang out together with voice, video, and screenshare</span>
                            </div>
                            <input type="radio" id="text" name="channel-type" value="text" disabled />
                        </div>
                    </div>
                    <span className="channel-name-text">CHANNEL NAME</span>
                    <span className="hashtag-channel-name">#</span>
                    <input
                        className='modal-input'
                        type='text'
                        value={name}
                        placeholder='new-channel'
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <div className="channel-submit-div">
                        <span className='modal-cancel' onClick={closeModal}>Cancel</span>
                        <button className='modal-submit' type='submit' disabled={!name}>Create Channel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewChannel;
