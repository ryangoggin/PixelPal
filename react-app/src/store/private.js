// Constants
const LOAD_DMS = 'private/LOAD_DMS'
const LOAD_DM_MESSAGES = 'private/LOAD_DM_MESSAGES'
const CLEAR_DM_MESSAGES = 'private/CLEAR_DM_MESSAGES'

// Action Creators
const loadAllDMs = (directMessages) => ({
  type: LOAD_DMS,
  directMessages
})

const dmMessages = (messages) => ({
  type:LOAD_DM_MESSAGES,
  messages
})

export const clearDMMessages = () => ({
  type:CLEAR_DM_MESSAGES
})

// Thunks

export const loadAllDmsThunk = (userId) => async (dispatch) => {
  const res = await fetch(`/api/private/dms/${userId}`)

  if (res.ok) {
    let data = await res.json();
    dispatch(loadAllDMs(data))
    return data;
  }
}

export const loadDMMessagesThunk = (dmId) => async (dispatch) => {
  const res = await fetch(`/api/private/messages/${dmId}`)

  if (res.ok) {
    let data = await res.json();
    dispatch(dmMessages(data))
    return data
  }
}



// reducer
let initialState = {
  allDMs: {},
  currentDM: {}
}

export default function privateReducer( state = initialState, action) {
  let newState = {}
  switch(action.type) {
    case LOAD_DMS:
      newState = {...state, allDMs: { }}
      action.directMessages.forEach(dm => {
        newState.allDMs[dm.id] = dm
      })
      return newState

    case LOAD_DM_MESSAGES:
      newState = {...state, currentDM: {}}
      action.messages.forEach(message => {
        newState.currentDM[message.id] = message
      })
      return newState

    case CLEAR_DM_MESSAGES:
      newState = {...state, currentDM: {}}
      return newState

    default:
      return state;
  }
}
