// Constants
const LOAD_EMOJIS = 'emojis/LOAD_EMOJIS'
const LOAD_ONE_EMOJI = 'emojis/LOAD_ONE_EMOJI'
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


const deleteReaction = () => ({
  type: DELETE_REACTION
})


// Selectors
// export const allEmojis = state => state.emojis.allEmojis

// Thunks
export const getAllEmojisThunk = () => async dispatch => {
  const response = await fetch('/api/emojis');

  if (response.ok) {
    let emojis = await response.json();
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
