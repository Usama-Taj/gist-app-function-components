import GridItem from "components/GridItem/GridItem";
import React, { Component, useMemo } from "react";
import { Content } from "./GridView.styles";

const GridView = ({ gists }) => {
  // Render Function
  const renderGists = useMemo(() => {
    if (Array.isArray(gists)) {
      return gists.map((item, i) => <GridItem key={i} gist={item} />);
    } else {
      return null;
    }
  }, [gists]);

  // Rendering
  return <Content>{renderGists}</Content>;
};

export default GridView;
