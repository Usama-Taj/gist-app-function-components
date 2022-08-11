import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { getGistFile } from "api/gist.service";
import Loader from "components/common/Loader/Loader";
import React, { Component } from "react";
import { GridCenter } from "shared-styles/Grid.styles";
import { Table } from "./GridFileView.styles";

const GridFileView = ({ fileContent }) => {
  const renderFileContent = (fileData) => {
    fileData.splice(10);
    if (Array.isArray(fileData)) {
      let content = fileData;
      if (fileData.length < 10) {
        content = [
          ...fileData,
          ...Array(Math.abs(fileData.length - 10)).fill("\n"),
        ];
      }
      return content.map((item, i) => (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{item.length > 30 ? item.substring(0, 30) + "..." : item}</td>
        </tr>
      ));
    }
  };
  if (!fileContent.length) {
    return <Loader loading={!fileContent.length} />;
  }
  return (
    <Table>
      <tbody>{renderFileContent(fileContent)}</tbody>
    </Table>
  );
};

export default GridFileView;
