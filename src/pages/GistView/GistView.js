import React, { useState, useEffect, useMemo } from "react";
import GistContent from "components/GistContent/GistContent";

import { Gist } from "./GistView.styles";
import { withRouter } from "hoc/withRouter";
import { getGist } from "api/gist.service";
import withErrorBoundaries from "hoc/withErrorBoundaries";
import GistHeader from "components/common/GistHeader/GistHeader";

const GistView = ({ router: { params } }) => {
  // Data Variables
  // States
  const [gist, setGist] = useState(null);
  // useEffects
  useEffect(() => {
    getGist(params.gist_id).then((res) => setGist(res));
  }, []);
  // Functions
  const renderGistFilesContents = useMemo(() => {
    if (gist?.files) {
      const { files } = gist;
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
  }, [gist]);
  // Rendering
  return (
    <Gist>
      {gist && (
        <>
          <GistHeader
            id={gist.id}
            avatar={gist.owner?.avatar_url}
            username={gist.owner?.login}
            filename={Object.keys(gist.files)[0]}
            created_at={gist.created_at}
            description={gist.description}
          />
          {renderGistFilesContents}
        </>
      )}
    </Gist>
  );
};

export default withRouter(withErrorBoundaries(GistView));
