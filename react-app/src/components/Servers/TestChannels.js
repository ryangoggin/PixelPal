import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getServer } from "../../store/server";

const TestChannels = () => {
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
        <h1 style={{ marginLeft: '60px' }}> hello from server {serverId}'s channel component</h1>
    )
}

export default TestChannels