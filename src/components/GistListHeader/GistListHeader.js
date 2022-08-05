import React, { Component } from "react";
import {
  TableGridControls,
  TableGridControlsItem,
  VerticalLine,
} from "./GistListHeader.styles";

const GistListHeader = ({ setGridViewType, grid_view }) => {
  const setGirdView = () => {
    setGridViewType(true);
  };
  const setTableView = () => {
    setGridViewType(false);
  };
  return (
    <TableGridControls>
      <div></div>
      <TableGridControlsItem>
        <i
          className={`fa-solid fa-list ${!grid_view && "text-success"}`}
          onClick={setTableView}
        ></i>
        <VerticalLine></VerticalLine>
        <i
          className={`fa-solid fa-border-none ${grid_view && "text-success"}`}
          onClick={setGirdView}
        ></i>
      </TableGridControlsItem>
    </TableGridControls>
  );
};

export default GistListHeader;
