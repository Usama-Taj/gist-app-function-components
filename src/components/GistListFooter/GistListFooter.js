import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchGistList } from "redux-state/gists";
import { PaginationControls, PageInfo } from "./GistListFooter.styles";
class GistListFooter extends Component {
  moveBack = () => {
    const { getList, page_number } = this.props;
    getList(page_number - 1);
  };

  moveNext = () => {
    const { getList, page_number } = this.props;
    getList(page_number + 1);
  };

  render() {
    const { page_number } = this.props;
    return (
      <footer>
        <PaginationControls>
          <div></div>
          <div>
            <button disabled={page_number === 1} onClick={this.moveBack}>
              Prev
            </button>
            <button disabled={page_number === 30} onClick={this.moveNext}>
              Next
            </button>
          </div>
          <PageInfo>Page {page_number} of 30</PageInfo>
        </PaginationControls>
      </footer>
    );
  }
}
const mapStateToProps = (state) => {
  const {
    gists: { page_number },
  } = state;
  return { page_number };
};

const mapDispatchToProps = {
  getList: fetchGistList,
};

export default connect(mapStateToProps, mapDispatchToProps)(GistListFooter);
