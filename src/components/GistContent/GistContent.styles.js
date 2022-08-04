import styled from "styled-components";

export const Content = styled.div`
  display: grid;
`;
export const CardHeader = styled.div`
  font-size: 0.7rem;
  color: #58a6ff;
  font-weight: bold;
  padding: 10px 15px;
  background-color: white;
  border-bottom: 1px solid #b7b0b0;
`;
export const CardContent = styled.div`
  font-size: 0.6rem;
  font-family: "Courier New", Courier, monospace;
  padding: 15px 30px;
  background-color: #fff;
  border-radius: 0 0 5px 5px;
`;
export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  & td {
    padding: 2px 20px;
  }
  & tr:nth-child(even) {
    background-color: rgba(183, 182, 182, 0.1);
  }
  & tr:nth-child(odd) {
    background-color: #fff;
  }
`;
export const Card = styled.div`
  background: #e0e0e0;
  box-shadow: 0px 0px 4px #acacac, -0px -0px 4px #ffffff;
  border-radius: 0 0 5px 5px;
`;
