// Constants
const LOAD_EMOJIS = 'emojis/LOAD_EMOJIS'
const CREATE_REACTION = 'emojis/CREATE_REACTIONS'

// Action Creators
const loadEmojis = (emojis) = ({
  type: LOAD_EMOJIS,
  emojis
})

const createReaction = (reaction) => ({
  type: CREATE_REACTION,
  reaction
})


// Selectors
export const allEmojis = state => state.emojis.emojis


// Thunks
export const getAllEmojisThunk = () => async dispatch => {
  const response = await fetch('/api/emojis');

  if (response.ok) {
    let emojis = await response.json();
    dispatch(loadEmojis(emojis))
    return emojis
  }
}

export const createReactionThunk = (reactionData) => async dispatch => {
  const response = await fetch("/api/emojis", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(reactionData)
  })

  if (response.ok) {
    const newReaction = await response.json();
    // going to need to do this within the messages slice of state
    // Query for the emoji based on this reaction!
    // add the new reaction to the message slice of state

    dispatch(createReaction(newReaction))
    return newReaction // will return the emoji once we get there
  }

}


// reducer

let initialState = {
  currentServer: {},
  user: {},
  session: {},
  emojis: {},
  errors: {}
}

export default function emojisReducer( state = initialState, action) {
  let newState = {}
  switch(action.type) {
    case LOAD_EMOJIS:
      newState = {...state, currentServer: {...state.currentServer}, user: {...state.user}, emojis: {...state.emojis} }
      action.emojis.emojis.forEach(emoji => {
        newState.emoji[emoji.id] = emoji;
      })
      return newState
    default:
      return state;
  }
}
