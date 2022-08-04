import React, { Component } from "react";
import { GridTitle, GridCenter } from "shared-styles/Grid.styles";

class GistErrorBoundaries extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.router.params?.username !== this.props.router.params?.username
    );
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.log("error");
  }
  render() {
    const { children, router } = this.props;
    const { hasError } = this.state;
    if (hasError && typeof router.params?.gist_id === "string") {
      return (
        <GridCenter>
          <GridTitle>404</GridTitle>
          <GridTitle>Ooops! Gist Not Found</GridTitle>
        </GridCenter>
      );
    }
    // else if (hasError && typeof router.params?.username === "string") {
    //   return (
    //     <GridCenter>
    //       <GridTitle>404</GridTitle>
    //       <GridTitle>Ooops! User Not Found</GridTitle>
    //     </GridCenter>
    //   );
    // }
    return children;
  }
}

export default GistErrorBoundaries;
