import React, { Component } from "react";
import {
  Content,
  CardHeader,
  CardContent,
  Table,
  Card,
} from "./GistContent.styles";

class GistContent extends Component {
  renderFileContent = (fileData) => {
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
  render() {
    const { filename, fileContent } = this.props;
    return (
      <Content>
        <Card>
          <CardHeader>
            <span>{filename}</span>
          </CardHeader>
          <CardContent>
            <Table>
              <tbody>{this.renderFileContent(fileContent)}</tbody>
            </Table>
          </CardContent>
        </Card>
      </Content>
    );
  }
}

export default GistContent;
