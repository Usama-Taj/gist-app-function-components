import React, { Component } from "react";
import MainLayout from "layouts/MainLayout";
import AppRoutes from "routes/AppRoutes";
import "antd/dist/antd.css";

const App = () => {
  return (
    <MainLayout>
      <AppRoutes />
    </MainLayout>
  );
};

export default App;
