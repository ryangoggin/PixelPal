// ----------------------------------- constants ----------------------------------------
const LOAD_SERVERS = 'servers/load'
const LOAD_SERVER = 'servers/server'
const ADD_SERVER = 'servers/create'
const EDIT_SERVER = 'servers/edit'

// ----------------------------------- action creators ----------------------------------------
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

const updateServer = server => ({
  type: EDIT_SERVER,
  server
})

// ----------------------------------- thunk action creators ----------------------------------------

// GET ALL SERVERS //
export const getServers = () => async (dispatch) => {
  const response = await fetch('/api/servers');

  if (response.ok) {
    const list = await response.json();
    dispatch(loadServers(list));
  }
};

// GET SINGLE SERVER BY ID // 
export const getServer = (id) => async (dispatch) => {
  const response = await fetch(`/api/servers/${id}`);

  if (response.ok) {
    const server = await response.json();
    delete server["channels"];
    dispatch(loadServer(server));
    return server;
  }
}

// ADD A NEW SERVER // 
export const addServer = (server, username) => async (dispatch) => {
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

      const responseMembers = await fetch(`/api/servers/${data.serverId}/members`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username
        })
      })

      if (responseMembers.ok) {
        const data = await responseMembers.json();
        dispatch(createServer(data));
        return data;
      }
    }
  }
}


// EDIT A SERVER // 
export const editServer = (serverId, server) => async (dispatch) => {
  const response = await fetch(`/api/servers/${serverId}`, {
    method: 'PUT',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(server)
  })

  if (response.ok) {
    const data = await response.json();
    dispatch(updateServer(data));
    return data;
  }
}

// DELETE A SERVER // 


// ----------------------------------- reducer ----------------------------------------


let initialState = {}

export default function serverReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SERVERS: {
      const allUserServers = {};
      action.list.forEach(server => {
        allUserServers[server.id] = server
      })
      const orderedList = Object.values(allUserServers).reverse();

      return {
        ...state,
        allUserServers,
        orderedList
      }
    }

    case LOAD_SERVER: {
      const currentServer = {};
      currentServer[action.server.id] = action.server;
      return { ...state, currentServer: { ...currentServer } };
    }

    case ADD_SERVER: {
      const newState = { ...state };
      const allUserServers = { ...state.allUserServers };
      const orderedList = [...state.orderedList];
      allUserServers[action.server.id] = action.server;
      orderedList.unshift(action.server);
      return { ...newState, allUserServers, orderedList };
    }

    case EDIT_SERVER: {
      return {
        ...state,
        currentServer: { ...state.currentServer, [action.server.id]: action.server }
      }
    }

    default:
      return state;
  }
}
