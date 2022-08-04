import styled from "styled-components";

export const GridCenter = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
`;
export const GridTitle = styled.div`
  font-size: ${({ remSize }) => remSize}rem;
  text-align: center;
  font-weight: bold;
`;

export const ShadowGridItem = styled.div`
  border-radius: 10px;
  border-radius: 10px;
  width: ${({ widthPercent }) => widthPercent}px;
  padding: 10px;
  border: 1px solid rgb(107, 102, 102, 0.5);
  border-radius: 15px;
  box-shadow: -0px 0px 8px #d9d9d9, 0px -0px 8px #e7e7e7;
`;
