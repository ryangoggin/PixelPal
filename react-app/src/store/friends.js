// constants
const GET_ALL_FRIENDS = 'friends/GET_ALL_FRIENDS'
const ADD_FRIEND = 'friends/ADD_FRIEND'
// const DELETE_FRIEND = 'friends/DELETE_FRIEND'

// Action Creators
const getAllFriends = (friends) => ({
  type: GET_ALL_FRIENDS,
  friends
})

export const addFriend = (friend) => ({
  type: ADD_FRIEND,
  friend
})

// const deleteFriend = () => ({
//   type: DELETE_FRIEND
// })


// Thunks

export const getAllFriendsThunk = (userId) => async dispatch => {
  const response = await fetch(`/api/friends/${userId}`)

  if (response.ok) {
    let friends = await response.json();
    for (let i = 0; i < friends.friends.length; i++) {
      let friend = friends.friends[i]
      const friendInfo = await fetch(`/api/users/${friend.friendId}`)

      if (friendInfo.ok) {
        const friendInfoJSON = await friendInfo.json()
        friends.friends[i] = friendInfoJSON
      }
    }

    dispatch(getAllFriends(friends));
    return friends
  }
}

export const createFriend = (requestId) => async dispatch => {
  const response = await fetch(`/api/requests/${requestId}`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json'}
  });

  if (response.ok) {
    const friendsArr = await response.json();
    const friendObj = friendsArr[1]; // the new friend is friendUser in the 1 index of friendsArr
    const friend = friendObj.friendUser;
    dispatch(addFriend(friend));
    return friend;
  }
}

// reducer

let initialState = {};

export default function friendsReducer( state = initialState, action) {
  let newState = {}
  switch(action.type) {
    case GET_ALL_FRIENDS:
      action.friends.friends.forEach(friend => newState[friend.id] = friend)
      return newState
    case ADD_FRIEND:
      newState = { ...state };
      newState[action.friend.id] = action.friend;
      return newState;
    default:
      return state;
  }
}
