import { Button } from "antd";
import styled, { css } from "styled-components";
import { WHITE, GREEN, LIGHTGREEN } from "constants";

const PrimaryStyles = css`
  color: ${WHITE};
  background-color: ${GREEN};
  border-color: ${GREEN};
`;
const DefaultStyles = css`
  color: ${GREEN};
`;

const PrimaryEffects = css`
  &.ant-btn:hover,
  &.ant-btn:active,
  &.ant-btn:focus {
    color: ${WHITE};
    background-color: ${LIGHTGREEN};
    border-color: ${LIGHTGREEN};
  }
`;

const DefaultEffects = css`
  &.ant-btn:hover,
  &.ant-btn:active,
  &.ant-btn:focus {
    color: ${GREEN};
    border-color: ${GREEN};
  }
`;

export const CommonButton = styled(Button)`
  // Static Styles
  &.ant-btn {
    // Common Styles
    border-radius: 5px;
    width: ${({ width }) => (width ? `${width}%` : "10%")};

    // Dynamic Styles
    ${({ type, danger }) => type === "primary" && !danger && PrimaryStyles}
    ${({ type, danger }) => type === undefined && !danger && DefaultStyles}
  }

  // EFFECTS
  ${({ type, danger }) => type === "primary" && !danger && PrimaryEffects}

  ${({ type, danger }) => type === undefined && !danger && DefaultEffects}
`;
