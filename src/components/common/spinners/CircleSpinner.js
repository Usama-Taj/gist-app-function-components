import GridItem from "components/GridItem/GridItem";
import React, { Component } from "react";
import { MoonLoader } from "react-spinners";
import { GridCenter } from "shared-styles/Grid.styles";

const CircleSpinner = ({ size, loading }) => {
  return (
    <GridCenter>
      <MoonLoader size={size} color="#5ACBA1" loading={loading} />
    </GridCenter>
  );
};

export default CircleSpinner;
