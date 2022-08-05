import { getGistFile } from "api/gist.service";
import React, { Component } from "react";
import { Table } from "./GridFileView.styles";

const GridFileView = ({ fileContent }) => {
  const renderFileContent = (fileData) => {
    fileData.splice(10);
    if (Array.isArray(fileData)) {
      return fileData.map((item, i) => (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{item.length > 30 ? item.substring(0, 30) + "..." : item}</td>
        </tr>
      ));
    }
  };
  return (
    <Table>
      <tbody>{renderFileContent(fileContent)}</tbody>
    </Table>
  );
};

export default GridFileView;
