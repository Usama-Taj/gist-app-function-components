import React, { useState, useEffect } from "react";
import { CommonButton } from "./Button.styles";

const Button = (props) => {
  const { children, danger, htmlType, block, type, icon, width } = props;
  return (
    <CommonButton
      htmlType={htmlType}
      danger={danger}
      block={block}
      type={type}
      icon={icon}
      width={width}
      {...props}
    >
      {children}
    </CommonButton>
  );
};

export default Button;
