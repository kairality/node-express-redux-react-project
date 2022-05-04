import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import sessionReducer from "./session";
import songReducer from "./song";
import currentSongReducer from "./currentSong";
import songCommentsReducer from "./songComments";
import playbackReducer from "./playback";

const rootReducer = combineReducers({
  session: sessionReducer,
  songs: songReducer,
  currentSong: currentSongReducer,
  songComments: songCommentsReducer,
  playback: playbackReducer,
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
