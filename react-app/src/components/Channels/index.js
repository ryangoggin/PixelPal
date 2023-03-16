import React, { useEffect, useState } from 'react';
import { useHistory, Link, Redirect, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getServerChannels } from '../../store/channels';
import { getChannelDetails } from '../../store/channels';
import './channels.css';




// Create logic for if user

function Channels() {

  const history = useHistory();
  const dispatch = useDispatch();
  const { serverId, channelId } = useParams();

  useEffect(() => {
    dispatch(getServerChannels(serverId));
    dispatch(getChannelDetails(channelId));
  }, [dispatch, serverId, channelId])

  return (
    <div>
      Channels
    </div>
  )
}


export default Channels;
