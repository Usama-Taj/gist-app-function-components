import styled from "styled-components";

export const GistItem = styled.div`
  display: grid;
  row-gap: 10px;
`;
export const GistHeader = styled.div`
  display: grid;
`;

export const GistPorfileImageArea = styled.div`
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 6fr 4fr;
`;

export const GistProfileImage = styled.img`
  border-radius: 50%;
  width: 90%;
`;

export const GistInfo = styled.div`
  font-size: 0.7rem;
  color: #58a6ff;
  & a:hover {
    text-decoration: underline;
  }
`;

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

export const Card = styled.div`
  background: #e0e0e0;
  box-shadow: 0px 0px 4px #acacac, -0px -0px 4px #ffffff;
  border-radius: 5px;
`;

export const CardContent = styled.div`
  font-size: 0.6rem;
  font-family: "Courier New", Courier, monospace;
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
`;
export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  & tbody tr:nth-child(even) {
    background-color: rgba(183, 182, 182, 0.1);
  }
  & tbody tr:nth-child(odd) {
    background-color: #fff;
  }
`;
