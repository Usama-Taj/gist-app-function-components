import styled from "styled-components";
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
  & i {
    cursor: pointer;
  }
`;
