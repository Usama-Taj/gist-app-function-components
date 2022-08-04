import React, { Component } from "react";
import ProfileGistItem from "components/ProfileGistItem/ProfileGistItem";
import { ProfileGistList } from "./ProfileGists.styles";

class ProfileGists extends Component {
  renderGists = (gists) => {
    return gists.map((gist, i) => <ProfileGistItem key={i} gist={gist} />);
  };

  render() {
    const { gists } = this.props;
    return <ProfileGistList>{this.renderGists(gists)}</ProfileGistList>;
  }
}

export default ProfileGists;
