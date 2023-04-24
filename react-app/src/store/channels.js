

// ----------------------------------- action creators ----------------------------------------

const loadServerChannels = (channels) => ({
    type: 'LOAD_CHANNELS',
    channels
});

const loadChannelDetails = (channel) => ({
    type: 'LOAD_DETAILS',
    channel
});

const loadUpdatedChannel = (channel) => ({
  type: 'LOAD_UPDATE',
  channel
});

const addChannel = (channel) => ({
    type: 'ADD_CHANNEL',
    channel
});

const deleteChannel = (channelId) => ({
    type: 'DELETE_CHANNEL',
    channelId
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

// GET CHANNEL TO BE UPDATED
export const getUpdatedChannel = (id) => async (dispatch) => {
  const response = await fetch(`/api/channels/${id}`);

  if (response.ok) {
      const channel = await response.json();
      dispatch(loadUpdatedChannel(channel)); // Dispatch an action to update the Redux store
  }
};


// CREATE A NEW CHANNEL
export const createChannel = (name, serverId) => async (dispatch) => {
    const response = await fetch('/api/channels', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        server_id: serverId,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(addChannel(data)); // Dispatch an action to update the Redux store
      return data;
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
      dispatch(deleteChannel(channelId))
      return
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
export const updateChannel = (channelId, name) => async (dispatch) => {
    const response = await fetch(`/api/channels/${channelId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name
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
        case 'LOAD_UPDATE':
          const updatedChannel = action.channel;
          return {
            ...state,
            updatedChannel: updatedChannel
          }
        case 'ADD_CHANNEL':
            return {
                ...state,
                oneChannel: {
                    ...action.channel
                }
            }
        case 'DELETE_CHANNEL':
            const { channelId } = action;
            const currServerChannels = { ...state.currServerChannels };
            delete currServerChannels[channelId];
            return {
              ...state,
              currServerChannels: currServerChannels
            }
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
