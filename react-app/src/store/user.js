// Constants
const GET_CURRENT_USER = 'user/GET_CURRENT_USER'
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
export const getCurrentUserThunk = () => async dispatch => {
  const response = await fetch("/api/users")

  if (response.ok) {
    const user = await response.json();
    const friendsList = await fetch("/api/friends", user.id)
    if (friendsList.ok) {
      for (friend in friendsList) {
        user.allFriends[friend.id] = friend
      }
      // DO WE NEED TO DO THIS? i think we do since our users are not created
      dispatch(getUser(user));
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


// reducer

let initialState = {
  users: {},
  servers: {},
  channels: {},
  messages: {},
  emojis: {},
  session: {}
}

export default function userReducer( state = initialState, action) {
  let newState = {}
  switch(action.type) {
    case GET_CURRENT_USER:
      newState = {...state, currentUser: {...state.currentUser}, allUsers: {...state.users.allUsers}}
      newState.currentUser = action.user
      return newState
    case CREATE_USER:
      newState = {...state, currentServer: {...state.currentServer}, user: {}, emojis: {...state.emojis} }
      newState.user = action.user
      return newState

    default:
      return state;
  }
}



// servers: {
//   currentServer: {
//     id: 1,
//     ownerId: 1,
//     name: "Server",
//     description: "This is a server",
//     serverPic: "<picture URL>",
//     channels: {
//       [channelId]: {
//         id: 1,
//         name: "Channel",
//         description: "This is a channel",
//         messages: {
//           [messageId]: {
//             id: 1,
//             content: "This is a message",
//             timestamp: 2023-03-12 12:00:00.000000,
//             reactions: [
//               [reactionId]: {
//                 id: 1,
//                 userId: 1,
//                 emoji: <unicode for emoji>
//               }
//             ]
//           }
//         }
//       }
//     },
//     members: {
//       [memberId]: memberData
//     }
//   },
//   allUserServers: {
//     [serverId]: serverData
//   }
// },
