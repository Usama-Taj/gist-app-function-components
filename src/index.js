import ReactDOM from "react-dom/client";
import React from "react";

import App from "./App";
import Main from "components/common/main/Main";
import { GistProvider } from "context/gists";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GistProvider>
    <App />
  </GistProvider>
);
