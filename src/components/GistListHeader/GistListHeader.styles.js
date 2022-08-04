import styled from "styled-components";

export const TableGridControls = styled.div`
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  grid-template-columns: 1fr 1fr;
  display: grid;
  & i {
    cursor: pointer;
    color: rgba(117, 113, 113, 0.5);
  }
`;

export const TableGridControlsItem = styled.div`
  grid-column-start: 3;
`;

export const VerticalLine = styled.span`
  border-left: 2px solid #6c757d;
  height: 100%;
  margin: 0 7px 0 7px;
`;
