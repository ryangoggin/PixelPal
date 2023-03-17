import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { io } from 'socket.io-client';
import ChannelMessages from "../ChannelMessages";
import { getChannelDetails } from '../../store/channels';
import { createMessage } from "../../store/message";
import "./MessageForm.css";

let socket;

function MessageForm() {
    const dispatch = useDispatch();
    const [content, setContent] = useState("");
    const [messages, setMessages] = useState([]);
    const user = useSelector(state => state.session.user);
    const channel = useSelector(state => state.channels.oneChannel);
    const { serverId, channelId } = useParams();

    useEffect(() => {
        dispatch(getChannelDetails(channelId));
      }, [dispatch, serverId, channelId])

    // // will need room functionality tp broadcast to just users in the room (channel), not all users --> add channel to dependency array?
    useEffect(() => {
        // open socket connection
        // create websocket
        const socket = io({
            timeout: 10000, // set timeout duration to 10 seconds
        });

        // socket.on('subscribe', function(channel) {
        //     try{
        //       console.log('[socket]','join channel :', channel)
        //       socket.join(channel);
        //       socket.to(channel).emit('user joined', socket.id);
        //     }catch(e){
        //       console.log('[error]','join channel :',e);
        //       socket.emit('error','couldnt perform requested action');
        //     }
        // })

        socket.on("chat", (chat) => {
            setMessages(messages => [...messages, chat])
        })
        // when component unmounts, disconnect
        return (() => {
            if (socket.readyState === 1){
                socket.disconnect();
            }
        })
    }, []);

    if (!channel) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        let message = { userId: user.id, channelId: channel.id, content: content, timestamp: new Date(), reactions: [] };

        // emit message so users can see it in real time
        // add .to('channelName') before .emit when adding room functionality?
        socket.emit("chat", message);

        // add message to DB
        await dispatch(createMessage(message))

        setContent("");
    };

    return (
        <>
            <ChannelMessages formMessages={messages}/>
            <div className="message-form-background">
                <div className='message-form-container'>
                    <form className="message-form" onSubmit={handleSubmit}>
                    {/* at 1800 characters start a counter for characters allowed left (starts at 200), disable the send button above 2000  */}
                    <textarea
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={`Message ${channel.name}`}
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
