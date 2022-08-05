import GridItem from "components/GridItem/GridItem";
import React, { Component } from "react";
import { FadeLoader } from "react-spinners";
import { GridCenter } from "shared-styles/Grid.styles";

const Spinner = ({ size, loading }) => {
  return (
    <GridCenter>
      <FadeLoader size={size} color="#5ACBA1" loading={loading} />
    </GridCenter>
  );
};

export default Spinner;
