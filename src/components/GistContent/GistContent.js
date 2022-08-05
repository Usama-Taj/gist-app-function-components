import React, { Component } from "react";
import {
  Content,
  CardHeader,
  CardContent,
  Table,
  Card,
} from "./GistContent.styles";

const GistContent = ({ filename, fileContent }) => {
  const renderFileContent = (fileData) => {
    if (Array.isArray(fileData)) {
      return fileData.map((item, i) => (
        <tr key={i}>
          <td>
            <b>{i + 1}</b>
          </td>
          <td>{item}</td>
        </tr>
      ));
    }
  };

  return (
    <Content>
      <Card>
        <CardHeader>
          <span>{filename}</span>
        </CardHeader>
        <CardContent>
          <Table>
            <tbody>{renderFileContent(fileContent)}</tbody>
          </Table>
        </CardContent>
      </Card>
    </Content>
  );
};

export default GistContent;
