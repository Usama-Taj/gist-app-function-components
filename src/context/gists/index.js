import React, { createContext, useReducer } from "react";
import reducer from "./reducer";
const initial_state = {
  gists_list: [],
  profile_gists: [],
  selected_gist: {},
  page_number: 1,
  gist_loading: true,
  profile_gists_loading: true,
  logged_in: JSON.parse(localStorage.getItem("gist_app"))?.logged_in || false,
};

export const GistContext = createContext([initial_state, null]);

export const GistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial_state);
  return (
    <GistContext.Provider value={[state, dispatch]}>
      {children}
    </GistContext.Provider>
  );
};
