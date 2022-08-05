import React, { Component } from "react";
import avatar_one from "assets/images/img_avatar2.png";
import {
  ProfileInfo,
  ProfileImage,
  ViewProfileButton,
} from "./ProfileContent.styles";
import { Link } from "react-router-dom";

const ProfileContent = ({ profile: { avatar_url, login, html_url } }) => {
  return (
    <div>
      <ProfileInfo>
        <div>
          <ProfileImage src={avatar_url} alt="user" />
        </div>
        <div>{login}</div>
        <div>
          <a style={{ textDecoration: "none" }} href={html_url} target="_blank">
            <ViewProfileButton>View GitHub Profile</ViewProfileButton>
          </a>
        </div>
      </ProfileInfo>
    </div>
  );
};

export default ProfileContent;
