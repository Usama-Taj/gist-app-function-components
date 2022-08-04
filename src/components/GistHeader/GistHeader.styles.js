import styled from "styled-components";

export const Header = styled.div`
  display: grid;
`;

export const UserImage = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 10fr 5fr;
  & img {
    border-radius: 50%;
    width: 90%;
  }
`;

export const GistInfo = styled.div`
  font-size: 0.7rem;
  color: #58a6ff;
`;

export const GistHistory = styled.div`
  font-size: 0.5rem;
  color: #6b6666;
`;

export const GistHeaderControls = styled.div`
  display: grid;
  justify-content: end;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  column-gap: 20px;
  & div {
    white-space: nowrap;
    cursor: pointer;
  }
  & label {
    color: #58a6ff;
    cursor: pointer;
    font-size: 0.6rem;
    user-select: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
  & i {
    color: #58a6ff;
    cursor: pointer;
    font-size: 0.7rem;
  }
  & input[type="text"] {
    width: 40px;
  }
`;
