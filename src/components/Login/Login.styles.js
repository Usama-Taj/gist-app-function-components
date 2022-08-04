import styled from "styled-components";
export const TextField = styled.div`
  padding: 0px 20px;
  margin: 10px 0;
  display: grid;
  row-gap: 5px;
  & input[type="text"] {
    border-radius: 5px;
    height: 1rem;
    border: 1px solid #000;
    padding: 5px;
  }
  & input[type="password"] {
    border-radius: 5px;
    height: 1rem;
    border: 1px solid #000;
    padding: 5px;
  }
  & input[type="submit"] {
    background-color: #5acba1;
    border-radius: 5px;
    height: 1.5rem;
    border: 1px solid #666;
    color: #fff;
    cursor: pointer;
    font-size: 0.8rem;
    margin-left: 1%;
    &:hover {
      cursor: pointer;
      border: 1px solid rgb(107, 102, 102, 0.5);
      box-shadow: -0px 0px 10px #d9d9d9, 0px -0px 10px #e7e7e7;
    }
    &:active {
      border: 1px solid #000;
    }
  }
  & label {
    font-size: 0.7rem;
  }
  & * {
    width: 100%;
    display: block;
  }
`;
