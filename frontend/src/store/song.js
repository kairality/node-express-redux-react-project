import { useReducer } from "react";
import { csrfFetch, ezFetch } from "./csrf";

const ADD_SONG = "song/addSong";
const REMOVE_SONG = "song/removeSong";
const LOAD_SONGS = "song/loadSongs";
const UPDATE_SONG = "song/updateSong";

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

const loadSongs = (songs) => {
  return {
    type: LOAD_SONGS,
    payload: songs,
  };
};

const updateSong = (song) => {
  return {
    type: UPDATE_SONG,
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
  return { ...songData };
};

export const editSong = (song, data) => async (dispatch) => {
  const { id } = song;
  const { title, privPublic, imgFile } = data;
  const formData = new FormData();
  formData.append("title", title);
  formData.append("public", privPublic);
  if (imgFile) {
    formData.append("imgFile", imgFile);
  }
  const response = await csrfFetch(`/api/songs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  const songData = await response.json();
  dispatch(addSong(songData));
  return { ...songData };
};

export const deleteSong = (song) => async (dispatch) => {
  const songId = song.id;
  const response = await ezFetch(`/api/songs/${songId}`, "DELETE");
  dispatch(removeSong(song));
};

export const genSongs = (user) => async (dispatch) => {
  const userId = user?.id;
  if (!userId) {
    dispatch(loadSongs([]));
  }
  const [publicResponse, mySongsResponse] = await Promise.all([
    ezFetch("/api/songs"),
    ezFetch(`/api/users/${userId}/songs`),
  ]);
  const [songs, mySongs] = await Promise.all([
    publicResponse.json(),
    mySongsResponse.json(),
  ]);
  if (publicResponse.ok && mySongsResponse.ok) {
    dispatch(loadSongs([...songs, ...mySongs]));
  }
  return songs;
};

const songReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_SONG:
      return { ...state, [action.payload.id]: action.payload };
    case REMOVE_SONG:
      const copyState = { ...state };
      delete copyState[action.payload.id];
      return copyState;
    case LOAD_SONGS:
      const songData = {};
      for (let song of action.payload) {
        songData[song.id] = song;
      }
      return { ...songData };
    default:
      return state;
  }
};

export default songReducer;
