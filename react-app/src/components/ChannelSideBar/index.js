import React, { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getServerChannels, getChannelDetails } from '../../store/channels';
import { getServer } from '../../store/server';
import ServerEditModal from "../ServerEditModal"
import ServerDeleteModal from "../ServerDeleteModal"
import OpenModalButton from "../OpenModalButton"
import NewChannel from '../CreateChannel';
import UpdateChannel from '../EditChannel';
import './channels.css';




function ChannelSideBar() {
  const serverSetting = useRef();
  const dispatch = useDispatch();
  const { serverId, channelId } = useParams();
  const [showMenu, setShowMenu] = useState(false);

  let allChannels = useSelector(state => state.channels.currServerChannels);
  let currChannel = useSelector(state => state.channels.oneChannel);
  let currServer = useSelector(state => state.server.currentServer);

  useEffect(() => {
    dispatch(getServerChannels(serverId));
    dispatch(getChannelDetails(channelId));
    dispatch(getServer(serverId));
  }, [dispatch, serverId, channelId])


  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!serverSetting.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  if (!allChannels) allChannels = [];
  else allChannels = Object.values(allChannels);

  if (!currChannel) return null;
  if (!currServer) return null;

  let serverSettingClassName;
  if (showMenu) {
    serverSettingClassName = "server-dropdown-content"
  } else {
    serverSettingClassName = 'hidden'
  }

  return (
    <div className='channel-sidebar'>
      {currServer && (
        <>
          <div className='server-name-container'>
            <span className='server-name-text'>{currServer.name}</span>
            <span type='button' className='server-setting-btn'><i ref={serverSetting} onClick={() => setShowMenu(!showMenu)} class="fa-solid fa-gear server-btn"></i></span>
            <>
              <div className='server-setting-dropdown'>
                <div id="server-dropdown" className={serverSettingClassName}>
                  <div>
                    <OpenModalButton buttonText='Edit Server' modalComponent={<ServerEditModal server={currServer} serverId={serverId} />} />
                  </div>
                  <div>
                    <OpenModalButton buttonText='Delete Server' modalComponent={<ServerDeleteModal server={currServer} />} />
                  </div>
                </div>
              </div>

            </>
          </div>

        </>
      )}
      <div className='text-channels-container'>
        <span className='text-channels'>TEXT CHANNELS</span>
        <div className='modal-new-channel'>
          <OpenModalButton
            buttonText="+"
            modalComponent={<NewChannel serverId={serverId} />}
          />
        </div>
      </div>
      {allChannels.map(channel => (
        <div className='channel-mapping'>
          <Link
            key={`channel-${channel.id}`}
            to={`/channels/${channel.serverId}/${channel.id}`}
            className={`channel-divs${channel.id === currChannel?.id ? ' selected' : ''} channel-link`}
          >
            <div className='channel-starter'>
              <span className={`hashtag${channel.id === currChannel?.id ? ' selected' : ''}`}>#</span>
              <span className={`channel-text-name${channel.id === currChannel?.id ? ' selected' : ''}`}>{channel.name}</span>
            </div>
            <OpenModalButton
              buttonText={<i class="fa-solid fa-gear"></i>}
              modalComponent={<UpdateChannel channelId={channel.id} />}
            />
          </Link>
        </div>
      ))}
    </div>
  )
}


export default ChannelSideBar;
