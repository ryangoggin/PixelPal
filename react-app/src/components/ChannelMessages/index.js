import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MessageItem from "../MessageItem";
import { getChannelMessages } from "../../store/message";
import "./ChannelMessages.css";

function ChannelMessages({ formMessages }) {
    // const channel = useSelector(state => state.channel.currentChannel)
    let channel = {};
    channel.id = 1; // delete once channel slice of state is made
    channel.name = "Test Server";
    const allMessages = useSelector(state => state.messages);
    // allMessages starts as null, use conditional to avoid putting undefined in Object.values
    let allMessagesArr;
    if (allMessages !== null) {
        allMessagesArr = Object.values(allMessages);
    }

    const dispatch = useDispatch();

    //populate store with channelMessages on render and when channel.id changes
    useEffect(() => {
        dispatch(getChannelMessages(channel.id));
    }, [dispatch, channel.id]);


    if (!allMessagesArr) {
        return null;
    }

    console.log("formMessages: ", formMessages);
    console.log("allMessagesArr: ", allMessagesArr);

    return (
        <div className='channel-messages-container'>
            <div className="channel-messages-top">
                <div className="channel-icon-container">
                    <h1 className="channel-icon"><i>#</i></h1>
                </div>
                <h2 className="channel-messages-welcome">Welcome to #{channel.name}!</h2>
                <p className="channel-messages-start">This is the start of the #{channel.name} channel.</p>
            </div>
            {allMessagesArr.map((message) => {
                return (
                    <div key={`message${message.id}`} className='message-item-container'>
                        <div className='message-item'>
                            <MessageItem message={message}/>
                        </div>
                    </div>
                );
            })}
            {formMessages.map((message, ind) => {
                return (
                    <div key={ind} className='message-item-container'>
                        <div className='message-item'>
                            <MessageItem message={message}/>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}


export default ChannelMessages;
