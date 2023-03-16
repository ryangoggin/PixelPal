import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getServer } from "../../store/server"
import ServerEditModal from "../ServerEditModal"
import ServerDeleteModal from "../ServerDeleteModal"
import OpenModalButton from "../OpenModalButton"

const Channels = () => {
    const dispatch = useDispatch();
    const { serverId } = useParams();

    useEffect(() => {
        dispatch(getServer(serverId))
    }, [dispatch, serverId])

    let server = useSelector(state => state.server.currentServer);

    if (!server) {
        return null;
    }

    return (
        <>
            <h1> {serverId}</h1>
            <OpenModalButton buttonText='Edit Server' modalComponent={<ServerEditModal server={server} />} />
            <OpenModalButton buttonText='Delete Server' modalComponent={<ServerDeleteModal server={server} />} />
        </>

    )
}

export default Channels