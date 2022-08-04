import {
  GET_GIST_LIST,
  GET_PROFILE_GISTS,
  SELECT_GIST,
  SET_LOGIN_STATE,
  SET_PAGE_NUMBER,
  START_GIST_LOADING,
  START_PROFILE_GISTS_LOADING,
  STOP_GIST_LOADING,
  STOP_PROFILE_GISTS_LOADING,
} from "redux-state/actionTypes";

export const getGistList = (payload) => ({ type: GET_GIST_LIST, payload });

export const getProfileGists = (payload) => ({
  type: GET_PROFILE_GISTS,
  payload,
});

export const setSelectedGist = (payload) => ({ type: SELECT_GIST, payload });

export const setPageNumber = (payload) => ({ type: SET_PAGE_NUMBER, payload });

export const startProfileGistLoading = () => ({
  type: START_PROFILE_GISTS_LOADING,
});

export const stopProfileGistLoading = () => ({
  type: STOP_PROFILE_GISTS_LOADING,
});

export const startGistLoading = () => ({ type: START_GIST_LOADING });

export const stopGistLoading = () => ({ type: STOP_GIST_LOADING });

export const setLoggedInState = (payload) => ({
  type: SET_LOGIN_STATE,
  payload,
});
