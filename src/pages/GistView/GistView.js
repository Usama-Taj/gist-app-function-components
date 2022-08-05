import React, { useState, useEffect } from "react";
import GistContent from "components/GistContent/GistContent";
import GistHeader from "components/GistHeader/GistHeader";
import { Gist } from "./GistView.styles";
import { getTimeCreated } from "utilities/utilityFunctions";
import { withRouter } from "hoc/withRouter";
import { getGist } from "api/gist.service";
import withErrorBoundaries from "hoc/withErrorBoundaries";

const GistView = ({ router: { params } }) => {
  // Data Variables
  // States
  const [gist, setGist] = useState(null);
  // useEffects
  useEffect(() => {
    getGist(params.gist_id).then((res) => setGist(res));
  }, []);
  // Functions
  const renderGistFilesContents = (files) => {
    if (files) {
      return Object.keys(files).map((file, i) => {
        return (
          <GistContent
            key={i}
            fileContent={files[file].content.split("\n")}
            filename={Object.keys(files)[i]}
          />
        );
      });
    }
  };
  // Rendering
  return (
    <Gist>
      {gist && (
        <>
          <GistHeader
            gist_id={gist.id}
            avatar={gist.owner?.avatar_url}
            username={gist.owner?.login}
            filename={Object.keys(gist.files)[0]}
            created={getTimeCreated(gist.created_at)}
            forks={gist.forks?.length || 0}
          />
          {renderGistFilesContents(gist.files)}
        </>
      )}
    </Gist>
  );
};

export default withRouter(withErrorBoundaries(GistView));
