// Constants
const LOAD_SERVERS = 'servers/load'
const LOAD_SERVER = 'servers/server'


// Action Creators
const loadServers = list => ({
  type: LOAD_SERVERS,
  list
})

const loadServer = server => ({
  type: LOAD_SERVER,
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


// reducer

let initialState = {
  // users: {},
  // servers: {}, 
  // session: {},
  // errors: {}
}

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

    default:
      return state;
  }
}
