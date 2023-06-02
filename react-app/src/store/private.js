// Constants
const LOAD_DMS = 'private/LOAD_DMS'
const LOAD_DM_MESSAGES = 'private/LOAD_DM_MESSAGES'
const CLEAR_DM_MESSAGES = 'private/CLEAR_DM_MESSAGES'
const CREATE_DM_MESSAGE = 'private/CREATE_DM_MESSAGE'
const CREATE_DM_REACTION = 'private/CREATE_DM_REACTION'

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

const createDMMessage = (message) => ({
  type: CREATE_DM_MESSAGE,
  message
})

const createDMReaction = (reaction) => ({
  type: CREATE_DM_REACTION,
  reaction
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

export const createDMMessageThunk = (message) => async (dispatch) => {
  const res = await fetch(`/api/messages`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(message)
  })

  if (res.ok) {
    const message = await res.json();
    dispatch(createDMMessage(message))
    return message;
  }
}

export const createDMReactionThunk = (emoji, messageId, userId) => async (dispatch) => {

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

    case CREATE_DM_MESSAGE:
      newState = {...state, currentDM: {...state.currentDM}}
      newState.currentDM[action.message.id] = action.message
      return newState

    default:
      return state;
  }
}
