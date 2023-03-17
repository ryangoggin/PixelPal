import { React, useEffect, useRef, useState } from "react";
import './ServerSidebar.css'

const ServersSidebarItem = ({ server }) => {
    let names = (server.name).split(' ');
    let serverName = []
    for (let name of names) {
        serverName.push(name[0]);
    }
    serverName = serverName.join('')
    let className = '';
    let hasImage = false;

    if (server.server_picture === 'image.url' || server.server_picture === '') {
        // server.server_picture = 'https://i.redd.it/6jupfeilyhx71.jpg'
        className = 'server-sidebar-no-img-icon'
    } else {
        className = 'server-sidebar-icon';
        hasImage = true;
    }

    return (
        // each item will redirect to channel component 
        <div className={className}>
            {hasImage ?
                <img src={server.server_picture} alt='preview'></img> :
                <p>{serverName}</p>
            }
        </div>
    )
}


export default ServersSidebarItem
