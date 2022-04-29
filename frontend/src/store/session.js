import { useReducer } from "react";
import { csrfFetch, ezFetch } from "./csrf";

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    }
}

const removeUser = (user) => {
    return {
        type: REMOVE_USER,
    }
}

export const loginUser = (user) => async (dispatch) => {
    const { credential, password } = user;
    const loginBody = JSON.stringify({ credential, password});
    const response = await ezFetch("/api/session", "POST", loginBody);
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
}

export const signupUser = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const signupUserBody = JSON.stringify({username, email, password});
  const response = await ezFetch('/api/users', "POST", signupUserBody);
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const sessionRestoreUser = () => async (dispatch) => {
  const response = await ezFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const logoutUser = () => async (dispatch) => {
  const response = await ezFetch("/api/session", "DELETE");
  // remove the user
  dispatch(removeUser());
  return response;
};

const loggedOutUserState = { user : null };

const sessionReducer = (state = loggedOutUserState, action) => {
    let newState;
    switch(action.type) {
        case SET_USER:
            return {...state, user: action.payload };
        case REMOVE_USER:
            return {...state, user: null};
        default:
            return state;
    }
}

export default sessionReducer;
