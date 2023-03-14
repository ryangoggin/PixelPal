import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { useModal } from "../../context/Modal";
import './ServerSidebar.css'

const ServersSidebarItem = ({ server }) => {

    if (server.server_picture === 'image.url' || server.server_picture === '') {
        server.server_picture = 'https://i.redd.it/6jupfeilyhx71.jpg'
    }

    return (
        // each item will redirect to channel component 
        <div>
            <div className='server-sidebar-icon'>
                <img src={server.server_picture} alt='preview'></img>
            </div>

            <div className="popover__content">
                <p className="popover__message">{server.name}</p>
            </div>

        </div >
    )
}
export default ServersSidebarItem