// ----------------------------------- constants ----------------------------------------
const LOAD_SERVERS = 'servers/load_all'
const LOAD_SERVER = 'servers/load_one'
const ADD_SERVER = 'servers/create'
const EDIT_SERVER = 'servers/edit'
const DELETE_SERVER = 'servers/delete'

// ----------------------------------- action creators ----------------------------------------
const loadServers = (list, user) => ({
  type: LOAD_SERVERS,
  list: list,
  user: user
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

const removeServer = (id) => ({
  type: DELETE_SERVER,
  serverId: id

})
// ----------------------------------- thunk action creators ----------------------------------------

// GET ALL SERVERS //
export const getServers = (user) => async (dispatch) => {
  const response = await fetch('/api/servers');

  if (response.ok) {
    const list = await response.json();
    dispatch(loadServers(list, user));
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

export const deleteServer = (serverId) => async (dispatch) => {
  const response = await fetch(`/api/servers/${serverId}`, {
    method: 'DELETE',
    headers: { "Content-Type": "application/json" }
  })

  if (response.ok) {
    dispatch(removeServer(serverId));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.'];
  }

}

// ----------------------------------- reducer ----------------------------------------

let initialState = {}

export default function serverReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SERVERS: {
      const allUserServers = {};
      let myServers = [];

      for (let server of action.list) {
        if (server.owner_id === action.user.id) {
          myServers.push(server);
        }

        for (let member of server.members) {
          if (member.username === action.user.username) {
            myServers.push(server);
          }
        }
      }

      myServers.forEach(server => {
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

    case DELETE_SERVER: {
      const newState = { ...state }
      return newState;
    }

    default:
      return state;
  }
}
