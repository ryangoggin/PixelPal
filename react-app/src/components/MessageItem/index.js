import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createReactionThunk, deleteReactionThunk } from '../../store/message';

import './MessageItem.css';
import './Reaction.css'
import EmojisModal from '../EmojisModal/AllEmojisModal';

function MessageItem({ message }) {

    const dispatch = useDispatch()

    let allServers = useSelector(state => state.server.allUserServers);

    let serverMembersArr;
    if (!allServers) return null
    serverMembersArr = allServers[1]["members"]; //hard coded to use a specific server until currentServer slice merged in from dev

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

    let reactionsArr = Object.values(message.reactions);
    let [messageId, userId] = [message.id, user.id]
    let props = {messageId, userId}

    // if a reaction is not yours you can click on a reaction to add one
    const addReaction = async (userId, messageId, emojiId ) => {
        let addedReaction = await dispatch(createReactionThunk(userId, messageId, emojiId))
        return addedReaction
    }

    // if a reaction is yours, you can click on a reaction and delete it

    const deleteReaction = async (reactionId, messageId) => {
        let deleted_reaction = await dispatch(deleteReactionThunk(reactionId, messageId))
        return deleted_reaction
    }

    let emojiId


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
                    <div>
                        {user.id === reaction.userId ?
                        <div
                        className='user-emoji-reaction'
                        key={`${reaction.id}`}
                        onClick={() => {deleteReaction(reaction.id, messageId)}}
                        >
                            <p className='emojis-emojichar'> {String.fromCodePoint(reaction.emojiURL)}</p>
                            <p className='emojis-count'> 1 </p>
                        </div>
                        : <div
                        className='other-user-reaction'
                        key={`${reaction.id}`}
                        onClick={() => {addReaction(userId, emojiId=reaction.emojiId, messageId)}}

                        >
                            <p className='emojis-emojichar'> {String.fromCodePoint(reaction.emojiURL)}</p>
                            <p className='emojis-count'> 1 </p>
                        </div> }

                    </div>
                    );
                })}
                </div>
            </div>
        </div>
        <div className='message-right-side'>
            <EmojisModal props={props}/>
        </div>
    </div>
    );
};

export default MessageItem;
