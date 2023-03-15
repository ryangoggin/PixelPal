import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getServers } from "../../store/server";
import { NavLink } from 'react-router-dom';
import ServersSidebarItem from "./ServerSidebarItem";
import TestChannels from "./TestChannels";
import './ServerSidebar.css'
import OpenModalButton from "../OpenModalButton";
import CreateServerModal from "../CreateServerModal";


const ServersSidebar = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(getServers())
  }, [user, dispatch])

  let servers = useSelector(state => state.server.allUserServers)
  if (!servers) return null;
  servers = Object.values(servers);

  return (
    <>
      {user !== null ? (
        <div className="server-sidebar">
          <ul className='server-sidebar-ul' >
            {
              servers.map(server => (
                <NavLink key={server.id} to={`/channels/${server.id}/${server.channels[0].id}`}>
                  <ServersSidebarItem server={server} />
                </NavLink>
              ))
            }
            <li className='server-sidebar-add-server-btn'>
              <OpenModalButton
                buttonText='+'
                modalComponent={<CreateServerModal />}
              />
            </li>
          </ul>
        </div >
      ) : ''
      }
    </>
    // return a ul of mapping each server to a sidebar item 

  )
}

export default ServersSidebar