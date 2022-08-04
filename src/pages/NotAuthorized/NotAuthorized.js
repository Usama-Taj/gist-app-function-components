import React from "react";
import { GridCenter, GridTitle } from "shared-styles/Grid.styles";

const NotAuthorized = () => {
  return (
    <GridCenter>
      <GridTitle remSize="4">401</GridTitle>
      <GridTitle remSize="2">Your Are Not Authorized</GridTitle>
    </GridCenter>
  );
};

export default NotAuthorized;
