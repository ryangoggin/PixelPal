import React from 'react';
import { useSelector } from 'react-redux';
import './MessageItem.css';
import EmojisModal from '../EmojisModal/AllEmojisModal';

function MessageItem({ message }) {
    //   let currentServers = useSelector(state => state.server.currentServer);
    let allServers = useSelector(state => state.server.allUserServers);
    let serverMembersArr;
    if (!allServers) {
        return null;
    }
    serverMembersArr = allServers[1]["members"]; //hard coded to use a specific server until currentServer slice merged in from dev

    // normalize serverMembers to allow for keying to get sending user
    let serverMembers = {};
    serverMembersArr.forEach(member => {
        serverMembers[member.id] = member;
    });

    // get the sending user from normalized serverMembers
    let user = serverMembers[message.userId];
    console.log('user from messageitem component', user)

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
            <EmojisModal messageId={message.id} userId={user.id}/>
        </div>
    </div>
    );
};

export default MessageItem;