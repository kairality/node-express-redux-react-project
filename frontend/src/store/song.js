import { useReducer } from "react";
import { csrfFetch, ezFetch } from "./csrf";

const ADD_SONG = "song/addSong";
const REMOVE_SONG = "song/removeSong";

const addSong = (song) => {
  return {
    type: ADD_SONG,
    payload: song,
  };
};

const removeSong = (song) => {
  return {
    type: REMOVE_SONG,
    payload: song,
  };
};

export const uploadSong = (data) => async (dispatch) => {
  const { userId, title, privPublic, file } = data;
  const formData = new FormData();
  formData.append("userId", userId);
  formData.append("title", title);
  formData.append("public", privPublic);
  if (file) {
    formData.append("file", file);
  }

  const response = await csrfFetch(`/api/songs/`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  const songData = await response.json();
  dispatch(addSong(songData));
  return {...songData}
};

const songReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_SONG:
      console.log(action.payload);
      return { ...state, [action.payload.id]: action.payload };
    case REMOVE_SONG:
      const copyState = { ...state };
      delete copyState[action.payload.id];
      return copyState;
    default:
      return state;
  }
};

export default songReducer;
