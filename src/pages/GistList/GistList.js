import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import GistListHeader from "components/GistListHeader/GistListHeader";
import GistListFooter from "components/GistListFooter/GistListFooter";
import TableView from "components/TableView/TableView";
import GridView from "components/GridView/GridView";
import { StyledGistList } from "./GistList.styles";
import { getPublicGists } from "api/gist.service";
import { GET_GIST_LIST } from "redux-state/actionTypes";
import { fetchGistList } from "redux-state/gists";
import { Route } from "react-router-dom";
import { withRouter } from "hoc/withRouter";
import { withAuth } from "hoc/withAuth";
import Message from "components/Message/Message";
import Spinner from "components/common/spinners/Spinner";

const GistList = ({
  router: { params, location },
  getList,
  gists_list,
  gist_loading,
}) => {
  // Data Variables
  const STARTING_PAGE = 1;

  // States
  const [grid_view, setGrid_view] = useState(false);
  const [gists, setGists] = useState([]);
  const [profile_view, setProfile_view] = useState(!!params?.username);
  const [starred, setStarred] = useState(
    location.pathname.split("/"[1]) === " starred"
  );

  // useEffects
  useEffect(() => {
    if (profile_view) {
      getList(STARTING_PAGE, params.username);
    }
  }, [params.username, profile_view]);

  useEffect(() => {
    if (profile_view) {
      getList(STARTING_PAGE, params.username);
    } else if (starred) {
      getList(STARTING_PAGE, "", starred);
    } else {
      getList(STARTING_PAGE);
    }
  }, []);
  // Functions
  const setGridViewType = (grid_view) => {
    setGrid_view(grid_view);
  };
  const renderGists = (gists_list, grid_view) => {
    if (gists_list.length > 0) {
      if (grid_view) {
        return <GridView gists={gists_list} />;
      } else {
        return <TableView gists={gists_list} />;
      }
    } else return <Message title="Sorry!" message="Gists not Available" />;
  };

  return (
    <>
      <StyledGistList>
        <GistListHeader
          setGridViewType={setGridViewType}
          grid_view={grid_view}
        />
        {gist_loading ? (
          <Spinner size={15} />
        ) : (
          renderGists(gists_list, grid_view)
        )}
        {!profile_view && gists_list.length === 10 && <GistListFooter />}
        {gists_list.length > 10 && <GistListFooter />}
      </StyledGistList>
    </>
  );
};

const mapDispatchToProps = {
  getList: fetchGistList,
};
const mapStateToProps = (state) => {
  const {
    gists: { gists_list, gist_loading },
  } = state;
  return { gists_list, gist_loading };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withAuth(GistList)));
