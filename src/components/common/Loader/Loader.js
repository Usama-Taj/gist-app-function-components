import React from "react";
import { Spin } from "antd";
import { CenterBox, LoadingIcon } from "./Loader.styles";

const Loader = ({ loading }) => {
  return loading ? (
    <CenterBox>
      <Spin indicator={<LoadingIcon spin />} />
    </CenterBox>
  ) : null;
};

export default Loader;
