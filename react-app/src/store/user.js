// Constants
const GET_ALL_USERS = 'user/GET_ALL_USERS'
const GET_CURRENT_USER = 'user/GET_CURRENT_USER'
const CREATE_USER = 'user/CREATE_USER'
const UPDATE_USER = 'user/UPDATE_USER'
const DELETE_USER = 'user/DELETE_USER'

// Action Creators

const getAllUsers = (users) => ({
  type: GET_ALL_USERS,
  users
})


const getCurrentUser = (user) => ({
  type: GET_CURRENT_USER,
  user
})

const createUser = (user) => ({
  type: CREATE_USER,
  user
})

const updateUser = (user) => ({
  type: UPDATE_USER,
  user

})

const deleteUser = (user) => ({
  type: DELETE_USER,
  user
})



// Selectors
export const current_user = state => state.user.currentUser
export const all_users = state => state.user.allUsers


// Thunks

export const getAllUsersThunk = () => async dispatch => {
  const response = await fetch("api/users")

  if (response.ok) {
    users = await response.json();
    dispatch(getAllUsers(users));
    return users
  }
}

export const getCurrentUserThunk = (id) => async dispatch => {
  const response = await fetch(`/api/users/${id}`)

  if (response.ok) {
    const user = await response.json();
    const friendsList = await fetch("/api/friends", user.id)
    if (friendsList.ok) {
      for (friend in friendsList) {
        user.allFriends[friend.id] = friend
      }
      dispatch(getCurrentUser(user));
      return user;
    }
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

export const updateUserThunk = (userData) => async dispatch => {
  const response = await fetch(`/api/users/${+userData.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData)
  })

  if (response.ok) {
    const updatedUser = await response.json()
    dispatch(updateUser(updatedUser))
    return updatedUser
  }

}



export const deleteUserThunk = (userId) => async dispatch => {
  const response = await fetch(`/api/users/${userId}`, {
    method: "DELETE"
  });

  if (response.ok) {
    const success = await response.json();
    dispatch(deleteUser(spotId))
    return success
  }

}

// reducer

let initialState = {
  users: {},
}

export default function userReducer( state = initialState, action) {
  let newState = {}
  switch(action.type) {
    case GET_ALL_USERS:
      newState = {...state, currentUser: {...state.currentUser}, allUsers: {}}
      action.users.forEach(user => newState.allUsers[user.id] = user)
      return newState
    case GET_CURRENT_USER:
      newState = {...state, currentUser: {}, allUsers: {...state.allUsers}}
      newState.currentUser = action.user
      return newState
    case CREATE_USER:
      newState = {...state, currentUser: {}, allUsers: {...state.allUsers}}
      newState.currentUser = action.user
      return newState
    case UPDATE_USER:
      newState = {...state, currentUser: {}, allUsers: {...state.allUsers}}
      newState.currentUser = action.user
      return newState
    case DELETE_USER:
      newState = {...state, currentUser: {...state.currentUser}, allUsers: {...state.allUsers}}
      delete newState.allUsers[action.userId]
      return newState
    default:
      return state;
  }
}
