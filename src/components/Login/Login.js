import { withAuth } from "hoc/withAuth";
import { withRouter } from "hoc/withRouter";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  GridCenter,
  GridTitle,
  ShadowGridItem,
} from "shared-styles/Grid.styles";
import { setLoggedInState } from "redux-state/gists/actions";
import { TextField } from "./Login.styles";

const Login = ({ loginUser, router }) => {
  const handleSubmit = (e) => {
    localStorage.setItem("gist_app", JSON.stringify({ logged_in: true }));
    loginUser(true);
    router.navigate("/");
    e.preventDefault();
  };

  return (
    <GridCenter>
      <form onSubmit={handleSubmit}>
        <ShadowGridItem widthPercent="400">
          <GridTitle remSize="1.5">Login</GridTitle>
          <TextField>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Username"
              name="username"
              id="username"
              required
            />
          </TextField>
          <TextField>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              required
            />
          </TextField>
          <TextField>
            <input type="submit" value="Password" />
          </TextField>
        </ShadowGridItem>
      </form>
    </GridCenter>
  );
};

const mapDispatchToProps = {
  loginUser: setLoggedInState,
};

const mapStateToProps = (state) => {
  const {
    gists: { logged_in },
  } = state;
  return { logged_in };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(withAuth(Login)));
