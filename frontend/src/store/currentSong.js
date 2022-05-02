import { useReducer } from "react";
import { csrfFetch, ezFetch } from "./csrf";

const SET_SONG = "currentSong/setSong";

export const setCurrentSong = (song) => {
  return {
    type: SET_SONG,
    payload: song,
  };
};

const currentSongReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_SONG:
      return action.payload;
    default:
      return state;
  }
};

export default currentSongReducer;
