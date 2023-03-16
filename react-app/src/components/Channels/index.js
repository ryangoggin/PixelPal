import React, { useEffect, useState } from 'react';
import { useHistory, Link, Redirect, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getServerChannels, getChannelDetails } from '../../store/channels';
import { getServer } from '../../store/server';
import './channels.css';




// Create logic for if user

function Channels() {

  const history = useHistory();
  const dispatch = useDispatch();
  const { serverId, channelId } = useParams();

  let allChannels = useSelector(state => state.channels.currServerChannels);
  let oneChannel = useSelector(state => state.channels.oneChannel)
  let currServer = useSelector(state => state.server.currentServer)

  useEffect(() => {
    dispatch(getServerChannels(serverId));
    dispatch(getChannelDetails(channelId));
    dispatch(getServer(serverId));
  }, [dispatch, serverId, channelId])





  if (!allChannels) allChannels = [];
  else allChannels = Object.values(allChannels);

  if (!currServer) currServer = {};
  else currServer = currServer[1];

  console.log(oneChannel)



  return (
    <div className='channel-sidebar'>
      {currServer && (
      <div className='server-name-container'>
        <span className='server-name-text'>{currServer.name}</span>
      </div>
      )}
      <div className='text-channels-container'>
        <span className='text-channels'>TEXT CHANNELS</span>
      </div>
      {allChannels.map(channel => (
        <div key={channel.id} className='channel-divs'>
          <span className='hashtag'>#</span>
          <span className='channel-text-name'>{channel.name}</span>
        </div>
      ))}
    </div>
  )
}


export default Channels;
