import React from 'react';
import './MessageItem.css';

function MessageItem({ message }) {
  //  .slice(0, -5) on username to get rid of #tag

  return (
    <>
        <div className='message-sender'>
            {/* <div key={ind}>{`${} ${message.msg}`}</div> */}
            <p>{message}</p>
        </div>
    </>
  );
};

export default MessageItem;
