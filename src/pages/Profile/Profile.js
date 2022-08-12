import React, { useState, useEffect, useContext, useCallback } from "react";
import ProfileGists from "components/ProfileGists/ProfileGists";
import ProfileContent from "components/ProfileContent/ProfileContent";
import { ProfileView } from "./Profile.styles";
import { withAuth } from "hoc/withAuth";
import { getGistsByUser } from "api/gist.service";
import { withRouter } from "hoc/withRouter";
import withErrorBoundaries from "hoc/withErrorBoundaries";
import Spinner from "components/common/spinners/Spinner";
import Message from "components/Message/Message";
import { GistContext } from "context/gists";
import {
  getProfileGists,
  startProfileGistLoading,
  stopProfileGistLoading,
} from "context/gists/actions";

const Profile = ({ router: { params } }) => {
  // Data Variables
  // States

  // Context API
  const [state, dispatch] = useContext(GistContext);
  const { profile_gists, profile_gists_loading } = state;

  // useEffects
  useEffect(() => {
    getProfile();
  }, [params?.username]);

  // Functions
  const getProfile = useCallback(async () => {
    dispatch(startProfileGistLoading());
    const response = await getGistsByUser(params?.username);
    dispatch(getProfileGists(response));
    dispatch(stopProfileGistLoading());
  }, [params?.username]);
  // Rendering
  return profile_gists_loading ? (
    <Spinner size={15} />
  ) : profile_gists.length !== 0 ? (
    <ProfileView>
      <ProfileContent profile={profile_gists[0]?.owner} />
      <ProfileGists gists={profile_gists} />
    </ProfileView>
  ) : (
    <Message title="Oops!" message="Gists Not Found" />
  );
};

export default withRouter(withAuth(Profile));
