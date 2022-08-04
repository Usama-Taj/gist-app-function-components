import React, { Component } from "react";
import ProfileGists from "components/ProfileGists/ProfileGists";
import ProfileContent from "components/ProfileContent/ProfileContent";
import { ProfileView } from "./Profile.styles";
import { withAuth } from "hoc/withAuth";
import { getGistsByUser } from "api/gist.service";
import { withRouter } from "hoc/withRouter";
import withErrorBoundaries from "hoc/withErrorBoundaries";
import { connect } from "react-redux";
import { fetchProfileGists } from "redux-state/gists";
import Spinner from "components/common/spinners/Spinner";
import Message from "components/Message/Message";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { gists: [] };
  }

  componentDidMount() {
    const {
      router: {
        params: { username },
      },
      getProfileGists,
    } = this.props;
    getProfileGists(username);
  }

  render() {
    const { profile_gists, profile_gists_loading } = this.props;
    return profile_gists_loading ? (
      <Spinner size={15} />
    ) : profile_gists.length !== 0 ? (
      <ProfileView>
        <>
          <ProfileContent profile={profile_gists[0]?.owner} />
          <ProfileGists gists={profile_gists} />
        </>
      </ProfileView>
    ) : (
      <Message title="Oops!" message="Gists Not Found" />
    );
  }
}

const mapStateToProps = (state) => {
  const { profile_gists, profile_gists_loading } = state.gists;
  return { profile_gists, profile_gists_loading };
};
const mapDispatchToProps = {
  getProfileGists: fetchProfileGists,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withAuth(Profile)));
