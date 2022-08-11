import React, { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGistList } from "redux-state/gists";
import {
  PaginationControls,
  PageInfo,
  PreviousButton,
  NextButton,
} from "./GistListFooter.styles";

const GistListFooter = () => {
  // Redux Hooks
  const { page_number } = useSelector((state) => state.gists);
  const dispatch = useDispatch();

  // Functions
  const moveBack = () => {
    dispatch(fetchGistList(page_number - 1));
  };

  const moveNext = () => {
    dispatch(fetchGistList(page_number + 1));
  };

  // Rendering
  return (
    <PaginationControls>
      <div></div>
      <div>
        <PreviousButton disabled={page_number === 1} onClick={moveBack}>
          Prev
        </PreviousButton>
        <NextButton disabled={page_number === 30} onClick={moveNext}>
          Next
        </NextButton>
      </div>
      <PageInfo>Page {page_number} of 30</PageInfo>
    </PaginationControls>
  );
};

export default GistListFooter;
