import React, { useState } from 'react';
import ServerContextMenu from '../ServerContextMenu'
import { NavLink } from 'react-router-dom';
import ServersSidebarItem from '../Servers/ServerSidebarItem'

const ServerList = ({ servers }) => {
    const [selectedServer, setSelectedServer] = useState(null);

    const handleServerClick = (server) => {
        setSelectedServer(server);
    }

    return (
        <div>
            <ul>
                {
                    servers.map(server => (
                        <li key={server.id} onContextMenu={() => handleServerClick(server)}>
                            <NavLink style={{ textDecoration: 'none' }} key={server.id} to={`/channels/${server.id}/${server.channels[0].id}`}>
                                <ServersSidebarItem server={server} />
                            </NavLink>
                        </li>

                    ))
                }
            </ul>
            {selectedServer && (
                <ServerContextMenu serverId={selectedServer.id} />
            )}
        </div>
    )

}

export default ServerList 