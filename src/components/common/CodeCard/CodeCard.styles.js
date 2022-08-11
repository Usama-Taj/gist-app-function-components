import { Card } from "antd";
import { BLUE } from "constants";
import styled from "styled-components";

export const CodeFileCard = styled(Card)`
  &.ant-card {
    font-size: 0.6rem;
    font-family: monospace;
  }
  & .ant-card-head {
    padding: 0 10px;
    min-height: 1rem;
  }
  & .ant-card-head-title {
    font-size: 0.6rem;
    padding: 5px 0px;
    font-weight: bold;
    color: ${BLUE};
  }
  & .ant-card-body {
    padding: 5px;
  }
`;
