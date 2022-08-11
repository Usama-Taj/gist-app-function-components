import { Card } from "antd";
import CodeCard from "components/common/CodeCard/CodeCard";
import React, { Component } from "react";
import { Content, Table } from "./GistContent.styles";

const GistContent = ({ filename, fileContent }) => {
  const renderFileContent = (fileData) => {
    if (Array.isArray(fileData)) {
      return (
        <tbody>
          {fileData.map((item, i) => (
            <tr key={i}>
              <td>
                <b>{i + 1}</b>
              </td>
              <td>{item}</td>
            </tr>
          ))}
        </tbody>
      );
    }
  };

  return (
    <Content>
      <CodeCard title={filename}>
        <Table>{renderFileContent(fileContent)}</Table>
      </CodeCard>
    </Content>
  );
};

export default GistContent;
