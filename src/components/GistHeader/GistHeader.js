import React, { Component } from "react";
import avatar_one from "assets/images/img_avatar.png";
import {
  Header,
  UserImage,
  GistInfo,
  GistHistory,
  GistHeaderControls,
} from "./GistHeader.styles";
import { connect } from "react-redux";
import {
  checkGistStar,
  deleteAGist,
  forkOneGist,
  starOneGist,
  unStarOneGist,
} from "api/gist.service";
import { withRouter } from "hoc/withRouter";

class GistHeader extends Component {
  constructor(props) {
    super(props);
    this.LOGGED_IN_USER = process.env.USERNAME;
    this.state = { starred: false, forked: false };
  }
  componentDidMount() {
    const { gist_id } = this.props;
    checkGistStar(gist_id).then((response) =>
      this.setState({ starred: response })
    );
  }
  starGist = () => {
    const { gist_id } = this.props;
    const { starred } = this.state;
    if (starred) {
      unStarOneGist(gist_id).then((res) => this.setState({ starred: false }));
    } else {
      starOneGist(gist_id).then((res) => this.setState({ starred: true }));
    }
  };
  forkGist = () => {
    if (!this.state.forked) {
      const { gist_id } = this.props;
      forkOneGist(gist_id).then((res) => this.setState({ forked: res }));
    }
  };
  deleteGist = () => {
    const { gist_id, router } = this.props;
    if (gist_id) {
      deleteAGist(gist_id).then((res) => {
        if (res) {
          router.navigate("/");
        }
      });
    }
  };
  editGist = () => {
    const { gist_id, router } = this.props;
    if (gist_id) {
      router.navigate(`/update/${gist_id}`);
    }
  };
  render() {
    const { avatar, created, username, filename, logged_in, forks } =
      this.props;
    const { starred, forked } = this.state;
    return (
      <Header>
        <UserImage>
          <img src={avatar} alt="user" />
          <div>
            <GistInfo>
              <span>{username}</span>&nbsp;/&nbsp;
              <span>
                <b>{filename}</b>
              </span>
            </GistInfo>
            <GistHistory>Created {created} Ago</GistHistory>
          </div>
          {logged_in && (
            <GistHeaderControls>
              {username === this.LOGGED_IN_USER && (
                <>
                  <div id="edit" onClick={this.editGist}>
                    <i className="fa-regular fa-pen-to-square"></i>
                    <label>Edit</label>
                  </div>
                  <div id="delete" onClick={this.deleteGist}>
                    <i className="fa-regular fa-trash-can"></i>
                    <label>Delete</label>
                  </div>
                </>
              )}
              <div id="star" onClick={this.starGist}>
                <i
                  className={`fa-${starred ? "solid" : "regular"} fa-star`}
                ></i>
                <label>Star</label>
              </div>
              <div id="star-info">
                <input type="text" name="" id="" value="0" readOnly />
              </div>
              {!forked ? (
                <div id="fork" onClick={this.forkGist}>
                  <i className="fa-solid fa-code-branch"></i>
                  <label>Fork</label>
                </div>
              ) : (
                <div id="fork">
                  <i className="fa-solid fa-code-fork"></i> <label>Fork</label>
                </div>
              )}

              <div id="fork-info">
                <input type="text" name="" id="" value={forks} readOnly />
              </div>
            </GistHeaderControls>
          )}
        </UserImage>
      </Header>
    );
  }
}
const mapStateToProps = (state) => {
  const {
    gists: { logged_in },
  } = state;
  return { logged_in };
};
export default connect(mapStateToProps, null)(withRouter(GistHeader));
