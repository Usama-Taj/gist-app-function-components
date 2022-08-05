import React, { useState } from "react";
import logo from "assets/logos/logo.svg";
import avatar from "assets/images/img_avatar.png";
import {
  HeaderArea,
  NavBar,
  NavBarLogo,
  NavBarControls,
  UserImage,
  UserMenu,
  MenuItem,
  MenuBar,
} from "./Header.styles";
import { withRouter } from "hoc/withRouter";
import { getGistsByUser } from "api/gist.service";
import { connect } from "react-redux";
import { setLoggedInState } from "redux-state/gists/actions";
import { fetchGistList } from "redux-state/gists";

const Header = ({ router, logged_in, loginUser, getList }) => {
  // Data Variables
  const GITHUB_PROFILE = `https://github.com/${process.env.USERNAME}`;
  // States
  const [username, setUsername] = useState("");
  // Functions
  const handleLoginUser = (e) => {
    router.navigate("/login");
  };

  const logoutUser = (e) => {
    localStorage.setItem("gist_app", JSON.stringify({ logged_in: false }));
    loginUser(false);
    router.navigate("/login");
  };

  const handleSearchChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.code === "Enter") {
      router.navigate(`/search/${username}`);
    }
  };

  const displayYourGist = () => {
    router.navigate(`/profile/${process.env.USERNAME}`);
  };

  const displayStarredGists = () => {
    router.navigate("/starred");
  };

  const handleAddGist = () => {
    router.navigate("/add-gist");
  };

  return (
    <>
      <HeaderArea>
        <NavBar>
          <a href="#">
            <NavBarLogo src={logo} alt="Emumba Logo" />
          </a>
          <NavBarControls>
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search Name..."
              onChange={handleSearchChange}
              onKeyUp={handleEnter}
            />

            {!logged_in ? (
              <button onClick={handleLoginUser}>Login</button>
            ) : (
              <MenuBar>
                <UserImage src={avatar} alt="UserImage" />
                <UserMenu className="content">
                  <MenuItem>Signed in as</MenuItem>
                  <MenuItem>Usama Taj</MenuItem>
                  <MenuItem clickable onClick={displayYourGist}>
                    Your Gists
                  </MenuItem>
                  <MenuItem clickable onClick={displayStarredGists}>
                    Starred Gists
                  </MenuItem>
                  <MenuItem clickable onClick={handleAddGist}>
                    Add Gist
                  </MenuItem>
                  <hr />
                  <MenuItem clickable>
                    <a href={GITHUB_PROFILE} target="_blank">
                      Your Github profile
                    </a>
                  </MenuItem>
                  <MenuItem clickable onClick={logoutUser}>
                    Log Out
                  </MenuItem>
                </UserMenu>
              </MenuBar>
            )}
          </NavBarControls>
        </NavBar>
      </HeaderArea>
      <div className="under-header"></div>
    </>
  );
};

const mapStateToProps = (state) => {
  const {
    gists: { logged_in },
  } = state;
  return { logged_in };
};
const mapDispatchToProps = {
  loginUser: setLoggedInState,
  getList: fetchGistList,
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));

// class Header extends Component {
//   constructor(props) {
//     super(props);
//     this.
//   }

//   render() {
//     const { logged_in } = this.props;
//     return (

//     );
//   }
// }
