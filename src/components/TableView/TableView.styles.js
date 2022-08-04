import styled from "styled-components";

export const TableContent = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 70%;
`;
export const Table = styled.table`
  border-collapse: collapse;
  font-size: 0.7rem;
  width: 100%;
`;
export const TableHead = styled.thead`
  font-size: 0.7rem;
  background-color: rgba(88, 202, 161, 0.3);
`;
export const TableCell = styled.td`
  padding: 24px;
  text-align: center;
`;

export const UserImage = styled.img`
  border-radius: 50%;
  width: 40px;
`;
export const UserColumn = styled(TableCell)`
  column-gap: 20px;
  display: flex;
  align-items: center;
  justify-content: start;
`;

export const ColumnControls = styled(TableCell)`
  color: #5acba1;
  font-size: 1rem;
  cursor: pointer;
`;
