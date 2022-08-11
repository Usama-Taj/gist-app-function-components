import { Button } from "antd";
import { BLUE } from "constants";
import styled from "styled-components";
export const ProfileInfo = styled.div`
  display: grid;
  text-align: center;
  row-gap: 15px;
`;
export const ProfileImage = styled.img`
  border-radius: 50%;
  width: 20vw;
`;
export const ViewProfileButton = styled(Button)`
  &.ant-btn {
    border-radius: 5px;
    color: ${BLUE};
  }
  width: 50%;
`;
