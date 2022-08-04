import GridItem from "components/GridItem/GridItem";
import React, { Component } from "react";
import { Content } from "./GridView.styles";
class GridView extends Component {
  renderGists = (gists) => {
    if (Array.isArray(gists))
      return gists.map((item, i) => <GridItem key={i} gist={item} />);
  };
  render() {
    const { gists } = this.props;
    return <Content>{this.renderGists(gists)}</Content>;
  }
}

export default GridView;
