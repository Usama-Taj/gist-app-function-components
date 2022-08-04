import styled from "styled-components";

export const PaginationControls = styled.div`
  display: flex;
  justify-content: space-around;
  & button {
    background-color: #5acba1;
    border-radius: 5px;
    height: 45%;
    outline: none;
    border: 1px solid #224f3f;
    color: #fff;
    width: 100px;
    height: 30px;
    cursor: pointer;
    margin-left: 5px;
    margin-right: 5px;
  }
  & button:disabled {
    background-color: #666;
    border-radius: 5px;
    height: 45%;
    outline: none;
    border: 1px solid #334;
    color: #fff;
    width: 100px;
    height: 30px;
    cursor: pointer;
    margin-left: 5px;
    margin-right: 5px;
  }
  & button:active {
    border: 2px solid #000;
  }
`;

export const PageInfo = styled.div`
  font-size: 0.7rem;
`;
