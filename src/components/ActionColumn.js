import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  checkGistStar,
  forkOneGist,
  starOneGist,
  unStarOneGist,
} from "api/gist.service";
import { getGistList } from "redux-state/gists/actions";
import { ColumnControls } from "./ActionColumn.styles";
import { GET_GIST_LIST } from "redux-state/actionTypes";
import { fetchGistList } from "redux-state/gists";
import { withRouter } from "hoc/withRouter";

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
  // Other Hooks
  const dispatch = useDispatch();
  // Functions
  // Star Function
  const handleStar = () => {
    if (starred) {
      // Return Response True IF gist is unstarred
      unStarOneGist(id).then((res) => setStarred(!res));
      if (isStarredRoute) dispatch(fetchGistList(1, "", true));
    } else {
      // Return Response True IF gist is starred
      starOneGist(id).then((res) => setStarred(res));
    }
  };
  // Fork Function
  const handleFork = () => {
    if (!forked) {
      forkOneGist(id).then((res) => {
        setForked(res);
      });
    }
  };
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
