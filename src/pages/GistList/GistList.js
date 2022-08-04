import React, { Component } from "react";
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

class GistList extends Component {
  constructor(props) {
    super(props);
    const { params, location } = this.props.router;
    this.state = {
      grid_view: false,
      gists: [],
      profile_view: !!params?.username,
      starred: location.pathname.split("/")[1] === "starred",
    };
    this.STARTING_PAGE = 1;
  }
  setGridViewType = (grid_view) => {
    this.setState({ grid_view });
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      router: { params: currParams },
      getList,
    } = this.props;
    const { profile_view } = this.state;
    const { params: prevParams } = prevProps.router;
    console.log(currParams.username, prevParams.username);
    if (currParams.username !== prevParams.username) {
      if (profile_view) {
        getList(this.STARTING_PAGE, currParams.username);
      }
    }
  }
  componentDidMount() {
    const {
      getList,
      router: { params },
    } = this.props;
    const { profile_view, starred } = this.state;
    if (profile_view) {
      getList(this.STARTING_PAGE, params.username);
    } else if (starred) {
      getList(this.STARTING_PAGE, "", starred);
    } else {
      getList(this.STARTING_PAGE);
    }
  }
  renderGists = (gists_list, grid_view) => {
    if (gists_list.length > 0) {
      if (grid_view) {
        return <GridView gists={gists_list} />;
      } else {
        return <TableView gists={gists_list} />;
      }
    } else return <Message title="Sorry!" message="Gists not Available" />;
  };
  render() {
    const { gists_list, gist_loading } = this.props;
    const { grid_view, profile_view } = this.state;
    return (
      <>
        <StyledGistList>
          <GistListHeader
            setGridViewType={this.setGridViewType}
            grid_view={this.state.grid_view}
          />
          {gist_loading ? (
            <Spinner size={15} />
          ) : (
            this.renderGists(gists_list, grid_view)
          )}
          {!profile_view && gists_list.length === 10 && <GistListFooter />}
          {gists_list.length > 10 && <GistListFooter />}
        </StyledGistList>
      </>
    );
  }
}
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
