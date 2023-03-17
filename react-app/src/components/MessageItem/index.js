import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './MessageItem.css';

function MessageItem({ message }) {
    let currentServer = useSelector(state => state.server.currentServer);
    // let allServers = useSelector(state => state.server.allUserServers);
    let {serverId, channelId} = useParams();

    let serverMembersArr;
    if (!currentServer) return null;
    serverMembersArr = currentServer[serverId]["members"];

    // normalize serverMembers to allow for keying to get sending user
    let serverMembers = {};
    serverMembersArr.forEach(member => {
        serverMembers[member.id] = member;
    });

    // get the sending user from normalized serverMembers
    let user = serverMembers[message.userId];

    // convert timestamp to a Date object to an ISO string, slice to get the date
    let messageTimestampDate = new Date(message.timestamp).toISOString().slice(0, 10);
    let messageTimestampTime = new Date(message.timestamp).toISOString().slice(11, 16);
    let messageTimestamp = `${messageTimestampDate} ${messageTimestampTime}`;

    let reactionsArr = message.reactions;

    return (
    <div className='message-item'>
        <div className='message-left-and-center'>
            <div className='message-left-side'>
                <img className='message-profile-pic' src={`${user.prof_pic}`} alt={`${user.username.slice(0, -5)} Profile Pic`} />
            </div>
            <div className='message-center'>
                <div className='message-sender'>
                    <p className='message-username'>{user.username.slice(0, -5)}</p>
                    <p className='message-timestamp'>{messageTimestamp}</p>
                </div>
                <div className="message-content">
                    <p>{message.content}</p>
                </div>
                <div className='reactions-container'>
                {reactionsArr.map((reaction) => {
                    return (
                        <div key={`reaction${reaction.id}`} className='placeholder'>
                            <p>Reaction Component here</p>
                        </div>
                    );
                })}
                </div>
            </div>
        </div>
        <div className='message-right-side'>
            <button>Add Emoji</button>
        </div>
    </div>
    );
};

export default MessageItem;
