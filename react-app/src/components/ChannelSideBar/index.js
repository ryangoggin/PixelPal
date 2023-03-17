import React, { useEffect, useState } from 'react';
import { useHistory, Link, Redirect, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getServerChannels, getChannelDetails } from '../../store/channels';
import { getServer } from '../../store/server';
import ServerEditModal from "../ServerEditModal"
import ServerDeleteModal from "../ServerDeleteModal"
import OpenModalButton from "../OpenModalButton"
import './channels.css';




function Channels() {

  const history = useHistory();
  const dispatch = useDispatch();
  const { serverId, channelId } = useParams();

  let allChannels = useSelector(state => state.channels.currServerChannels);
  let currChannel = useSelector(state => state.channels.oneChannel)
  let currServer = useSelector(state => state.server.currentServer)

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
      <div>
        <OpenModalButton buttonText='Edit Server' modalComponent={<ServerEditModal server={currServer} />} />
        <OpenModalButton buttonText='Delete Server' modalComponent={<ServerDeleteModal server={currServer} />} />
      </div>
      <div className='text-channels-container'>
        <span className='text-channels'>TEXT CHANNELS</span>
        <span className='plus-symbol'>+</span>
      </div>
      {allChannels.map(channel => (
        <Link
          key={channel.id}
          to={`/channels/${channel.serverId}/${channel.id}`}
          className={`channel-divs${channel.id === currChannel?.id ? ' selected' : ''}`}
        >
          <span className={`hashtag${channel.id === currChannel?.id ? ' selected' : ''}`}>#</span>
          <span className={`channel-text-name${channel.id === currChannel?.id ? ' selected' : ''}`}>{channel.name}</span>
        </Link>
      ))}
    </div>
  )
}


export default Channels;
