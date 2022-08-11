import { LoadingOutlined } from "@ant-design/icons";
import { GridCenter } from "shared-styles/Grid.styles";
import styled from "styled-components";

export const CenterBox = styled(GridCenter)`
  margin: 100px 0;
`;

export const LoadingIcon = styled(LoadingOutlined)`
  &.anticon {
    font-size: 40px;
  }
`;
