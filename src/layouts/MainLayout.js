import React from "react";
import Header from "components/common/header/Header";
import { BrowserRouter as Router } from "react-router-dom";
import Main from "components/common/main/Main";

const MainLayout = ({ children }) => {
  return (
    <Router>
      <Header />
      <Main>{children}</Main>
    </Router>
  );
};

export default MainLayout;
