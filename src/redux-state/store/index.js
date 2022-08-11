import { applyMiddleware, configureStore, compose } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import gists from "redux-state/gists/reducer";
const enhancer =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export default configureStore({
  reducer: { gists },
  middleware: [thunk],
  // Disable Devtools for Production
  devTools: process.env.NODE_ENV !== "production",
});
