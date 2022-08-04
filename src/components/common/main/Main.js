import React, { Component } from "react";

class Main extends Component {
  render() {
    const { children } = this.props;
    return <main>{children}</main>;
  }
}

export default Main;
