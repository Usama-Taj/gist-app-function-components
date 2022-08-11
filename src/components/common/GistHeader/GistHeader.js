import { Avatar, Col, Row } from "antd";
import {
  checkGistStar,
  deleteAGist,
  forkOneGist,
  unStarOneGist,
} from "api/gist.service";
import { withRouter } from "hoc/withRouter";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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

  // Redux Hooks
  const dispatch = useDispatch();
  const { logged_in } = useSelector((state) => state.gists);
  // Functions
  const deleteGist = () => {
    deleteAGist(id).then((res) => {
      if (res) {
        dispatch(fetchProfileGists(username));
      }
    });
  };
  // Fork Function
  const handleFork = () => {
    if (!forked) {
      forkOneGist(id).then((res) => {
        setForked(res);
      });
    }
  };

  const starGist = () => {
    if (starred) {
      unStarOneGist(id).then((res) => setStarred(!res));
    } else {
      starGist(id).then((res) => setStarred(res));
    }
    setState(!starred);
  };
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
