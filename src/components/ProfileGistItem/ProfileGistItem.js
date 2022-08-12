import React, { useState, useEffect, useMemo } from "react";
import { GistItem, Table } from "./ProfileGistItem.styles";
import { checkGistStar, getGist } from "api/gist.service";
import { withRouter } from "hoc/withRouter";
import { Link } from "react-router-dom";
import CodeCard from "components/common/CodeCard/CodeCard";
import GistHeader from "components/common/GistHeader/GistHeader";

const ProfileGistItem = ({ gist }) => {
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
  const [starred, setStarred] = useState(false);

  //useEffects
  useEffect(() => {
    checkGistStar(id).then((response) => setStarred(response));
    getGist(id).then((response) => {
      const { files } = response;
      setFileContent(files[Object.keys(files)[0]].content.split("\n"));
    });
  }, []);

  // Functions
  // Render File Content
  const renderFileContent = useMemo(() => {
    return fileContent.map((line, i) => (
      <tr key={i}>
        <td>{i + 1}</td>
        <td>{line.length > 50 ? `${line.substring(0, 50)}...` : line}</td>
      </tr>
    ));
  }, [fileContent]);

  // Render Functions
  return (
    <GistItem>
      <GistHeader
        id={id}
        username={username}
        created_at={created_at}
        filename={Object.keys(files)[0]}
        description={description}
        avatar={avatar}
      />
      <div>
        <Link to={`/gist-view/${id}`}>
          <CodeCard hoverable>
            <Table>
              <tbody>{renderFileContent}</tbody>
            </Table>
          </CodeCard>
        </Link>
      </div>
    </GistItem>
  );
};

export default withRouter(ProfileGistItem);
