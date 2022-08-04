import styled from "styled-components";

export const Label = styled.span`
  font-size: 0.8rem;
  font-weight: bold;
  margin-right: 20px;
  cursor: pointer;
`;
export const AddGistForm = styled.form`
  display: grid;
  margin-left: auto;
  margin-right: auto;
  row-gap: 15px;
  width: 70%;
  & button,
  input {
    border-radius: 5px;
    border: none;
    outline: 1px solid rgba(128, 128, 128, 0.5);
  }
  & input[type="text"] {
    padding-left: 10px;
    padding-right: 10px;
    height: 1.5rem;
  }
  & input[type="checkbox"] {
    border-radius: auto;
    border: none;
    outline: none;
    margin-right: auto;
  }
  & te & textarea {
    padding-left: 10px;
    padding-right: 10px;
  }
  & input[type="text"] ::placeholder {
    width: 100%;
  }

  & input[type="submit"] {
    cursor: pointer;
    width: 10%;
    color: #fff;
    background-color: #5acba1;
    height: 1.2rem;
  }
  & button {
    cursor: pointer;
    width: 10%;
    color: #fff;
    background-color: #5acba1;
    height: 1.2rem;
  }
  & .btn-danger {
    cursor: pointer;
    width: 10%;
    color: #fff;
    background-color: #ff0000;
    height: 1.2rem;
  }
  & label[for="file"] {
    cursor: pointer;
    width: 10%;
    color: #fff;
    background-color: #5acba1;
    height: 1rem;
    text-align: center;
    font-size: 0.7rem;
    padding-top: 5px;
  }
  & input[type="file"] {
    opacity: 0;
    position: absolute;
    z-index: -1;
  }
  & button:active {
    border: 1px solid rgba(0, 0, 0, 0.4);
  }
`;
