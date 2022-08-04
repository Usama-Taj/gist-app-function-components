import GistErrorBoundaries from "error-boundaries/GistErrorBoundaries";
import React from "react";

const withErrorBoundaries = (Component) => {
  return function ComponentWithErrors(props) {
    return (
      <GistErrorBoundaries {...props}>
        <Component {...props} />
      </GistErrorBoundaries>
    );
  };
};

export default withErrorBoundaries;
