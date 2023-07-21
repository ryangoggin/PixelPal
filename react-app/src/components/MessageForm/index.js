import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from 'socket.io-client';
import { getChannelDetails } from '../../store/channels';
import ChannelMessages from "../ChannelMessages";
import { getChannelMessages } from "../../store/message";
import "./MessageForm.css";

let socket;

function MessageForm() {
    const dispatch = useDispatch();

    const { serverId, channelId } = useParams();

    const [content, setContent] = useState("");

    const user = useSelector(state => state.session.user);
    const channel = useSelector(state => state.channels.oneChannel);

    useEffect(() => {
        dispatch(getChannelDetails(channelId));
    }, [dispatch, serverId, channelId])

    useEffect(() => {
        socket = io();

        socket.on("channel_chat", (chat) => {
            dispatch(getChannelMessages(channelId))
        })

        if (socket && user) {
            socket.emit('join_channel', { channel_id: channelId, username: user.username }, (response) => {
                console.log('Response from channel join:', response)
            })
        }
        // when component unmounts, disconnect
        return (() => {
            socket.emit('leave_channel', { channel_id: channelId, username: user.username }, (response) => {
                console.log("Response from leave channel: ", response)
            })
            socket.disconnect()
         } )
    }, [channelId, user])

    if (!channel) return null;

    const handleSubmit = async (e) => {
        // e is undefined if message sent with Enter key, check if it exists (message sent by clicking Send button) before running e.preventDefault()
        if (e) e.preventDefault();

        let message = { userId: user?.id, channel_id: channel.id, content: content };
        if (socket) {
            socket.emit("channel_chat", message);
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
            <ChannelMessages />
            <div className="message-form-background">
                <div className='message-form-container'>
                    <form className="message-form" onSubmit={handleSubmit}>
                        {/* at 1800 characters start a counter for characters allowed left (starts at 200), disable the send button above 2000  */}
                        <textarea
                            type="text"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder={`Message ${channel.name}`}
                            onKeyPress={enterKey}
                            required
                        />
                        <div className="message-form-right-side">
                            <div className={content.length >= 1800 ? (content.length > 2000 ? "character-count-error" : "character-count-warning") : "message-hidden"}>{2000 - content.length}</div>
                            <button className={content.length > 2000 ? "message-form-button message-form-text message-form-disabled" : "message-form-button message-form-text"} type="submit" disabled={content.length > 2000}>Send</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}


export default MessageForm;
