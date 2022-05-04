import { useReducer } from "react";
import { csrfFetch, ezFetch } from "./csrf";

const LOAD_COMMENTS = "songComments/loadComments";
const REMOVE_COMMENT = "songComments/removeComment";
const ADD_COMMENT = "songComments/addComment";

const addComment = (data) => {
  return {
    type: ADD_COMMENT,
    payload: data,
  };
};

const removeComment = (comment) => {
  return {
    type: REMOVE_COMMENT,
    payload: comment,
  };
};

const loadComments = (comments) => {
  return {
    type: LOAD_COMMENTS,
    payload: comments,
  };
};

const initialState = { comments: [], usersCommented: [] };

export const genComments = (song) => async (dispatch) => {
  if (!song) {
      return initialState;
  }
  const response = await ezFetch(`/api/songs/${song.id}/comments`);
  if (response.ok) {
      const comments =  await response.json();
      dispatch(loadComments(comments));
  }
};

const songCommentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_COMMENTS:
      const {songComments: comments, usersCommented} = action.payload;
      return { ...state, comments, usersCommented };
    case REMOVE_COMMENT:
      return state;
    case ADD_COMMENT:
        return state;
    default:
      return state;
  }
};

export default songCommentsReducer;
