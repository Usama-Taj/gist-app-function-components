import React from "react";
import { GridCenter, GridTitle } from "shared-styles/Grid.styles";

const Message = ({ title, message }) => {
  return (
    <GridCenter>
      {title && <GridTitle remSize="4">{title}</GridTitle>}
      {message && <GridTitle remSize="2">{message}</GridTitle>}
    </GridCenter>
  );
};

export default Message;
