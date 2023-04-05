import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import MessageItem from "../MessageItem";
import { clearMessages, getChannelMessages } from "../../store/message";
import "./ChannelMessages.css";

function ChannelMessages( { messages } ) {
    const channel = useSelector(state => state.channels.oneChannel)
    const allMessages = useSelector(state => state.messages);
    // if the incoming msg has a channelId, rewrite it in state so that we aren't rendering same data twice
    console.log('what is msg in channelmessages', messages)
    if (messages?.channelId) allMessages[messages.id] = messages
    const { channelId } = useParams();

    const dispatch = useDispatch();

    //populate store with channelMessages on render and when channel.id changes
    //trying to remove allMessages from dependency array (ADD BACK IN IF NEEDED)
    useEffect(() => {
        dispatch(getChannelMessages(channelId));

        // clear state every time channel Id changes
        return () => dispatch(clearMessages())
    }, [dispatch, channelId]); //allMessages

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
            <div id='scroller'>
            {allMessagesArr.map((message) => {
                return (
                    <div key={`message${message.id}`} className='message-item-container'>
                        <MessageItem message={message} />
                    </div>
                );
            })}
            <div id='anchor'></div>
            </div>
        </div>
    );
}


export default ChannelMessages;
