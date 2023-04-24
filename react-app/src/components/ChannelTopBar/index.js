import React from 'react';
import { useSelector } from 'react-redux';
import ServerMembersSidebar from '../ServerMembersSidebar';
import { useModal } from "../../context/Modal";
import './ChannelTopBar.css';

function ChannelTopBar() {
    let currChannel = useSelector(state => state.channels.oneChannel);
    const { setModalContent } = useModal();

    if (!currChannel) return null;

    const handleThreads = (e) => {
        e.preventDefault();
        window.alert('Threads Feature Coming Soon...');
    }

    const handleNotifications = (e) => {
        e.preventDefault();
        window.alert('Notifications Feature Coming Soon...');
    }

    const handlePinned = (e) => {
        e.preventDefault();
        window.alert('Pinned Messages Feature Coming Soon...');
    }

    //opens the server members sidebar component
    const openServerMemberSideBar = () => {
        setModalContent(<ServerMembersSidebar />);
    }


    return (
        <>
            <div className='channel-topbar-container'>
                <div className='channel-topbar-left-side'>
                    <div className='channel-name'>
                        <i className="fa-solid fa-hashtag"></i>
                        <p className='channel-topbar-name'>{currChannel.name}</p>
                    </div>
                </div>
                <div className='channel-topbar-right-side'>
                    <button className='threads-button' onClick={handleThreads}><i className="fa-solid fa-hashtag"></i></button>
                    <button className='threads-button' onClick={handleNotifications}><i className="fa-solid fa-bell-slash"></i></button>
                    <button className='threads-button' onClick={handlePinned}><i className="fa-solid fa-thumbtack"></i></button>
                    <button className='threads-button' id="toggle-sidebar-button" onClick={() => openServerMemberSideBar()}><i className="fa-solid fa-users"></i></button>
                </div>
            </div>
        </>
    );
};

export default ChannelTopBar;
