import React, { useState } from "react";
import avatar_one from "assets/images/img_avatar.png";
import avatar_two from "assets/images/img_avatar2.png";
// import { TableContent, Table, TableHead, TableCell } from "./TableView.styles";
import { Avatar, Table } from "antd";
import TableRow from "components/TableRow/TableRow";
import {
  getTimeFromDate,
  getValidData,
  getvalidDateDMMMY,
} from "utilities/utilityFunctions";
import { ColumnControls, TableContent, GistTable } from "./TableView.styles";
import { starOneGist, unStarOneGist } from "api/gist.service";
import ActionColumn from "components/ActionColumn";
import { withRouter } from "hoc/withRouter";

const TableView = ({ gists, router }) => {
  // Data Variables
  const mapped_gists = gists.map(
    ({ id, owner, created_at, description, files }, i) => ({
      key: i,
      id,
      name: owner.login,
      date: getvalidDateDMMMY(created_at),
      time: getTimeFromDate(created_at),
      keyword: getValidData(description),
      notebook_name: getValidData(Object.keys(files)[0]),
      avatar: owner.avatar_url,
    })
  );
  const logged_in =
    JSON.parse(localStorage.getItem("gist_app"))?.logged_in || false;

  // Table Columns
  const columns = [
    {
      title: "",
      dataIndex: "avatar",
      key: "avatar",
      align: "right",
      render: (avatar) => <Avatar size={50} src={avatar} />,
    },
    { title: "Name", dataIndex: "name", key: "name", align: "left" },
    { title: "Date", dataIndex: "date", key: "date", align: "left" },
    { title: "Time", dataIndex: "time", key: "time", align: "left" },
    { title: "Keyword", dataIndex: "keyword", key: "keyword", align: "left" },
    {
      title: "Notebook Name",
      dataIndex: "notebook_name",
      key: "notebook_name",
      align: "left",
    },
    {
      dataIndex: "action",
      key: "action",
      render: (text, { id }, index) => <ActionColumn id={id} />,
    },
  ].filter((item) => item.dataIndex !== (logged_in ? null : "action"));
  // Rendering
  return (
    <TableContent>
      <GistTable
        rowSelection={{ type: "checkbox" }}
        dataSource={mapped_gists}
        columns={columns}
        onRow={({ id }, index) => ({
          onClick: (e) => router.navigate(`/gist-view/${id}`),
        })}
        pagination={false}
      />
      {/* <Table>
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
      </Table> */}
    </TableContent>
  );
};

export default withRouter(TableView);
