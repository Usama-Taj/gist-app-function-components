import { Button } from "antd";
import { GREEN, GREY, BLACK, WHITE } from "constants/index";
import styled from "styled-components";

export const NextButton = styled(Button)`
  &.ant-btn-default {
    color: ${GREEN};
    border-radius: 5px;
    margin: 0 5px;
  }
  &.ant-btn:not([disabled]):hover,
  &.ant-btn:not([disabled]):active,
  &.ant-btn:not([disabled]):focus {
    color: ${GREEN};
    border-color: ${GREY};
  }
`;

export const PreviousButton = styled(Button)`
  &.ant-btn-default {
    color: ${GREEN};
    background-color: ${GREY};
    border-radius: 5px;
    margin: 0 5px;
  }
  &.ant-btn:not([disabled]):hover,
  &.ant-btn:not([disabled]):active,
  &.ant-btn:not([disabled]):focus {
    color: ${WHITE};
    background-color: ${BLACK};
    border-color: ${GREEN};
  }
`;

export const PaginationControls = styled.div`
  display: flex;
  justify-content: space-between;
  width: 70%;
  margin: 20px auto;
`;

export const PageInfo = styled.div`
  font-size: 0.7rem;
`;
