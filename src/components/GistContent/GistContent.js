import { Card } from "antd";
import CodeCard from "components/common/CodeCard/CodeCard";
import React, { Component, useMemo } from "react";
import { Content, Table } from "./GistContent.styles";

const GistContent = ({ filename, fileContent }) => {
  const renderFileContent = useMemo(() => {
    if (Array.isArray(fileContent)) {
      return (
        <tbody>
          {fileContent.map((item, i) => (
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
  }, [fileContent]);

  return (
    <Content>
      <CodeCard title={filename}>
        <Table>{renderFileContent}</Table>
      </CodeCard>
    </Content>
  );
};

export default GistContent;
