import GridItem from "components/GridItem/GridItem";
import React, { Component } from "react";
import { MoonLoader } from "react-spinners";
import { GridCenter } from "shared-styles/Grid.styles";

class CircleSpinner extends Component {
  render() {
    const { size, loading } = this.props;
    return (
      <GridCenter>
        <MoonLoader size={size} color="#5ACBA1" loading={loading} />
      </GridCenter>
    );
  }
}

export default CircleSpinner;
