import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getServerChannels, getChannelDetails } from '../../store/channels';
import { getServer } from '../../store/server';
import OpenModalButton from '../OpenModalButton';
import NewChannel from '../CreateChannel';
import UpdateChannel from '../EditChannel';
import './channels.css';




function Channels() {

  const dispatch = useDispatch();
  const { serverId, channelId } = useParams();

  let allChannels = useSelector(state => state.channels.currServerChannels);
  let currChannel = useSelector(state => state.channels.oneChannel)
  let currServer = useSelector(state => state.server.currentServer)

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getServerChannels(serverId));
    dispatch(getChannelDetails(channelId));
    dispatch(getServer(serverId));
  }, [dispatch, serverId, channelId])



  if (!allChannels) allChannels = [];
  else allChannels = Object.values(allChannels);

  if (!currServer) currServer = {};
  else {
    currServer = Object.values(currServer)
    currServer = currServer[0];
}
  if (!currChannel) currChannel = {};
  else currChannel = currChannel;



  return (
    <div className='channel-sidebar'>
      {currServer && (
      <div className='server-name-container'>
        <span className='server-name-text'>{currServer.name}</span>
      </div>
      )}
      <div className='text-channels-container'>
        <span className='text-channels'>TEXT CHANNELS</span>
        <div className='modal-new-channel'>
          <OpenModalButton
              buttonText="+"
              modalComponent={<NewChannel serverId={serverId}/>}
          />
        </div>
      </div>
      {allChannels.map(channel => (
        <div className='channel-mapping'>
          <Link
            key={channel.id}
            to={`/channels/${channel.serverId}/${channel.id}`}
            className={`channel-divs${channel.id === currChannel?.id ? ' selected' : ''}`}
          >
            <span className={`hashtag${channel.id === currChannel?.id ? ' selected' : ''}`}>#</span>
            <span className={`channel-text-name${channel.id === currChannel?.id ? ' selected' : ''}`}>{channel.name}</span>
          </Link>
          <OpenModalButton
            buttonText={<i class="fa-solid fa-gear"></i>}
            modalComponent={<UpdateChannel channelId={channel.id}/>}
          />
        </div>
      ))}
    </div>
  )
}


export default Channels;
