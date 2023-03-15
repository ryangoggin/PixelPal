import React from 'react';
import './MessageItem.css';

function MessageItem({ message }) {

  return (
    <>
        <div className='message-sender'>
            {/* <div key={ind}>{`${} ${message.msg}`}</div> */}
            <p>{message.user.slice(0, -5)}</p>
        </div>
        <div className='spot-price'>
            <p><b>${Number.parseFloat(spot.price).toFixed(2)}</b>/night</p>
        </div>
    </>
  );
};

export default MessageItem;
