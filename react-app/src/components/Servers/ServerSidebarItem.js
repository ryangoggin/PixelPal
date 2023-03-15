import React, { useState } from "react";
import { useDispatch } from 'react-redux'
import { useModal } from "../../context/Modal";
import './ServerSidebar.css'
import OpenModalButton from "../OpenModalButton";
import CreateServerModal from "../CreateServerModal";

const ServersSidebarItem = ({ server }) => {

    if (server.server_picture === 'image.url' || server.server_picture === '') {
        server.server_picture = 'https://i.redd.it/6jupfeilyhx71.jpg'
    }

    return (
        // each item will redirect to channel component 
        <div className='server-sidebar-icon'>
            <img src={server.server_picture} alt='preview'></img>
        </div>

    )
}
export default ServersSidebarItem