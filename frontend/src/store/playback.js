import { useReducer } from "react";
import { csrfFetch, ezFetch } from "./csrf";

const TICK_TIMESTAMP = "playback/tickTimestamp";
const RESET_TIMESTAMP = "playback/resetTimestamp";
const SET_TIMESTAMP = "playback/setTimestamp";

export const tickTimestamp = (offset = 1) => {
  return {
    type: TICK_TIMESTAMP,
    payload: offset,
  };
};

export const resetTimestamp = () => {
  return {
    type: RESET_TIMESTAMP,
  };
};

export const setTimestamp = (target) => {
    return {
        type: SET_TIMESTAMP,
        payload: target
    }
}

const initialState = { timestamp: 0 };

const playbackReducer = (state = initialState, action) => {
  switch (action.type) {
    case TICK_TIMESTAMP:
      const currentTs = state.timestamp;
      return { timestamp: (currentTs + action.payload)}
    case SET_TIMESTAMP: {
        return { timestamp: action.payload}
    }
    case RESET_TIMESTAMP:
      return initialState;
    default:
      return state;
  }
};

export default playbackReducer;
