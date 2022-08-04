import React, { Component } from "react";
import {
  TableGridControls,
  TableGridControlsItem,
  VerticalLine,
} from "./GistListHeader.styles";

class GistListHeader extends Component {
  setGirdView = () => {
    this.props.setGridViewType(true);
  };
  setTableView = () => {
    this.props.setGridViewType(false);
  };
  render() {
    const { grid_view } = this.props;
    return (
      <TableGridControls>
        <div></div>
        <TableGridControlsItem>
          <i
            className={`fa-solid fa-list ${!grid_view && "text-success"}`}
            onClick={this.setTableView}
          ></i>
          <VerticalLine></VerticalLine>
          <i
            className={`fa-solid fa-border-none ${grid_view && "text-success"}`}
            onClick={this.setGirdView}
          ></i>
        </TableGridControlsItem>
      </TableGridControls>
    );
  }
}

export default GistListHeader;
