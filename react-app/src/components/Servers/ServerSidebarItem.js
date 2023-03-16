import { React, useEffect } from "react";
import './ServerSidebar.css'

const ServersSidebarItem = ({ test, mainRef, server }) => {
    let names = (server.name).split(' ');
    let serverName = []
    for (let name of names) {
        serverName.push(name[0]);
    }
    serverName = serverName.join('')
    let className = '';
    let hasImage = false;

    const closeMenu = (e) => {
        if (test || !mainRef.current.contains(e.target)) {
            mainRef.current.classList.remove('visible')
        }
    };

    useEffect(() => {
        document.body.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    });

    if (server.server_picture === 'image.url' || server.server_picture === '') {
        // server.server_picture = 'https://i.redd.it/6jupfeilyhx71.jpg'
        className = 'server-sidebar-no-img-icon'
    } else {
        className = 'server-sidebar-icon';
        hasImage = true;
    }

    const handleClick = (e) => {
        if (e.type === 'contextmenu') {
            e.preventDefault();
            const { clientX: mouseX, clientY: mouseY } = e;

            mainRef.current.style.top = `${mouseY}px`;
            mainRef.current.style.left = `${mouseX}px`;

            mainRef.current.classList.add("visible");

            console.log(mainRef)
        }
    }

    return (
        // each item will redirect to channel component 
        <>
            <div className={className} onClick={handleClick} onContextMenu={handleClick}>
                {hasImage ?
                    <img src={server.server_picture} alt='preview'></img> :
                    <p>{serverName}</p>
                }
            </div>
        </>
    )
}
export default ServersSidebarItem