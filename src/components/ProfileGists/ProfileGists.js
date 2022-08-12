import React, { useMemo } from "react";
import ProfileGistItem from "components/ProfileGistItem/ProfileGistItem";
import { ProfileGistList } from "./ProfileGists.styles";

const ProfileGists = ({ gists }) => {
  const renderGists = useMemo(() => {
    return gists.map((gist, i) => <ProfileGistItem key={i} gist={gist} />);
  }, [gists]);

  return <ProfileGistList>{renderGists}</ProfileGistList>;
};

export default ProfileGists;
