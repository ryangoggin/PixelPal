// Constants
const GET_USER = 'user/GET_USER'
const CREATE_USER = 'user/CREATE_USER'


// Action Creators
const getUser = (user) => ({
  type: GET_USER,
  user
})

const createUser = (user) => ({
  type: CREATE_USER,
  user
})

// Selectors


// Thunks
export const getUserThunk = () => async dispatch => {
  const response = await fetch("/api/users")

  if (response.ok) {
    const user = await response.json();
    dispatch(getUser(user));
    return user;
  }
}

export const createUserThunk = (userData) => async dispatch => {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(userData)
  })

  if (response.ok) {
    const newUser = await response.json();
    dispatch(createUser(newUser))
    return newUser

  }
}


// reducer


let initialState = {
  currentServer: {},
  session: {},
  user: {},
  emojis: {},
  errors: {}
}

export default function userReducer( state = initialState, action) {
  let newState = {}
  switch(action.type) {
    case GET_USER:
      newState = {...state, currentServer: {...state.currentServer}, user: {}, emojis: {...state.emojis} }
      newState.user = action.user
      return newState
    case CREATE_USER:
      newState = {...state, currentServer: {...state.currentServer}, user: {}, emojis: {...state.emojis} }
      newState.user = action.user
      return newState

    default:
      return state;
  }
}
