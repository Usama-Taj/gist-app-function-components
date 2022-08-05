import GridItem from "components/GridItem/GridItem";
import React, { Component } from "react";
import { Content } from "./GridView.styles";

const GridView = ({ gists }) => {
  const renderGists = (gists) => {
    if (Array.isArray(gists))
      return gists.map((item, i) => <GridItem key={i} gist={item} />);
  };
  return <Content>{renderGists(gists)}</Content>;
};

export default GridView;
