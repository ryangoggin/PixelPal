// Constants
const LOAD_DMS = 'private/LOAD_DMS'

// Action Creators
const loadAllDMs = (directMessages) => ({
  type: LOAD_DMS,
  directMessages
})

// Thunks

export const loadAllDmsThunk = (userId) => async (dispatch) => {
  const res = await fetch(`/api/private/user/${userId}`)

  if (res.ok) {
    let data = await res.json();
    dispatch(loadAllDMs(data))
    return data;
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

    default:
      return state;
  }
}
