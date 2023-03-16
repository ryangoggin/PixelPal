import React from 'react';
import { useSelector } from 'react-redux';
import './MessageItem.css';

function MessageItem({ message }) {
    //  .slice(0, -5) on username to get rid of #tag
    //   let currentServers = useSelector(state => state.server.currentServer);



    return (
    <>
        <div className='message-sender'>
            <p>{message.userId}</p>
        </div>
        <div className="message-content">
            {/* <div key={ind}>{`${} ${message.msg}`}</div> */}

            <p>{message.content}</p>
        </div>
    </>
    );
};

export default MessageItem;
