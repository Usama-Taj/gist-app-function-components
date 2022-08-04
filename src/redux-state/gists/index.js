import {
  getGistsByUser,
  getPublicGists,
  getPublicStarredGists,
} from "api/gist.service";

import {
  getGistList,
  getProfileGists,
  setPageNumber,
  startGistLoading,
  startProfileGistLoading,
  stopGistLoading,
  stopProfileGistLoading,
} from "./actions";

export const fetchProfileGists = (username) => (dispatch) => {
  dispatch(startProfileGistLoading());
  getGistsByUser(username).then((response) => {
    dispatch(getProfileGists(response));
    dispatch(stopProfileGistLoading());
  });
};

export const fetchGistList =
  (page, profile = "", starred = false) =>
  (dispatch) => {
    if (profile) {
      dispatch(startGistLoading());
      getGistsByUser(profile).then((res) => {
        dispatch(getGistList(res));
        dispatch(stopGistLoading());
      });
    } else if (starred) {
      dispatch(setPageNumber(page));
      dispatch(startGistLoading());
      getPublicStarredGists(page).then((res) => {
        dispatch(getGistList(res));
        dispatch(stopGistLoading());
      });
    } else {
      dispatch(setPageNumber(page));
      dispatch(startGistLoading());
      getPublicGists(page).then((res) => {
        dispatch(getGistList(res));
        dispatch(stopGistLoading());
      });
    }
  };
