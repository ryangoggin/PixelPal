import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getServers } from "../../store/server";
import { NavLink } from 'react-router-dom';
import ServersSidebarItem from "./ServerSidebarItem";
import './ServerSidebar.css'
import OpenModalButton from "../OpenModalButton";
import CreateServerModal from "../CreateServerModal";
import EditServerModal from "../EditServerModal";


const ServersSidebar = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const mainRef = useRef();
  let test;

  useEffect(() => {
    if (user) {
      dispatch(getServers())
    }
  }, [user, dispatch])

  let servers = useSelector(state => state.server.orderedList)
  if (!servers) return null;
  servers = Object.values(servers);

  return (
    <>
      {user !== null ? (
        <>
          <div className="server-sidebar">
            <ul className='server-sidebar-ul' >
              <NavLink key='Direct Messages' to={'/channels/@me'}>
                <img className='server-sidebar-icon' src='https://i.redd.it/6jupfeilyhx71.jpg' alt='preview'></img>
              </NavLink>

              <div className='server-sidebar-server-group'>
                {
                  servers.map(server => (
                    <>
                      <NavLink style={{ textDecoration: 'none' }} key={server.id} to={`/channels/${server.id}/${server.channels[0].id}`}>
                        <ServersSidebarItem test={test} mainRef={mainRef} server={server} />
                      </NavLink>

                      <div ref={mainRef} id='server-sidebar-context-menu' style={{ listStyle: 'none' }}>
                        <div className='server-sidebar-context-menu-item'>
                          <li>Invite people
                          </li>
                        </div>
                        <div className='server-sidebar-context-menu-item'>
                          <OpenModalButton
                            buttonText="Edit Server"
                            modalComponent={<EditServerModal server={server} />}
                          />
                        </div>
                        <div className='server-sidebar-context-menu-item'>
                          <OpenModalButton
                            buttonText="Delete Server"
                            modalComponent={<EditServerModal />}
                          />
                        </div>
                      </div>
                    </>



                  ))
                }
              </div>

              <li className='server-sidebar-add-server-btn'>
                <OpenModalButton
                  buttonText='+'
                  modalComponent={<CreateServerModal />}
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