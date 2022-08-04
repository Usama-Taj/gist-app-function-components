import React from "react";
import { GridCenter, Message } from "shared-styles/Grid.styles";

const NotAuthorized = () => {
  return (
    <GridCenter>
      <Message remSize="4">404</Message>
      <Message remSize="2">Resource Not Found</Message>
    </GridCenter>
  );
};

export default NotAuthorized;
