import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getServers } from "../../store/server";
import { NavLink } from 'react-router-dom';
import ServersSidebarItem from "./ServerSidebarItem";
import './ServerSidebar.css'
import OpenModalButton from "../OpenModalButton";
import ServerCreateModal from "../ServerCreateModal";

const ServersSidebar = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    if (user) {
      dispatch(getServers(user))
    }
  }, [user, dispatch])

  let servers = useSelector(state => state.server.orderedList)
  if (!servers) return null;
  servers = Object.values(servers);
  console.log(servers);

  return (
    <>
      {user !== null ? (
        <>
          <div className="server-sidebar">
            <ul className='server-sidebar-ul'>
              <NavLink key='Direct Messages' to={'/channels/@me'}>
                <img className='server-sidebar-icon' src='https://i.redd.it/6jupfeilyhx71.jpg' alt='preview'></img>
              </NavLink>

              <div className='server-sidebar-server-group'>
                {
                  servers.map(server => (
                    < NavLink style={{ textDecoration: 'none' }} key={`server-${server.id}`} to={`/channels/${server.id}/${server.channels[0].id}`}>
                      <ServersSidebarItem server={server} />
                    </NavLink>
                  ))
                }
              </div>

              <li style={{ listStyle: 'none' }} className='server-sidebar-add-server-btn'>
                <OpenModalButton
                  buttonText='+'
                  modalComponent={<ServerCreateModal />}
                />
              </li>

            </ul>
          </div >
        </>
      ) : ''
      }
    </>
    // return a ul of mapping each server to a sidebar item 

  )
}

export default ServersSidebar