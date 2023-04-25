// constants
const LOAD_REQUESTS = 'friends/LOAD_REQUESTS'

// Action Creators
const loadRequests = (requests) => ({
  type: LOAD_REQUESTS,
  requests
})

// Thunks
export const getAllRequests = () => async dispatch => {
  const response = await fetch(`/api/requests`)

  if (response.ok) {
    let requests = await response.json();
    dispatch(loadRequests(requests));
    return requests
  }
}





// reducer

let initialState = {};

export default function friendRequestReducer( state = initialState, action) {
  let newState = {};
  switch(action.type) {
    case GET_ALL_FRIEND_REQUESTS:
        const friendReqsArr = Object.values(action.requests);
        friendReqsArr.forEach(request => {
          newState[request.id] = request;
        });
        return newState;
    default:
      return state;
  }
}
