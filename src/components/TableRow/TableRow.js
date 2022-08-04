import React, { Component } from "react";
import {
  TableCell,
  UserColumn,
  UserImage,
  ColumnControls,
} from "./TableRow.styles";
import { getTimeFromDate, getvalidDateDMMMY } from "utilities/utilityFunctions";
import {
  checkGistStar,
  forkOneGist,
  starOneGist,
  unStarOneGist,
} from "api/gist.service";
import { fetchGistList } from "redux-state/gists";
import { connect } from "react-redux";
class TableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in:
        JSON.parse(localStorage.getItem("gist_app"))?.logged_in || false,
      forked: false,
      starred: false,
    };
  }

  componentDidMount() {
    const {
      gist: { id },
    } = this.props;
    checkGistStar(id).then((response) => this.setState({ starred: response }));
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      gist: { id: curr_id },
    } = this.props;
    const {
      gist: { id: prev_id },
    } = prevProps;
    if (prev_id !== curr_id) {
      checkGistStar(curr_id).then((response) =>
        this.setState({ starred: response })
      );
    }
  }

  getValidData = (data) => {
    const extention = data?.match(/\.\w*$/) ?? "";
    const filename = data?.replace(/\.\w*$/, "");
    const new_filename =
      filename?.length > 20 ? filename?.substring(0, 20) : filename;
    return `${new_filename}${extention}`;
  };

  handleStar = () => {
    const {
      gist: { id },
      getList,
    } = this.props;
    const { starred } = this.state;
    if (starred) {
      unStarOneGist(id).then((res) => console.log(res));
      getList(0, "", true);
    } else {
      starOneGist(id).then((res) => console.log(res));
    }
    this.setState({ starred: !this.state.starred });
  };
  handleFork = () => {
    if (!this.state.forked) {
      const {
        gist: { id },
      } = this.props;
      forkOneGist(id).then((res) => {
        console.log(res);
        this.setState({ forked: res });
      });
    }
  };

  render() {
    const {
      checked,
      gist: {
        owner: { login: username, avatar_url: avatar },
        files,
        created_at,
        description,
      },
    } = this.props;
    const { logged_in, starred, forked } = this.state;
    return (
      <tr>
        <TableCell>
          <input type="checkbox" checked={checked} readOnly />
        </TableCell>
        <UserColumn>
          <div>
            <UserImage src={avatar} alt="user" />
          </div>
          <div>{username}</div>
        </UserColumn>
        <TableCell>{getvalidDateDMMMY(created_at)}</TableCell>
        <TableCell>{getTimeFromDate(created_at)}</TableCell>
        <TableCell>{this.getValidData(description)}</TableCell>
        <TableCell>{this.getValidData(Object.keys(files)[0])}</TableCell>
        {logged_in && (
          <ColumnControls>
            <div className="d-flex justify-content-around">
              <div>
                <i
                  onClick={this.handleStar}
                  className={`fa-${starred ? "solid" : "regular"} fa-star`}
                ></i>
              </div>
              {!forked ? (
                <div>
                  <i
                    onClick={this.handleFork}
                    className="fa-solid fa-code-branch"
                  ></i>
                </div>
              ) : (
                <div>
                  <i className="fa-solid fa-code-fork"></i>
                </div>
              )}
            </div>
          </ColumnControls>
        )}
      </tr>
    );
  }
}
const mapDispatchToProps = {
  getList: fetchGistList,
};
const mapStateToProps = (state) => {
  const {
    gists: { gists_list },
  } = state;
  return { gists_list };
};
export default connect(mapStateToProps, mapDispatchToProps)(TableRow);
