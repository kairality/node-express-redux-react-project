import { useReducer } from "react";
import { csrfFetch, ezFetch } from "./csrf";

const LOAD_COMMENTS = "songComments/loadComments";
const REMOVE_COMMENT = "songComments/removeComment";
const ADD_COMMENT = "songComments/addComment";

// const addComment = (data) => {
//   return {
//     type: ADD_COMMENT,
//     payload: data,
//   };
// };

// const removeComment = (comment) => {
//   return {
//     type: REMOVE_COMMENT,
//     payload: comment,
//   };
// };

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

export const makeComment = (comment) => async (dispatch) => {
  const {songId, userId, body, songTimestamp} = comment;
  const response = await ezFetch(
      `/api/songs/${songId}/comments`,
      "POST",
      JSON.stringify({userId, songId, body, songTimestamp}),
  );
  if (response.ok) {
      const commentData = await response.json();
      dispatch(loadComments(commentData));
      return { ...commentData };
  }
};

export const deleteComment = (comment) => async (dispatch) => {
  const {id, songId} = comment;
  const response = await ezFetch(`/api/songs/${songId}/comments/${id}`, "DELETE");
  if (response.ok) {
    const commentData = await response.json();
    dispatch(loadComments(commentData));
    return { ...commentData }
  }
};

const songCommentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_COMMENTS:
      const {songComments: commentsRaw, usersCommented: usersCommentedRaw} = action.payload;
      const comments = {};
      const usersCommented = new Set(usersCommentedRaw);
      for (let comment of commentsRaw) {
          comments[comment.id] = comment;
      }
      return { ...state, comments, usersCommented };
    default:
      return state;
  }
};

export default songCommentsReducer;
