import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  checkGistStar,
  forkOneGist,
  getPublicStarredGists,
  starOneGist,
  unStarOneGist,
} from "api/gist.service";
import { ColumnControls } from "./ActionColumn.styles";
import { withRouter } from "hoc/withRouter";
import {
  startGistLoading,
  getGistList,
  setPageNumber,
  stopGistLoading,
} from "context/gists/actions";
import { GistContext } from "context/gists";

const ActionColumn = ({ id, router }) => {
  // Data Variables
  const isStarredRoute = router.location.pathname.split("/")[1] === "starred";
  // States
  const [starred, setStarred] = useState(false);
  const [forked, setForked] = useState(false);

  // useEffects
  useEffect(() => {
    checkGistStar(id).then((response) => setStarred(response));
  }, []);
  // Context
  const [state, dispatch] = useContext(GistContext);
  // Functions
  // Star Function
  const handleStar = useCallback(
    (e) => {
      e.stopPropagation();
      if (starred) {
        // Return Response True IF gist is unstarred
        unStarOneGist(id).then((res) => setStarred(!res));
        if (isStarredRoute) {
          dispatch(setPageNumber(1));
          dispatch(startGistLoading());
          getPublicStarredGists(page).then((res) => {
            dispatch(getGistList(res));
            dispatch(stopGistLoading());
          });
        }
      } else {
        // Return Response True If gist is starred
        starOneGist(id).then((res) => setStarred(res));
      }
    },
    [starred, isStarredRoute]
  );

  // Fork Function
  const handleFork = useCallback(
    (e) => {
      e.stopPropagation();
      if (!forked) {
        forkOneGist(id).then((res) => setForked(res));
      }
    },
    [forked]
  );
  // useEffects

  // Rendering
  return (
    <ColumnControls>
      <div className="d-flex justify-content-around">
        <div>
          <i
            onClick={handleStar}
            className={`fa-${starred ? "solid" : "regular"} fa-star`}
          ></i>
        </div>
        {!forked ? (
          <div>
            <i onClick={handleFork} className="fa-solid fa-code-branch"></i>
          </div>
        ) : (
          <div>
            <i className="fa-solid fa-code-fork"></i>
          </div>
        )}
      </div>
    </ColumnControls>
  );
};

export default withRouter(ActionColumn);
