import React, { Component } from "react";
import ProfileGistItem from "components/ProfileGistItem/ProfileGistItem";
import { ProfileGistList } from "./ProfileGists.styles";

const ProfileGists = ({ gists }) => {
  const renderGists = (gists) => {
    return gists.map((gist, i) => <ProfileGistItem key={i} gist={gist} />);
  };

  return <ProfileGistList>{renderGists(gists)}</ProfileGistList>;
};

export default ProfileGists;
