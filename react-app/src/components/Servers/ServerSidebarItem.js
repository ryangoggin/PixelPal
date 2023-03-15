import { React, useRef, useEffect } from "react";
import { Redirect } from "react-router-dom";
import './ServerSidebar.css'

const ServersSidebarItem = ({ mainRef, server }) => {
    let names = (server.name).split(' ');
    let serverName = []
    for (let name of names) {
        serverName.push(name[0]);
    }
    serverName = serverName.join('')
    let className = '';
    let hasImage = false;

    const closeMenu = () => {
        mainRef.current.classList.remove('visible')
    };

    useEffect(() => {
        document.body.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, []);

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
            console.log(mouseX, mouseY);

            mainRef.current.style.top = `${mouseY}px`;
            mainRef.current.style.left = `${mouseX}px`;

            console.log(mainRef.current.style.left);

            mainRef.current.classList.add("visible");
            console.log(mainRef);
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