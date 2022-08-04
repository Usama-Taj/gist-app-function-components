import Message from "components/Message/Message";
import NotAuthorized from "pages/NotAuthorized/NotAuthorized";
import React from "react";
import { useSelector } from "react-redux";

export function withAuth(Component) {
  return function ComponentWithReduxState(props) {
    const PUBLIC_PATHS = ["", "gist-view", "search", "login"];
    const logged_in =
      JSON.parse(localStorage.getItem("gist_app"))?.logged_in || false;
    const {
      router: { location },
    } = props;
    if (!logged_in && !PUBLIC_PATHS.includes(location.pathname.split("/")[1])) {
      return <NotAuthorized />;
    } else if (logged_in && location.pathname === "/login") {
      return (
        <Message title="Oops!" message="seems like you are already logged in" />
      );
    } else {
      return <Component {...props} />;
    }
  };
}
