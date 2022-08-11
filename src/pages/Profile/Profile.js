import React, { useState, useEffect } from "react";
import ProfileGists from "components/ProfileGists/ProfileGists";
import ProfileContent from "components/ProfileContent/ProfileContent";
import { ProfileView } from "./Profile.styles";
import { withAuth } from "hoc/withAuth";
import { getGistsByUser } from "api/gist.service";
import { withRouter } from "hoc/withRouter";
import withErrorBoundaries from "hoc/withErrorBoundaries";
import { connect, useDispatch, useSelector } from "react-redux";
import { fetchProfileGists } from "redux-state/gists";
import Spinner from "components/common/spinners/Spinner";
import Message from "components/Message/Message";

const Profile = ({ router: { params } }) => {
  // Data Variables
  // States

  // useEffects
  useEffect(() => {
    dispatch(fetchProfileGists(params?.username));
  }, [params?.username]);

  // Redux Hooks
  const dispatch = useDispatch();
  const { profile_gists, profile_gists_loading } = useSelector(
    (state) => state.gists
  );
  // Functions

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
