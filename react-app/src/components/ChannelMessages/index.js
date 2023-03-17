import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import MessageItem from "../MessageItem";
import { getChannelMessages } from "../../store/message";
import "./ChannelMessages.css";

function ChannelMessages({ formMessages }) {
    const currUser = useSelector(state => state.session.user)
    const channel = useSelector(state => state.channels.oneChannel)
    const allMessages = useSelector(state => state.messages);
    const { channelId } = useParams();

    const dispatch = useDispatch();

    //populate store with channelMessages on render and when channel.id/allMessages changes
    useEffect(() => {
        if (channelId) {
            dispatch(getChannelMessages(channelId));
        } else {
            return null;
        }
    }, [dispatch, channelId, allMessages]);

    // return null if can't get channel until next render
    if (!channel) return null

    // allMessages starts as null, use conditional to avoid putting undefined in Object.values
    let allMessagesArr;
    if (allMessages !== null) {
        allMessagesArr = Object.values(allMessages);
    }

    if (!allMessagesArr) {
        return null;
    }

    formMessages = formMessages.filter(message => message.userId !== currUser.id);

    // console.log("formMessages: ", formMessages);
    // console.log("allMessagesArr: ", allMessagesArr);

    return (
        <div className='channel-messages-container'>
            <div className="channel-messages-top">
                <div className="channel-icon-container">
                    <h1 className="channel-icon">#</h1>
                </div>
                <h2 className="channel-messages-welcome">Welcome to #{channel.name}!</h2>
                <p className="channel-messages-start">This is the start of the #{channel.name} channel.</p>
            </div>
            {allMessagesArr.map((message) => {
                return (
                    <div key={`message${message.id}`} className='message-item-container'>
                        <MessageItem message={message}/>
                    </div>
                );
            })}
            {formMessages.map((message, ind) => {
                return (
                    <div key={`formMessage${ind}`} className='message-item-container'>
                        <MessageItem message={message}/>
                    </div>
                );
            })}
        </div>
    );
}


export default ChannelMessages;
