import React, { useState, useEffect } from "react";
import { CodeFileCard } from "./CodeCard.styles";

const CodeCard = (props) => {
  const { filename, children } = props;
  return (
    <CodeFileCard title={filename} {...props}>
      {children}
    </CodeFileCard>
  );
};

export default CodeCard;
