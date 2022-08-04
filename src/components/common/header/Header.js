import React, { Component } from "react";
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

class Header extends Component {
  constructor(props) {
    super(props);
    this.GITHUB_PROFILE = "https://github.com/Usama-Taj";
  }

  loginUser = (e) => {
    const { router } = this.props;
    router.navigate("/login");
  };

  logoutUser = (e) => {
    const { loginUser } = this.props;
    localStorage.setItem("gist_app", JSON.stringify({ logged_in: false }));
    loginUser(false);
    this.props.router.navigate("/login");
  };

  handleSearchChange = (e) => {
    this.setState({ username: e.target.value });
  };

  handleEnter = (e) => {
    if (e.code === "Enter") {
      const { router } = this.props;
      const { username } = this.state;
      // if(router.location.pathname.split("/")[1] === "profile"){

      // }
      router.navigate(`/search/${username}`);
    }
  };

  displayYourGist = () => {
    const { router } = this.props;
    router.navigate(`/profile/${process.env.USERNAME}`);
  };

  displayStarredGists = () => {
    const { router, getList } = this.props;
    router.navigate("/starred");
  };

  handleAddGist = () => {
    const { router } = this.props;
    router.navigate("/add-gist");
  };

  render() {
    const { logged_in } = this.props;
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
                onChange={this.handleSearchChange}
                onKeyUp={this.handleEnter}
              />

              {!logged_in ? (
                <button onClick={this.loginUser}>Login</button>
              ) : (
                <MenuBar>
                  <UserImage src={avatar} alt="UserImage" />
                  <UserMenu className="content">
                    <MenuItem>Signed in as</MenuItem>
                    <MenuItem>Usama Taj</MenuItem>
                    <MenuItem clickable onClick={this.displayYourGist}>
                      Your Gists
                    </MenuItem>
                    <MenuItem clickable onClick={this.displayStarredGists}>
                      Starred Gists
                    </MenuItem>
                    <MenuItem clickable onClick={this.handleAddGist}>
                      Add Gist
                    </MenuItem>
                    <hr />
                    <MenuItem clickable>
                      <a href={this.GITHUB_PROFILE} target="_blank">
                        Your Github profile
                      </a>
                    </MenuItem>
                    <MenuItem clickable onClick={this.logoutUser}>
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
  }
}
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
