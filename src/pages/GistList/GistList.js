import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
import GistListHeader from "components/GistListHeader/GistListHeader";
import GistListFooter from "components/GistListFooter/GistListFooter";
import TableView from "components/TableView/TableView";
import GridView from "components/GridView/GridView";
import { StyledGistList } from "./GistList.styles";
import {
  getGist,
  getGistsByUser,
  getPublicGists,
  getPublicStarredGists,
} from "api/gist.service";
import { Route } from "react-router-dom";
import { withRouter } from "hoc/withRouter";
import { withAuth } from "hoc/withAuth";
import Message from "components/Message/Message";
import Spinner from "components/common/spinners/Spinner";
import { GistContext } from "context/gists";
import {
  getGistList,
  startGistLoading,
  stopGistLoading,
} from "context/gists/actions";
import { setPageNumber } from "context/gists/actions";

const GistList = ({ router: { params, location } }) => {
  // Data Variables
  const STARTING_PAGE = 1;
  const starred = location.pathname.split("/")[1] === "starred";

  // States
  const [grid_view, setGrid_view] = useState(false);
  const [gists, setGists] = useState([]);

  // Context Api
  const [state, dispatch] = useContext(GistContext);

  useEffect(() => {
    fetchGists();
  }, [starred, params.username]);

  // Redux Hooks
  const { gist_loading, gists_list } = state;
  // Functions
  const fetchGists = useCallback(async () => {
    let response;
    if (params.username) {
      dispatch(startGistLoading());
      response = await getGistsByUser(params.username);
      dispatch(getGistList(response));
      dispatch(stopGistLoading());
    } else if (starred) {
      dispatch(setPageNumber(STARTING_PAGE));
      dispatch(startGistLoading());
      response = await getPublicStarredGists(STARTING_PAGE);
      dispatch(getGistList(response));
      dispatch(stopGistLoading());
    } else {
      dispatch(setPageNumber(STARTING_PAGE));
      dispatch(startGistLoading());
      response = await getPublicGists(STARTING_PAGE);
      dispatch(getGistList(response));
      dispatch(stopGistLoading());
    }
  }, [params?.username, starred]);

  const setGridViewType = useCallback(
    (grid_view) => {
      setGrid_view(grid_view);
    },
    [grid_view]
  );
  const renderGists = useMemo(() => {
    if (gists_list.length > 0) {
      if (grid_view) {
        return <GridView gists={gists_list} />;
      } else {
        return <TableView gists={gists_list} />;
      }
    } else return <Message title="Sorry!" message="Gists not Available" />;
  }, [gists_list, grid_view]);

  return (
    <>
      <StyledGistList>
        <GistListHeader
          setGridViewType={setGridViewType}
          grid_view={grid_view}
        />
        {gist_loading ? <Spinner size={15} /> : renderGists}
        {!params?.username && gists_list.length === 10 && <GistListFooter />}
        {gists_list.length > 10 && <GistListFooter />}
      </StyledGistList>
    </>
  );
};

export default withRouter(withAuth(GistList));
