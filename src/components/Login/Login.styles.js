import { Button, Input } from "antd";
import { BLACK } from "constants";
import { GREEN } from "constants";
import { WHITE } from "constants";
import styled from "styled-components";

export const TextField = styled(Input)`
  &.ant-input-affix-wrapper {
    background-color: ${WHITE};
    border: 1px solid ${GREEN};
    border-radius: 5px;
    height: 1.6rem;
    width: 100%;
    background-color: ${WHITE};
    padding: 0 20px 0 20px;
  }
  &.ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled):hover,
  &.ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled):active,
  &.ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled):active {
    border: 2px solid ${GREEN};
    z-index: 1;
  }

  &.ant-input-affix-wrapper .anticon {
    color: ${GREEN};
  }
  &.ant-input-affix-wrapper input,
  &.ant-input-affix-wrapper input::placeholder {
    background-color: ${WHITE};
    color: ${GREEN};
  }
`;

export const SubmitButton = styled(Button)`
  &.ant-btn-default {
    color: ${GREEN};
    border-radius: 5px;
    z-index: 10;
  }
  &.ant-btn:hover,
  &.ant-btn:active,
  &.ant-btn:focus {
    color: ${GREEN};
    border-color: ${GREEN};
  }
`;

export const TextFieldContainer = styled.div`
  padding: 0px 20px;
  margin: 15px 0;
  display: grid;
`;

// & input[type="text"] {
//   border-radius: 5px;
//   height: 1rem;
//   border: 1px solid ${BLACK};
//   padding: 5px;
// }
// & input[type="password"] {
//   border-radius: 5px;
//   height: 1rem;
//   border: 1px solid ${BLACK};
//   padding: 5px;
// }
// & input[type="submit"] {
//   background-color: ${GREEN};
//   border-radius: 5px;
//   height: 1.5rem;
//   border: 1px solid #666;
//   color: ${WHITE};
//   cursor: pointer;
//   font-size: 0.8rem;
//   margin-left: 1%;
//   &:hover {
//     cursor: pointer;
//     border: 1px solid rgb(107, 102, 102, 0.5);
//     box-shadow: -0px 0px 10px #d9d9d9, 0px -0px 10px #e7e7e7;
//   }
//   &:active {
//     border: 1px solid ${BLACK};
//   }
// }
// & label {
//   font-size: 0.7rem;
// }
