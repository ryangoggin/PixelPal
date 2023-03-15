// constants
const GET_ALL_FRIENDS = 'friends/GET_ALL_FRIENDS'
const ADD_FRIEND = 'friends/ADD_FRIEND'
const DELETE_FRIEND = 'friends/DELETE_FRIEND'

// Action Creators
const getAllFriends = (friends) => ({
  type: GET_ALL_FRIENDS,
  friends
})

const  addFriend = (friend) => ({
  type: ADD_FRIEND,
  friend
})

const deleteFriend = () => ({
  type: DELETE_FRIEND
})


// Thunks

export const getAllFriendsThunk = (userId) => async dispatch => {
  const response = await fetch("api/friends")

  if (response.ok) {
    let friends = await response.json();
    dispatch(getAllFriends(friends));
    return friends
  }
}

// export const addFriendThunk = (id) => async dispatch => {
//   const response = await fetch(`/api/friends/${id}`)

//   // if (response.ok) {
//   //   const user = await response.json();
//   //   const friendsList = await fetch("/api/friends", user.id)
//   //   if (friendsList.ok) {
//   //     for (let friend in friendsList) {
//   //       user.allFriends[friend.id] = friend
//   //     }
//   //     dispatch(getCurrentUser(user));
//   //     return user;
//   //   }
//   // }
// }




// reducer

let initialState = {
}

export default function friendsReducer( state = initialState, action) {
  let newState = {}
  switch(action.type) {
    case GET_ALL_FRIENDS:
      action.friends.forEach(friend => newState[friend.id] = friend)
      return newState
    default:
      return state;
  }
}
