// constants
const LOAD_RECEIVED_REQUESTS = 'requests/LOAD_RECEIVED_REQUESTS';
const LOAD_SENT_REQUESTS = 'requests/LOAD_SENT_REQUESTS';
const ADD_SENT_REQUEST = 'requests/ADD_SENT_REQUEST';
const REMOVE_RECEIVED_REQUEST = 'requests/REMOVE_RECEIVED_REQUEST';
const REMOVE_SENT_REQUEST = 'requests/REMOVE_SENT_REQUEST';

// Action Creators
const loadReceivedRequests = (requests) => ({
  type: LOAD_RECEIVED_REQUESTS,
  requests
});

const loadSentRequests = (requests) => ({
  type: LOAD_SENT_REQUESTS,
  requests
});

const addSentRequest = (request) => ({
  type: ADD_SENT_REQUEST,
  request
});

const removeReceivedRequest = (id) => ({
  type: REMOVE_RECEIVED_REQUEST,
  id
});

const removeSentRequest = (id) => ({
  type: REMOVE_SENT_REQUEST,
  id
});

// Thunks
export const getReceivedRequests = () => async dispatch => {
  const response = await fetch(`/api/requests/received`)

  if (response.ok) {
    let requestsObj = await response.json();
    dispatch(loadReceivedRequests(requestsObj.requests));
    return requestsObj.requests;
  }
};

export const getSentRequests = () => async dispatch => {
  const response = await fetch(`/api/requests/sent`)

  if (response.ok) {
    let requestsObj = await response.json();
    dispatch(loadSentRequests(requestsObj.requests));
    return requestsObj.requests;
  }
};

export const createSentRequest = (username) => async (dispatch) => {
  const response = await fetch("/api/requests", {
    method: "POST",
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({
      "username": username
    })
  });

  if (response.ok) {
    const sentRequest = await response.json();
    dispatch(addSentRequest(sentRequest));
    return {"success": username};
  } else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const deleteReceivedRequest = (id) => async dispatch => {
  const res = await fetch(`/api/requests/${id}`, {
    method: "DELETE"
  });

  if (res.ok) {
    //don't need DELETE res, it is just a success message
    dispatch(removeReceivedRequest(id));
  }
};

export const deleteSentRequest = (id) => async dispatch => {
  const res = await fetch(`/api/requests/${id}`, {
    method: "DELETE"
  });

  if (res.ok) {
    //don't need DELETE res, it is just a success message
    dispatch(removeSentRequest(id));
  }
};

// reducer
let initialState = { received: null, sent: null };

export default function friendRequestReducer( state = initialState, action) {
  switch(action.type) {
    case LOAD_RECEIVED_REQUESTS:
        const received = {};
        const receivedReqsArr = Object.values(action.requests);
        receivedReqsArr.forEach(request => {
          received[request.id] = request;
        });
        return {
          ...state,
          received: received
        };
    case LOAD_SENT_REQUESTS:
      const sent = {};
      const sentReqsArr = Object.values(action.requests);
      sentReqsArr.forEach(request => {
        sent[request.id] = request;
      });
      return {
        ...state,
        sent: sent
      };
    case REMOVE_RECEIVED_REQUEST:
      const newReceived = {...state.received};
      delete newReceived[action.id]
      return {
        ...state,
        received: newReceived
      };
    case REMOVE_SENT_REQUEST:
      const newSent = {...state.sent};
      delete newSent[action.id]
      return {
        ...state,
        sent: newSent
      };
    default:
      return state;
  }
}
