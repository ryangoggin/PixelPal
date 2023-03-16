

// ----------------------------------- action creators ----------------------------------------

const loadServerChannels = (channels) => ({
    type: 'LOAD_CHANNELS',
    channels
});

const loadChannelDetails = (channel) => ({
    type: 'LOAD_DETAILS',
    channel
});

const addChannel = (channel) => ({
    type: 'ADD_CHANNEL',
    channel
});

const deleteChannel = () => ({
    type: 'DELETE_CHANNEL'
});

const editChannel = (channel) => ({
    type: 'EDIT_CHANNEL',
    channel
});




// -------------------------------------- thunk action creators -----------------------------------

// GET A SPECIFIC SERVER'S CHANNELS
export const getServerChannels = (id) => async dispatch => {
    const res = await fetch(`/api/servers/${id}/channels`);

    if (res.ok) {
        const serverChannels = await res.json();
        dispatch(loadServerChannels(serverChannels));
    }
}

// GET A SPECIFIC CHANNEL BY CHANNEL ID
export const getChannelDetails = (id) => async (dispatch) => {
    const response = await fetch(`/api/channels/${id}`);

    if (response.ok) {
        const channel = await response.json();
        dispatch(loadChannelDetails(channel)); // Dispatch an action to update the Redux store
    }
};


// CREATE A NEW CHANNEL
export const createChannel = (name, description, serverId) => async (dispatch) => {
    const response = await fetch('/api/channels', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        description,
        server_id: serverId,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(addChannel(data)); // Dispatch an action to update the Redux store
      return null;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ['An error occurred. Please try again.'];
    }
};

// DELETE A CHANNEL
export const removeChannel = (channelId) => async (dispatch) => {
    const response = await fetch(`/api/channels/${channelId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      dispatch(deleteChannel());
      return null;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ['An error occurred. Please try again.'];
    }
};

// EDIT A CHANNEL
export const updateChannel = (channelId, name, description) => async (dispatch) => {
    const response = await fetch(`/api/channels/${channelId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(editChannel(data));
      return null;
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ['An error occurred. Please try again.'];
    }
};


// --------------------- CHANNEL REDUCER ----------------------------------------


const initialState = {}


const channelReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_CHANNELS':
            const serverChannels = {};
            const channelsArr = action.channels;
            channelsArr.forEach(channel => {
                serverChannels[channel.id] = channel;
            });
            return {
                ...state,
                currServerChannels: serverChannels
            }
        case 'LOAD_DETAILS':
            const oneChannel = action.channel;
            return {
                ...state,
                oneChannel: oneChannel
            }
        case 'ADD_CHANNEL':
            return {
                ...state,
                oneChannel: {
                    ...action.channel
                }
            }
        case 'DELETE_CHANNEL':
            const newState = {...state};
            return newState;
        case 'EDIT_CHANNEL':
            return {
                ...state,
                oneChannel: {
                    ...action.channel
                }
            }
        default:
            return state;
    }
}


export default channelReducer;
