import React, { useEffect, useRef } from "react";
import OpenModalButton from "../OpenModalButton";
import EditServerModal from "../ServerEditModal";

const ContextMenu = ({ server, top, left }) => {

    return (
        <div id='server-sidebar-context-menu'>
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
        </div >
    )
}

export default ContextMenu