import React, { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createReactionThunk, deleteReactionThunk, getChannelMessages } from '../../store/message';
import { useParams } from 'react-router-dom';
import './MessageItem.css';
import './Reaction.css'
import EmojisModal from '../EmojisModal/AllEmojisModal';

function MessageItem({ message }) {

    const dispatch = useDispatch()

    // select data from the Redux store
    const allServers = useSelector((state) => state.server.allUserServers);
    const sessionUser = useSelector((state) => state.session.user);
    const { serverId } = useParams();

    /*
    useMemo is a hook provided by React that helps to optimize the performance
    of functional components by memoizing the result of a computation.
    In general, useMemo accepts two arguments: a function that performs the computation,
    and an array of dependencies. The hook returns the result of the computation,
    which will be memoized and only re-computed when any of the dependencies change.
    */

    // memoize the server members array to prevent unnecessary recomputations
    const serverMembersArr = useMemo(() => {
        if (!allServers) return [];
        const currentServer = allServers[serverId];

        if (!currentServer) return [];

        const { members } = currentServer;

        return members || [];
    }, [allServers, serverId]);

    // normalize serverMembers to allow for keying to get sending user
    const serverMembers = useMemo(() => {
        const normalized = {};
        for (const member of serverMembersArr) {
            normalized[member.id] = member;
        }
        return normalized;
    }, [serverMembersArr]);

    // memoize the user object to prevent unnecessary recomputations
    const user = useMemo(() => serverMembers[message.userId], [
        message.userId,
        serverMembers,
    ]);

    // memoize the message timestamp string to prevent unnecessary recomputations
    const messageTimestamp = useMemo(() => {
        const date = new Date(message.timestamp);
        return `${date.toDateString()} ${date.toLocaleTimeString()}`;
    }, [message.timestamp]);

    // memoize the reactions array to prevent unnecessary recomputations
    const reactionsArr = useMemo(
        () => Object.values(message.reactions),
        [message.reactions]
    );

    // memoize the session user ID to prevent unnecessary recomputations
    const sessionUserId = sessionUser?.id;

    let messageId = message.id;
    let props = { messageId, sessionUserId }


    const addReaction = async (sessionUserId, messageId, emojiId ) => {
        let addedReaction = await dispatch(createReactionThunk(sessionUserId, messageId, emojiId))
        dispatch(getChannelMessages(message.channelId))
        return addedReaction
        }


    const deleteReaction = async (reactionId, messageId) => {
        let deleted_reaction = await dispatch(deleteReactionThunk(reactionId, messageId))
        dispatch(getChannelMessages(message.channelId))
        return deleted_reaction
    }

    if (!user) return null

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
                                    <div
                                        className={+reaction.userId === +sessionUserId ? 'user-emoji-reaction' : 'other-user-reaction'}
                                        key={`reaction${reaction.id}`}
                                        onClick={+reaction.userId === +sessionUserId ? () => { deleteReaction(reaction.id, messageId) } : () => { addReaction(reaction.emojiId, messageId, sessionUserId) }}
                                    >
                                        <p className='emojis-emojichar'> {String.fromCodePoint(reaction.emojiURL)}</p>
                                        <p className='emojis-count'> 1 </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className='message-right-side'>
                <EmojisModal props={props} />
            </div>
        </div>
    );
};


export default MessageItem;
