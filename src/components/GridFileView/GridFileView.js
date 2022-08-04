import { getGistFile } from "api/gist.service";
import React, { Component } from "react";
import { Table } from "./GridFileView.styles";

class GridFileView extends Component {
  renderFileContent = (fileData) => {
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
  render() {
    const { fileContent } = this.props;
    return (
      <Table>
        <tbody>{this.renderFileContent(fileContent)}</tbody>
      </Table>
    );
  }
}

export default GridFileView;
