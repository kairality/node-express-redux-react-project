import { useReducer } from "react";
import { csrfFetch, ezFetch } from "./csrf";

const SET_SONG = "currentSong/setSong";
const REMOVE_CURRENT_SONG = 'currentSong/removeCurrentSong'

export const setCurrentSong = (song) => {
  return {
    type: SET_SONG,
    payload: song,
  };
};

export const removeCurrentSong = () => {
  return {
    type: REMOVE_CURRENT_SONG
  };
};

const currentSongReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_SONG:
      return action.payload;
    case REMOVE_CURRENT_SONG:
      return {};
    default:
      return state;
  }
};

export default currentSongReducer;
