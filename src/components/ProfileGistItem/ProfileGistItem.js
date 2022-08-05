import React, { useState, useEffect } from "react";
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

const ProfileGistItem = ({ gist, router, getProfileGists }) => {
  // Data Variables
  const {
    id,
    owner: { login: username, avatar_url: avatar },
    files,
    created_at,
    description,
  } = gist;

  const logged_in = JSON.parse(localStorage.getItem("gist_app")).logged_in;

  // States
  const [fileContent, setFileContent] = useState([]);
  const [starred, setStarred] = useState(false);
  const [forked, setForked] = useState(false);

  //useEffects
  useEffect(() => {
    const { files, id } = gist;
    checkGistStar(id).then((response) => setStarred(response));
    getGist(id).then((response) => {
      const { files } = response;
      setFileContent(files[Object.keys(files)[0]].content.split("\n"));
    });
  }, []);

  // Functions

  const renderFileContent = (fileContent) => {
    return fileContent.map((line, i) => (
      <tr key={i}>
        <td>{i + 1}</td>
        <td>{line.length > 50 ? `${line.substring(0, 50)}...` : line}</td>
      </tr>
    ));
  };

  const deleteGist = () => {
    const {
      id,
      owner: { login: username, avatar_url: avatar },
    } = gist;
    if (id) {
      deleteAGist(id).then((res) => {
        if (res) {
          getProfileGists(username);
        }
      });
    }
  };
  const editGist = () => {
    const { id } = gist;
    if (id) {
      router.navigate(`/update/${id}`);
    }
  };
  const starGist = () => {
    const { id } = gist;
    if (starred) {
      unStarOneGist(id).then((res) => setStarred(false));
    } else {
      starOneGist(id).then((res) => setStarred(true));
    }
    setState(!starred);
  };
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
            <GistHistory>Created {getTimeCreated(created_at)} Ago</GistHistory>
          </div>
          {logged_in && (
            <GistControls>
              {username === process.env.USERNAME && (
                <>
                  <div onClick={deleteGist}>
                    <i className="fa-regular fa-trash-can"></i>
                    <GistControlLabel>Delete</GistControlLabel>
                  </div>
                  <div onClick={editGist}>
                    <i className="fa-regular fa-pen-to-square"></i>
                    <GistControlLabel>Edit</GistControlLabel>
                  </div>
                </>
              )}
              <div>
                <i
                  onClick={starGist}
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
                {fileContent.length > 0 && renderFileContent(fileContent)}
              </tbody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </GistItem>
  );
};

const mapDispatchToProps = {
  getProfileGists: fetchProfileGists,
};

export default connect(null, mapDispatchToProps)(withRouter(ProfileGistItem));
