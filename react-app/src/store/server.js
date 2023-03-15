// Constants
const LOAD_SERVERS = 'servers/load'
const LOAD_SERVER = 'servers/server'
const ADD_SERVER = 'servers/create'


// Action Creators
const loadServers = list => ({
  type: LOAD_SERVERS,
  list
})

const loadServer = server => ({
  type: LOAD_SERVER,
  server
})

const createServer = server => ({
  type: ADD_SERVER,
  server
})

// Selectors


// Thunks
export const getServers = () => async (dispatch) => {
  const response = await fetch('/api/servers');

  if (response.ok) {
    const list = await response.json();
    dispatch(loadServers(list));
  }
};

export const getServer = (id) => async (dispatch) => {
  const response = await fetch(`/api/servers/${id}`);

  if (response.ok) {
    const server = await response.json();
    delete server["channels"];
    dispatch(loadServer(server));
    return server;
  }
}

export const addServer = (server) => async (dispatch) => {
  const response = await fetch('/api/servers', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(server)
  })

  if (response.ok) {
    const data = await response.json();

    const responseChannels = await fetch('/api/channels', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description: "General dicussion",
        name: "general",
        server_id: data.id
      })
    })

    if (responseChannels.ok) {
      const data = await responseChannels.json();

      const responseNewServer = await fetch(`/api/servers/${data.serverId}`)

      if (responseNewServer.ok) {
        const data = await responseNewServer.json();
        dispatch(createServer(data));
        return data;
      }

    }
  }
}

// reducer

let initialState = {}

export default function serverReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SERVERS: {
      const allUserServers = {};
      action.list.forEach(server => {
        allUserServers[server.id] = server
      })

      return {
        ...state,
        allUserServers
      }
    }

    case LOAD_SERVER: {
      const currentServer = {};
      currentServer[action.server.id] = action.server;
      return { ...state, currentServer: { ...currentServer } };
    }

    case ADD_SERVER: {
      const newState = { ...state }
      newState.allUserServers[action.server.id] = action.server;
      return newState;
    }

    default:
      return state;
  }
}
