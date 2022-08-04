import styled from "styled-components";

export const HeaderArea = styled.header`
  position: fixed;
  z-index: 10;
  width: 100%;
`;

export const NavBar = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: #5acba1;
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
  & * {
    border-radius: 5px;
    color: #fff;
  }
  & input[type="text"] {
    border: 1px solid #fff;
    height: 40%;
    width: 70%;
    background-color: #5acba1;
    padding: 0 10px 0 10px;
  }

  & input[type="text"]::placeholder {
    color: #fff;
  }
  & input[type="text"]:focus {
    outline: none;
    border: 2px solid #fff;
  }

  & button {
    background-color: #fff;
    height: 45%;
    outline: none;
    border-color: #fff;
    color: #5acba1;
    width: 20%;
    cursor: pointer;
  }
  & button:active {
    border-color: 2px solid #fff;
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
  background-color: #fff;
  border: 1px solid rgb(107, 102, 102, 0.5);
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
      clickable ? "rgb(107, 102, 102, 0.5)" : "none"};
  }
`;
