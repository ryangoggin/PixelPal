import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import serverReducer from './server';
// import userReducer from './user';
import messageReducer from './message';
import emojisReducer from './emojis';
import friendsReducer from './friends';

const rootReducer = combineReducers({
  session: sessionReducer,
  server: serverReducer,
  // user: userReducer,
  messages: messageReducer,
  emoji: emojisReducer,
  friends: friendsReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
