import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000');


const ChatRoom = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        // Join the 'chat' room when the component is mounted
        socket.emit('join', { room: 'chat' });

        // Listen for 'chat' events
        socket.on('chat', (data) => {
            setMessages((prevMessages) => [...prevMessages, data.message]);
        });

        // Leave the 'chat' room when the component is unmounted
        return () => {
            socket.emit('leave', { room: 'chat' });
        };
    }, [messages]);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        socket.emit('chat', { message: inputValue });
        setInputValue('');
    };

    return (
        <div>
        <ul>
            {messages.map((message, index) => (
            <li key={index}>{message}</li>
            ))}
        </ul>
        <form onSubmit={handleFormSubmit}>
            <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            />
            <button type="submit">Send</button>
        </form>
        </div>
    );
};


export default ChatRoom;
