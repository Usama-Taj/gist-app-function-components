import React, { Component } from "react";
import avatar_one from "assets/images/img_avatar.png";
import {
  GistItem,
  GistHeader,
  GistPorfileImageArea,
  GistProfileImage,
  GistInfo,
  GistHistory,
  GistControls,
  GistControlLabel,
  Card,
  CardContent,
  Table,
} from "./ProfileGistItem.styles";
import { getTimeCreated } from "utilities/utilityFunctions";
import {
  checkGistStar,
  deleteAGist,
  getGist,
  getGistFile,
  starOneGist,
  unStarOneGist,
} from "api/gist.service";
import { withRouter } from "hoc/withRouter";
import { fetchProfileGists } from "redux-state/gists";
import { connect } from "react-redux";
class ProfileGistItem extends Component {
  constructor(props) {
    super(props);
    this.state = { fileContent: [], starred: false, forked: false };
  }
  componentDidMount() {
    const { files, id } = this.props.gist;
    checkGistStar(id).then((response) => this.setState({ starred: response }));
    getGist(id).then((response) => {
      const { files } = response;

      this.setState({
        fileContent: files[Object.keys(files)[0]].content.split("\n"),
      });
    });
  }
  deleteGist = () => {
    const {
      gist: {
        id,
        owner: { login: username, avatar_url: avatar },
      },
      router,
      getProfileGists,
    } = this.props;
    if (id) {
      deleteAGist(id).then((res) => {
        if (res) {
          console.log("Deleted");
          getProfileGists(username);
        }
      });
    }
  };
  editGist = () => {
    const {
      gist: { id },
      router,
    } = this.props;
    if (id) {
      router.navigate(`/update/${id}`);
    }
  };
  starGist = () => {
    const { id } = this.props.gist;
    const { starred } = this.state;
    if (starred) {
      unStarOneGist(id).then((res) => this.setState({ starred: false }));
    } else {
      starOneGist(id).then((res) => this.setState({ starred: true }));
    }
    this.setState({ starred: !this.state.starred });
  };
  renderFileContent = (fileContent) => {
    return fileContent.map((line, i) => (
      <tr key={i}>
        <td>{i + 1}</td>
        <td>{line.length > 50 ? `${line.substring(0, 50)}...` : line}</td>
      </tr>
    ));
  };
  render() {
    const {
      id,
      owner: { login: username, avatar_url: avatar },
      files,
      created_at,
      description,
    } = this.props.gist;
    const logged_in = JSON.parse(localStorage.getItem("gist_app")).logged_in;
    const { fileContent, starred, forked } = this.state;
    return (
      <GistItem>
        <GistHeader>
          <GistPorfileImageArea>
            <GistProfileImage src={avatar} alt="user" />
            <div>
              <GistInfo>
                <span>{username}</span>&nbsp;/&nbsp;
                <span>
                  <b>{Object.keys(files)[0]}</b>
                </span>
              </GistInfo>
              <GistHistory>
                Created {getTimeCreated(created_at)} Ago
              </GistHistory>
            </div>
            {logged_in && (
              <GistControls>
                {username === process.env.USERNAME && (
                  <>
                    <div onClick={this.deleteGist}>
                      <i className="fa-regular fa-trash-can"></i>
                      <GistControlLabel>Delete</GistControlLabel>
                    </div>
                    <div onClick={this.editGist}>
                      <i className="fa-regular fa-pen-to-square"></i>
                      <GistControlLabel>Edit</GistControlLabel>
                    </div>
                  </>
                )}
                <div>
                  <i
                    onClick={this.starGist}
                    className={`fa-${starred ? "solid" : "regular"} fa-star`}
                  ></i>
                  <GistControlLabel>Star</GistControlLabel>
                </div>

                <div>
                  <i className="fa-solid fa-code-branch"></i>
                  <GistControlLabel>Fork</GistControlLabel>
                </div>
              </GistControls>
            )}
          </GistPorfileImageArea>
        </GistHeader>
        <div>
          <Card>
            <CardContent>
              <Table>
                <tbody>
                  {fileContent.length > 0 &&
                    this.renderFileContent(fileContent)}
                </tbody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </GistItem>
    );
  }
}

const mapDispatchToProps = {
  getProfileGists: fetchProfileGists,
};

export default connect(null, mapDispatchToProps)(withRouter(ProfileGistItem));
