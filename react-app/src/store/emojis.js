// Constants
const LOAD_EMOJIS = 'emojis/LOAD_EMOJIS'
const LOAD_ONE_EMOJI = 'emojis/LOAD_ONE_EMOJI'
const CREATE_REACTION = 'emojis/CREATE_REACTION'
const DELETE_REACTION = 'emojis/DELETE_REACTION'

// Action Creators
const loadEmojis = (emojis) => ({
  type: LOAD_EMOJIS,
  emojis
})

const loadOneEmoji = (emoji) => ({
  type: LOAD_ONE_EMOJI,
  emoji
})


const createReaction = (reaction) => ({
  type: CREATE_REACTION,
  reaction
})

const deleteReaction = () => ({
  type: DELETE_REACTION
})




// Selectors
// export const allEmojis = state => state.emojis.allEmojis

// Thunks
export const getAllEmojisThunk = () => async dispatch => {
  const response = await fetch('/api/emojis');
  console.log("get all emojis thunk running ")

  if (response.ok) {
    let emojis = await response.json();
    // console.log('emojis json from fetch', emojis)
    dispatch(loadEmojis(emojis))
    return emojis
  }
}

export const loadOneEmojiThunk = (id) => async dispatch => {
  const response = await fetch(`/api/emojis/${id}`)

  if (response.ok) {
    let emoji = await response.json();
    dispatch(loadOneEmoji(emoji))
    return emoji
  }
}




// to add to messages later
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


export const deleteReactionThunk = (reactionId) => async dispatch => {
  const response = await fetch(`/api/emojis/${reactionId}`)

  if (response.ok) {
    // let del_reaction = await response.json()
    dispatch(deleteReaction())
    return ('successfully deleted!')
  }
}


// reducer

let initialState = {
  allEmojis: {},
  emoji: {}
}

export default function emojisReducer( state = initialState, action) {
  let newState = {}
  switch(action.type) {
    case LOAD_EMOJIS:
      newState = {...state, allEmojis: { }, emoji: { ...state.emoji }};
      action.emojis.emojis.forEach(emoji => newState.allEmojis[emoji.id] = emoji)
      return newState
    case LOAD_ONE_EMOJI:
      newState = {...state, allEmojis: { ...state.allEmojis }, emoji: {}};
      newState.emoji = action.emoji
      return newState
    default:
      return state;
  }
}
