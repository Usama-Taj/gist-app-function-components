import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Card,
  CardContent,
  CardInfo,
  CardFooter,
  History,
  UserImage,
} from "./GridItem.styles";
import GridFileView from "components/GridFileView/GridFileView";
import { withRouter } from "hoc/withRouter";
import { setSelectedGist } from "redux-state/gists/actions";
import { getTimeCreated, getValidData } from "utilities/utilityFunctions";
import { getGist, getGistFile } from "api/gist.service";
import Spinner from "components/common/spinners/Spinner";
import CircleSpinner from "components/common/spinners/CircleSpinner";

const GridItem = ({ gist, router }) => {
  // Data Variables
  const {
    id,
    owner: { login: username, avatar_url: avatar },
    files,
    created_at,
    description,
  } = gist;

  // States
  const [fileContent, setFileContent] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffects
  useEffect(() => {
    const { id } = gist;
    getGist(id).then((response) => {
      const { files } = response;
      setFileContent(files[Object.keys(files)[0]].content.split("\n"));
      setLoading(false);
    });
  }, []);

  // Rendering
  return (
    <Card
      onClick={(e) => {
        router.navigate(`/gist-view/${id}`);
      }}
    >
      <CardContent>
        <GridFileView fileContent={fileContent} />
      </CardContent>

      <div>
        <hr />
      </div>
      <CardFooter>
        <div>
          <UserImage src={avatar} alt="user" />
        </div>
        <div>
          <div>
            <CardInfo>
              <span>{username}</span> /
              <span>
                <b>{getValidData(Object.keys(files)[0])}</b>
              </span>
            </CardInfo>
            <History>Created {getTimeCreated(created_at)} Ago</History>
            <History> {getValidData(description)}</History>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default withRouter(GridItem);
