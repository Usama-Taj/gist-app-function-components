import styled from "styled-components";
export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  & td {
    padding: 2px;
  }
  & tr:nth-child(even) {
    background-color: rgba(107, 102, 102, 0.1);
  }
  & tr:nth-child(odd) {
    background-color: #fff;
  }
`;
