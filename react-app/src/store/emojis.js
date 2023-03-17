// Constants
const LOAD_EMOJIS = 'emojis/LOAD_EMOJIS'
const LOAD_ONE_EMOJI = 'emojis/LOAD_ONE_EMOJI'



// Action Creators
const loadEmojis = (emojis) => ({
  type: LOAD_EMOJIS,
  emojis
})

const loadOneEmoji = (emoji) => ({
  type: LOAD_ONE_EMOJI,
  emoji
})


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



// reducer

let initialState = {
  allEmojis: {},
}

export default function emojisReducer( state = initialState, action) {
  let newState = {}
  switch(action.type) {
    case LOAD_EMOJIS:
      newState = {...state, allEmojis: { }};
      action.emojis.emojis.forEach(emoji => newState.allEmojis[emoji.id] = emoji)
      return newState
    case LOAD_ONE_EMOJI:
      newState = {...state, allEmojis: { ...state.allEmojis }};
      newState.emoji = action.emoji
      return newState
    default:
      return state;
  }
}
