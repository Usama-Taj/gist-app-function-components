import { Button, Input, Switch } from "antd";
import { GREEN } from "constants";
import { GREY } from "constants";
import { LIGHTGREEN } from "constants";
import { WHITE } from "constants";
import { BLACK } from "constants";
import { RED } from "constants";
import styled, { css } from "styled-components";
const { TextArea } = Input;

const FieldEffects = css`
  &.ant-input:not(.ant-input-disabled):hover,
  &.ant-input:not(.ant-input-disabled):active,
  &.ant-input:not(.ant-input-disabled):active {
    border: 1px solid ${GREEN};
  }
`;

const ButtonEffects = css`
  &.ant-btn:hover,
  &.ant-btn:active,
  &.ant-btn:focus {
    color: ${WHITE};
    background-color: ${LIGHTGREEN};
    border-color: ${LIGHTGREEN};
  }
`;

export const GistTypeSwitch = styled(Switch)`
  &.ant-switch {
    background-color: ${GREEN};
    width: 6%;
  }
`;

export const TextField = styled(Input)`
  &.ant-input {
    border-radius: 5px;
    height: 1.6rem;
    width: 100%;
  }
  ${FieldEffects}
`;

export const FileContent = styled(TextArea)`
  &.ant-input {
    border-radius: 5px;
    width: 100%;
  }
  ${FieldEffects}
`;

export const AddFileButton = styled(Button)`
  &.ant-btn {
    color: ${WHITE};
    background-color: ${GREEN};
    border-color: ${GREEN};
    border-radius: 5px;
    width: 10%;
  }
  ${ButtonEffects}
`;

export const CreateOrUpdateGistButton = styled(Button)`
  &.ant-btn {
    border-radius: 5px;
    width: 100%;
  }
  &.ant-btn {
    color: ${WHITE};
    background-color: ${GREEN};
    border-color: ${GREEN};
    border-radius: 5px;
    width: 10%;
  }
  ${ButtonEffects}
`;
