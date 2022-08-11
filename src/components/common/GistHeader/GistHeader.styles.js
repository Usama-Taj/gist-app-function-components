import styled from "styled-components";

export const GistHistory = styled.div`
  font-size: 0.5rem;
  color: #6b6666;
`;

export const GistControls = styled.div`
  display: flex;
  justify-content: end;
  column-gap: 40px;
  & * {
    cursor: pointer;
  }
  & i {
    color: #58a6ff;
    font-size: 0.7rem;
  }
`;

export const GistControlLabel = styled.span`
  display: inline;
  color: #58a6ff;
  cursor: pointer;
  font-size: 0.5rem;
`;
