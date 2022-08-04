import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AddGist from "pages/AddGist/AddGist";
import GistList from "pages/GistList/GistList";
import GistView from "pages/GistView/GistView";
import Profile from "pages/Profile/Profile";
import GistErrorBoundaries from "error-boundaries/GistErrorBoundaries";
import Login from "components/Login/Login";
import UpdateGist from "pages/UpdateGist/UpdateGist";

class AppRoutes extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<GistList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/gist-list" element={<GistList />} />

        <Route path="gist-view">
          <Route path=":gist_id" element={<GistView />} />
        </Route>
        <Route path="update">
          <Route path=":gist_id" element={<UpdateGist />} />
        </Route>
        <Route path="/starred" element={<GistList />} />
        <Route path="/add-gist" element={<AddGist />} />
        <Route path="/profile">
          <Route path=":username" element={<Profile />}></Route>
        </Route>
        <Route path="/search">
          <Route path=":username" element={<GistList />}></Route>
        </Route>
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    );
  }
}

export default AppRoutes;
