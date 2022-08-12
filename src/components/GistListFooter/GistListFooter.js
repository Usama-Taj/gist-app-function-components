import { getPublicGists } from "api/gist.service";
import {
  getGistList,
  setPageNumber,
  startGistLoading,
  stopGistLoading,
} from "context/gists/actions";
import { GistContext } from "context/gists";
import React, { Component, useCallback, useContext } from "react";
import {
  PaginationControls,
  PageInfo,
  PreviousButton,
  NextButton,
} from "./GistListFooter.styles";

const GistListFooter = () => {
  // Context API
  const [state, dispatch] = useContext(GistContext);
  const { page_number } = state;

  // Functions
  const moveBack = useCallback(async () => {
    dispatch(startGistLoading());
    dispatch(setPageNumber(page_number - 1));
    const response = await getPublicGists(page_number - 1);
    dispatch(getGistList(response));
    dispatch(stopGistLoading());
  }, [page_number]);

  const moveNext = useCallback(async () => {
    dispatch(startGistLoading());
    dispatch(setPageNumber(page_number + 1));
    const response = await getPublicGists(page_number + 1);
    dispatch(getGistList(response));
    dispatch(stopGistLoading());
  }, [page_number]);

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
