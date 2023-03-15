import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { io } from 'socket.io-client';
let socket;
import "./MessageForm.css";

function MessageForm() {
    // const dispatch = useDispatch();
    const [content, setContent] = useState("");
    const [messages, setMessages] = useState([]);
    const user = useSelector(state => state.session.user)

    // will need room functionality? broadcast to just users in the room (channel), not all users?
    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();

        socket.on("chat", (chat) => {
            setMessages(messages => [...messages, chat])
        })
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);

        socket.emit("chat", { user: user.username, msg: chatInput });
        setChatInput("")

        // await dispatch("insert create message thunk here")
        //   .catch(
        //     async (res) => {
        //       const data = await res.json();
        //       if (data && data.errors) setErrors(data.errors);
        //     }
        //   );
        setContent("");
        return "thunk in progress..." // will be deleted once thunk is created
    };

    return (
        <>
            <div>
                    {messages.map((message, ind) => (
                        <div key={ind}>{`${message.user}: ${message.msg}`}</div>
                    ))}
            </div>
            <div className='message-form-container'>
                <form className="message-form" onSubmit={handleSubmit}>
                {/* need to look into what frontend validation is done when sending a message over 2000 characters */}
                {/* <ul>
                {errors.map((error, idx) => (
                    <li key={idx} className="errors">{error}</li>
                    ))}
                </ul> */}
                {/* need to figure out dynamic sizing with css? */}
                <textarea
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                />
                <button className="message-form-button message-form-text" type="submit" disabled={content.length > 2000}>Send</button>
                </form>
            </div>
        </>
    )
}


export default MessageForm;
