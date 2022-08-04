import React, { Component } from "react";
import avatar_one from "assets/images/img_avatar.png";
import avatar_two from "assets/images/img_avatar2.png";
import { TableContent, Table, TableHead, TableCell } from "./TableView.styles";
import TableRow from "components/TableRow/TableRow";

class TableView extends Component {
  constructor(props) {
    super(props);
    this.state = { allChecked: false };
  }
  renderRows = (gists, checked) => {
    if (Array.isArray(gists))
      return gists.map((item, i) => (
        <TableRow key={i} gist={item} checked={checked} />
      ));
  };
  checkAll = (e) => {
    this.setState({ allChecked: e.target.checked });
  };
  render() {
    const { gists } = this.props;
    const { allChecked } = this.state;
    return (
      <TableContent>
        <Table>
          <TableHead>
            <tr>
              <TableCell>
                <input
                  type="checkbox"
                  name="check_all"
                  id="check_all"
                  onChange={this.checkAll}
                  value={allChecked}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Keyword</TableCell>
              <TableCell>Notebook Name</TableCell>
              <TableCell></TableCell>
            </tr>
          </TableHead>
          <tbody>{this.renderRows(gists, allChecked)}</tbody>
        </Table>
      </TableContent>
    );
  }
}

export default TableView;
