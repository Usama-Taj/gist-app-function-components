import { Avatar, Col, Row } from "antd";
import {
  checkGistStar,
  deleteAGist,
  forkOneGist,
  getGistsByUser,
  starOneGist,
  unStarOneGist,
} from "api/gist.service";
import { getProfileGists } from "context/gists/actions";
import { GistContext } from "context/gists";
import { withRouter } from "hoc/withRouter";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  startProfileGistLoading,
  stopProfileGistLoading,
} from "context/gists/actions";
import { SpacedSpan } from "shared-styles/StyledComponents.styles";
import { getTimeCreated, getValidData } from "utilities/utilityFunctions";
import {
  GistControlLabel,
  GistControls,
  GistHistory,
} from "./GistHeader.styles";

const GistHeader = (props) => {
  const {
    username,
    created_at,
    avatar,
    filename,
    description,
    id,
    router: {
      location: { pathname },
    },
  } = props;
  const gist_view = pathname.split("/")[1] === "gist-view";
  const profile_view = pathname.split("/")[1] === "profile";

  // States
  const [forked, setForked] = useState(false);
  const [starred, setStarred] = useState(false);

  // useEffects
  useEffect(() => {
    checkGistStar(id).then((res) => setStarred(res));
  }, []);

  // Context
  const [state, dispatch] = useContext(GistContext);

  const { logged_in } = state;

  // Functions
  const deleteGist = useCallback(async () => {
    const response = await deleteAGist(id);
    if (response) {
      dispatch(startProfileGistLoading());
      const gists_response = await getGistsByUser(username);
      dispatch(getProfileGists(gists_response));
      dispatch(stopProfileGistLoading());
    }
  }, [id, username]);

  // Fork Function
  const handleFork = useCallback(async () => {
    if (!forked) {
      const response = await forkOneGist(id);
      setForked(response);
    }
  }, [forked]);

  const starGist = useCallback(async () => {
    if (starred) {
      const unstar_response = await unStarOneGist(id);
      setStarred(!unstar_response);
    } else {
      const star_response = await starOneGist(id);
      setStarred(star_response);
    }
    setStarred(!starred);
  }, [starred]);
  // Rendering
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      <Col span={2}>
        <Avatar src={avatar} alt="user" size={50} />
      </Col>
      <Col span={10}>
        <Row gutter={5}>
          <Link to={`/profile/${username}`}>{username}</Link>
          <SpacedSpan>/</SpacedSpan>
          <Link to={`/gist-view/${id}`}>{filename}</Link>
        </Row>
        <Row>
          <GistHistory>{`Created ${getTimeCreated(
            created_at
          )} Ago`}</GistHistory>
        </Row>
        <Row>
          <GistHistory>{getValidData(description)}</GistHistory>
        </Row>
      </Col>
      <Col span={12}>
        <GistControls>
          {username === process.env.USERNAME && logged_in && (
            <>
              <div onClick={deleteGist}>
                <i className="fa-regular fa-trash-can"></i>
                <GistControlLabel>Delete</GistControlLabel>
              </div>
              <Link to={`/update/${id}`}>
                <i className="fa-regular fa-pen-to-square"></i>
                <GistControlLabel>Edit</GistControlLabel>
              </Link>
            </>
          )}
          <div onClick={starGist}>
            <i className={`fa-${starred ? "solid" : "regular"} fa-star`}></i>
            <GistControlLabel>Star</GistControlLabel>
          </div>

          <div onClick={handleFork}>
            {!forked ? (
              <i className="fa-solid fa-code-branch"></i>
            ) : (
              <i className="fa-solid fa-code-fork"></i>
            )}
            <GistControlLabel>Fork</GistControlLabel>
          </div>
        </GistControls>
      </Col>
    </Row>
  );
};

export default withRouter(GistHeader);
