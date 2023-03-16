import { React, useEffect, useRef, useState } from "react";
import './ServerSidebar.css'
import ContextMenu from "../ContextMenu";

const ServersSidebarItem = ({ test, mainRef, server }) => {
    let names = (server.name).split(' ');
    let serverName = []
    for (let name of names) {
        serverName.push(name[0]);
    }
    serverName = serverName.join('')
    let className = '';
    let hasImage = false;

    // const closeMenu = (e) => {
    //     if (mainRef === null || !mainRef.current.contains(e.target)) {
    //         mainRef.current.classList.remove('visible')
    //     }
    // };

    // useEffect(() => {
    //     document.body.addEventListener('click', closeMenu);

    //     return () => document.removeEventListener("click", closeMenu);
    // });


    const [clicked, setClicked] = useState(false);
    const [points, setPoints] = useState({
        x: 0,
        y: 0,
    });

    useEffect(() => {
        const handleClick = () => setClicked(false);
        window.addEventListener("click", handleClick);
        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, []);

    if (server.server_picture === 'image.url' || server.server_picture === '') {
        // server.server_picture = 'https://i.redd.it/6jupfeilyhx71.jpg'
        className = 'server-sidebar-no-img-icon'
    } else {
        className = 'server-sidebar-icon';
        hasImage = true;
    }

    // const handleClick = (e) => {
    //     if (e.type === 'contextmenu') {
    //         e.preventDefault();
    //         const { clientX: mouseX, clientY: mouseY } = e;

    //         mainRef.current.style.top = `${mouseY}px`;
    //         mainRef.current.style.left = `${mouseX}px`;

    //         mainRef.current.classList.add("visible");
    //         console.log('right click')
    //         console.log(mainRef)
    //     }
    // }

    return (
        // each item will redirect to channel component 
        <>
            <div className={className} onContextMenu={(e) => {
                e.preventDefault();
                setClicked(true);
                setPoints({
                    x: e.pageX,
                    y: e.pageY,
                });
                console.log("Right Click", e.pageX, e.pageY);
            }}
            >
                {hasImage ?
                    <img src={server.server_picture} alt='preview'></img> :
                    <p>{serverName}</p>
                }
            </div>
            <ContextMenu server={server} top={points.y} left={points.x} />
        </>
    )
}
export default ServersSidebarItem