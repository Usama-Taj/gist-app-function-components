import React, { useState } from "react";
import avatar_one from "assets/images/img_avatar.png";
import avatar_two from "assets/images/img_avatar2.png";
import { TableContent, Table, TableHead, TableCell } from "./TableView.styles";
import TableRow from "components/TableRow/TableRow";

const TableView = ({ gists }) => {
  // States
  const [allChecked, setAllChecked] = useState(false);

  // Functions
  const renderRows = (gists, checked) => {
    if (Array.isArray(gists))
      return gists.map((item, i) => (
        <TableRow key={i} gist={item} checked={checked} />
      ));
  };
  const checkAll = (e) => {
    setAllChecked(e.target.checked);
  };
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
                onChange={checkAll}
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
        <tbody>{renderRows(gists, allChecked)}</tbody>
      </Table>
    </TableContent>
  );
};

export default TableView;
