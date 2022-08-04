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
export const ViewProfileButton = styled.button`
  color: #58a6ff;
  font-weight: bold;
  background-color: #fff;
  padding: 10px 40px 10px 40px;
  border-radius: 5px;
  border: 1px solid rgb(124, 117, 117);
  cursor: pointer;
  &:active {
    border: 2px solid rgb(124, 117, 117);
  }
`;
