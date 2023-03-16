import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { useState } from 'react';
import { createChannel } from '../../store/channels'


function NewChannel({ serverId }) {
    const dispatch = useDispatch();


    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([]);

    const { closeModal } = useModal();


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(createChannel(name, description, serverId));
        if (data) {
          setErrors(data);
        } else {
          closeModal();
        }
      }

    return (
        <div className='modal'>
            <div className='modal-content'>
            <form onSubmit={handleSubmit}>
                <h2 className='modal-header'>Create a Channel</h2>
                {errors.length > 0 && (
                <ul className='modal-errors'>
                    {errors.map((error, idx) => <li key={idx} className='modal-error'>{error}</li>)}
                </ul>
                )}
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
                <label className='modal-label'>
                Description:
                <textarea
                    className='modal-textarea'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                </label>
                <button className='modal-submit' type='submit'>Create</button>
                <button className='modal-cancel' onClick={closeModal}>Cancel</button>
            </form>
            </div>
        </div>
    )
}

export default NewChannel;
