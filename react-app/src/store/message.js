//types
const LOAD_MESSAGES = 'messages/LOAD_MESSAGES';
const ADD_MESSAGE = 'messages/ADD_MESSAGE';
const CREATE_REACTION = 'emojis/CREATE_REACTION'
const DELETE_REACTION = 'emojis/DELETE_REACTION'
// const EDIT_MESSAGE = 'messages/EDIT_MESSAGE';

// POJO action creators:
const loadMessages = messages => ({
    type: LOAD_MESSAGES,
    messages
});

const addMessage = message => ({
    type: ADD_MESSAGE,
    message
});

const createReaction = (reaction) => ({
    type: CREATE_REACTION,
    reaction
})

const deleteReaction = (reactionId, messageId) => ({
    type: DELETE_REACTION,
    reactionId,
    messageId
})

// const editMessage = message => ({
//     type: EDIT_MESSAGE,
//     message
// });

// thunk action creators:
export const getChannelMessages = (channelId) => async (dispatch) => {
  const resMessages = await fetch(`/api/channels/${channelId}/messages`);

  if (resMessages.ok) {
    // Parse the JSON response to get all messages with their reactions
    const channelMessages = await resMessages.json();

    // Extract all the emoji IDs from the reactions in the messages
    const reactions = channelMessages.flatMap((message) =>
      message.reactions.map((reaction) => reaction.emojiId)
    );

    try {
      // Fetch all the distinct emojis in parallel using Promise.all()
      const emojiUrls = await Promise.all(
        [...new Set(reactions)].map((emojiId) =>
          fetch(`/api/emojis/${emojiId}`).then((res) =>
            res.ok ? res.json() : null
          )
        )
      );

      // Create a map of emoji IDs to their URLs for faster lookup
      const emojiMap = emojiUrls.reduce(
        (map, emoji) => (emoji ? { ...map, [emoji.id]: emoji.url } : map),
        {}
      );

      // Map over the channel messages and replace each reaction's emojiId with its corresponding emojiURL
      const messagesWithEmojis = channelMessages.map((message) => ({
        ...message,
        reactions: message.reactions.map((reaction) => ({
          ...reaction,
          emojiURL: emojiMap[reaction.emojiId] || '',
        })),
      }));

      // Dispatch the updated messages with emoji URLs to the store
      dispatch(loadMessages(messagesWithEmojis));
    } catch (error) {
      console.error('Failed to fetch emoji URLs:', error);
      // Handle the error as needed, e.g., by dispatching an action with the error message
      // dispatch(fetchError(error.message));
    }
  }
};



export const createMessage = (message) => async dispatch => {
    const resMessage = await fetch(`/api/messages`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(message)
    });

    if (resMessage.ok) {
        const message = await resMessage.json();
        dispatch(addMessage(message));
        return message;
    }
};

// export const updateMessage = (message, messageId) => async dispatch => {

// };

export const createReactionThunk = (emoji, messageId, userId ) => async dispatch => {
    const response = await fetch("/api/emojis", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({'emojiId':emoji, 'messageId':messageId, 'userId':userId})
    })

    console.log("#TRACKTHIS create reaction thunk running")
    console.log("#TRACKTHIS emoji messageId and userId", emoji, messageId, userId)

    if (response.ok) {
      const newReaction = await response.json();

      const emoji = await fetch(`/api/emojis/${newReaction.emojiId}`)
      if (emoji.ok) {
        const emojiJSON = await emoji.json()
        console.log("TRACKTHIS emoji json?", emojiJSON)
        newReaction['emojiURL'] = emojiJSON.url
      }

      dispatch(createReaction(newReaction))
      console.log("TRACKTHIS new reaction created", newReaction)
      return newReaction
    }

  }


  export const deleteReactionThunk = (reactionId, messageId) => async dispatch => {
    const response = await fetch(`/api/emojis/${reactionId}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    })

    if (response.ok) {
      dispatch(deleteReaction(reactionId, messageId))
      return ('successfully deleted!')
    }
  }


// initial state for reducer:
const initialState = {};

// reducer:
const messageReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case LOAD_MESSAGES:
      const messagesArr = Object.values(action.messages);
      messagesArr.forEach(message => {
          newState[message.id] = message;
      });
      return newState;
    case ADD_MESSAGE:
      newState = {...state};
      newState[action.message.id] = action.message;
      return newState;
    // case EDIT_MESSAGE:
    //     return {

    //     }
    case CREATE_REACTION:
      newState = {...state}
      newState[action.reaction.messageId].reactions[action.reaction.id] = action.reaction
      return newState
    case DELETE_REACTION:
      newState = {...state}
      delete newState[action.messageId].reactions[action.reactionId]
      return newState
    default:
        return state;
  }
}

export default messageReducer;
