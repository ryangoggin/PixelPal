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

const deleteReaction = () => ({
    type: DELETE_REACTION
})

// const editMessage = message => ({
//     type: EDIT_MESSAGE,
//     message
// });

// thunk action creators:
export const getChannelMessages = (channelId) => async dispatch => {
    const resMessages = await fetch(`/api/channels/${channelId}/messages`);

    if (resMessages.ok) {
      const channelMessages = await resMessages.json()

      for (let i = 0; i < channelMessages.length ; i++ ) {
        let reactionsArr = channelMessages[i].reactions

        // need to find better way to do this - changing emojiId to URL
        for (let x = 0 ; x < reactionsArr.length ; x++ ) {
          let reaction = reactionsArr[x]

          if (typeof reaction.emojiId === 'number') {
            const emoji = await fetch(`/api/emojis/${reaction.emojiId}`)

            if (emoji.ok) {
              let emojijson = await emoji.json()
              channelMessages[i].reactions[x].emojiId = emojijson.url
          }
          }
        }
      }

      dispatch(loadMessages(channelMessages));
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

    if (response.ok) {
      const newReaction = await response.json();
    //   console.log('new reaction created if response.ok', newReaction)

      const emoji = await fetch(`/api/emojis/${newReaction.emojiId}`)
      if (emoji.ok) {
        const emojiJSON = await emoji.json()
        // console.log('emoji json after creating new reaction', emojiJSON)
        newReaction['emojiId'] = emojiJSON.url
      }

    //   console.log('newreaction, did switching the URL work?', newReaction)

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
            let messageId = action.reaction.messageId
            newState[messageId].reactions[action.reaction.id] = action.reaction
            console.log('am i keying into the new state correctly?', newState[messageId].reactions)
            return newState
        default:
            return state;
    }
}

export default messageReducer;
