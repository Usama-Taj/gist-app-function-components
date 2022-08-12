import { withAuth } from "hoc/withAuth";
import { withRouter } from "hoc/withRouter";
import React, { useCallback, useContext } from "react";
import {
  GridCenter,
  GridTitle,
  ShadowGridItem,
} from "shared-styles/Grid.styles";
import { TextField, TextFieldContainer } from "./Login.styles";
import { EnterOutlined, KeyOutlined, UserOutlined } from "@ant-design/icons";
import Button from "components/common/Button/Button";
import { setLoggedInState } from "context/gists/actions";
import { GistContext } from "context/gists";

const Login = ({ router }) => {
  // Context API
  const [state, dispatch] = useContext(GistContext);

  // Functions
  const handleLogin = useCallback((e) => {
    localStorage.setItem("gist_app", JSON.stringify({ logged_in: true }));
    dispatch(setLoggedInState(true));
    router.navigate("/");
    e.preventDefault();
  }, []);

  // Rendering
  return (
    <GridCenter>
      <form>
        <ShadowGridItem widthPercent="400">
          <GridTitle remSize="1.5">Login</GridTitle>
          <TextFieldContainer>
            <label htmlFor="username">Username</label>
            <TextField
              prefix={<UserOutlined />}
              type="text"
              placeholder="Username"
              name="username"
              id="username"
            />
          </TextFieldContainer>
          <TextFieldContainer>
            <label htmlFor="password">Password</label>
            <TextField
              prefix={<KeyOutlined />}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
          </TextFieldContainer>
          <TextFieldContainer>
            <Button onClick={handleLogin} block icon={<EnterOutlined />}>
              Login
            </Button>
          </TextFieldContainer>
        </ShadowGridItem>
      </form>
    </GridCenter>
  );
};

export default withRouter(withAuth(Login));
