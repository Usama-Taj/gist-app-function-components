import styled from "styled-components";
import { Button, Input } from "antd";
import { GREEN } from "constants";
import { WHITE } from "constants";
export const HeaderArea = styled.header`
  position: fixed;
  width: 100%;
  z-index: 10;
`;

export const NavBar = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: ${GREEN};
`;

export const NavBarLogo = styled.img`
  width: 70%;
`;

export const NavBarControls = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

export const LoginButton = styled(Button)`
  &.ant-btn-default {
    color: ${GREEN};
    border-radius: 5px;
    width: 20%;
  }
  &.ant-btn:hover,
  &.ant-btn:active,
  &.ant-btn:focus {
    color: ${GREEN};
    border-color: ${GREEN};
  }
`;

export const SearchBar = styled(Input)`
  &.ant-input-affix-wrapper {
    background-color: ${GREEN};
    border: 1px solid ${WHITE};
    border-radius: 5px;
    height: 1.6rem;
    width: 70%;
    background-color: ${GREEN};
    padding: 0 20px 0 20px;
  }
  &.ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled):hover,
  &.ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled):active,
  &.ant-input-affix-wrapper:not(.ant-input-affix-wrapper-disabled):active {
    border: 2px solid ${WHITE};
    z-index: 1;
  }

  &.ant-input-affix-wrapper .anticon {
    color: ${WHITE};
  }
  &.ant-input-affix-wrapper input,
  &.ant-input-affix-wrapper input::placeholder {
    background-color: ${GREEN};
    color: white;
  }
`;

export const UserImage = styled.img`
  border-radius: 50%;
  width: 40px;
  cursor: pointer;
`;
export const MenuBar = styled.div`
  position: relative;
  &:hover .content {
    display: block;
  }
`;
export const UserMenu = styled.ul`
  position: absolute;
  background-color: ${WHITE};
  border: 1px solid rgba(107, 102, 102, 0.5);
  border-radius: 5px;
  box-shadow: -0px 0px 8px #d9d9d9, 0px -0px 8px #e7e7e7;
  width: 10vw;
  padding: 2px 4px;
  top: 20px;
  right: 0;
  display: none;
`;
export const MenuItem = styled.li`
  font-weight: ${({ clickable }) => (clickable ? "bold" : "light")};
  white-space: nowrap;
  list-style-type: none;
  padding: 5px 10px;
  font-size: 0.8rem;
  cursor: ${({ clickable }) => (clickable ? "pointer" : "auto")};
  color: #000;
  & a {
    text-decoration: none;
    color: #000;
  }
  &:hover {
    background-color: ${({ clickable }) =>
      clickable ? "rgba(107, 102, 102, 0.5)" : "none"};
  }
`;
