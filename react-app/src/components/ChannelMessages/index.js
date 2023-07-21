import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import MessageItem from "../MessageItem";
import { clearMessages, getChannelMessages } from "../../store/message";
import "./ChannelMessages.css";

function ChannelMessages() {
    const dispatch = useDispatch();

    const channel = useSelector(state => state.channels.oneChannel)
    const allMessages = useSelector(state => state.messages);

    const { channelId } = useParams();

    //populate store with channelMessages on render and when channel.id changes
    useEffect(() => {
        dispatch(getChannelMessages(channelId));

        // clear state every time channel Id changes
        return () => dispatch(clearMessages())
    }, [dispatch, channelId]);



    if (!allMessages) return null;
    const allMessagesArr = Object.values(allMessages);

    return (
        <div className='channel-messages-container'>
            <div className="channel-messages-top">
                <div className="channel-icon-container">
                    <h1 className="channel-icon">#</h1>
                </div>
                <h2 className="channel-messages-welcome">Welcome to #{channel.name}!</h2>
                <p className="channel-messages-start">This is the start of the #{channel.name} channel.</p>
            </div>
            <div id='channel-scroller'>
                {allMessagesArr.map((message) => {
                    return (
                        <div key={`message${message.id}`} className='message-item-container'>
                            <MessageItem message={message} />
                        </div>
                    );
                })}
                <div id='channel-anchor'></div>
            </div>
        </div>
    );
}


export default ChannelMessages;
