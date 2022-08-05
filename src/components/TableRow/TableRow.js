import React, { useState, useEffect } from "react";
import {
  TableCell,
  UserColumn,
  UserImage,
  ColumnControls,
} from "./TableRow.styles";
import {
  getTimeFromDate,
  getValidData,
  getvalidDateDMMMY,
} from "utilities/utilityFunctions";
import {
  checkGistStar,
  forkOneGist,
  starOneGist,
  unStarOneGist,
} from "api/gist.service";
import { fetchGistList } from "redux-state/gists";
import { connect } from "react-redux";

const TableRow = ({
  gist,
  checked,
  getList,
  gist: {
    id,
    owner: { login: username, avatar_url: avatar },
    files,
    created_at,
    description,
  },
}) => {
  // Data Variables

  // States
  const [logged_in, setLogged_in] = useState(
    JSON.parse(localStorage.getItem("gist_app"))?.logged_in || false
  );
  const [forked, setForked] = useState(false);
  const [starred, setStarred] = useState(false);
  // useEffects
  useEffect(() => {
    const { id } = gist;
    checkGistStar(id).then((response) => setStarred(response));
  }, []);
  // useEffect(() => {
  //   checkGistStar(curr_id).then((response) =>
  //     this.setState({ starred: response })
  //   );
  // }, [id]);
  // Functions
  const handleStar = () => {
    const { id } = gist;
    if (starred) {
      unStarOneGist(id).then((res) => res && setStarred(false));
      // getList(0, "", true);
    } else {
      starOneGist(id).then((res) => res && setStarred(true));
    }
  };
  const handleFork = () => {
    if (!forked) {
      const { id } = gist;
      forkOneGist(id).then((res) => {
        setForked(res);
      });
    }
  };
  // Rendering
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
      <TableCell>{getValidData(description)}</TableCell>
      <TableCell>{getValidData(Object.keys(files)[0])}</TableCell>
      {logged_in && (
        <ColumnControls>
          <div className="d-flex justify-content-around">
            <div>
              <i
                onClick={handleStar}
                className={`fa-${starred ? "solid" : "regular"} fa-star`}
              ></i>
            </div>
            {!forked ? (
              <div>
                <i onClick={handleFork} className="fa-solid fa-code-branch"></i>
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
};
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
// export default TableRow;

// class TableRow extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       logged_in:
//         JSON.parse(localStorage.getItem("gist_app"))?.logged_in || false,
//       forked: false,
//       starred: false,
//     };
//   }

//   componentDidMount() {

//   }

//   componentDidUpdate(prevProps, prevState) {
//     const {
//       gist: { id: curr_id },
//     } = this.props;
//     const {
//       gist: { id: prev_id },
//     } = prevProps;
//     if (prev_id !== curr_id) {

//     }
//   }

//   getValidData = (data) => {
//     const extention = data?.match(/\.\w*$/) ?? "";
//     const filename = data?.replace(/\.\w*$/, "");
//     const new_filename =
//       filename?.length > 20 ? filename?.substring(0, 20) : filename;
//     return `${new_filename}${extention}`;
//   };

//   };

//   render() {
//     const {
//       checked,
//       gist: ,
//     } = this.props;
//     const { logged_in, starred, forked } = this.state;
//     return (

//     );
//   }
// }
