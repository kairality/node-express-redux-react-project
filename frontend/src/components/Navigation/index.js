import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import SongUploadModal from "../SongUploadModal";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

import logo from "./images/navbarlogo.png";

function Navigation({isLoaded}) {
  const sessionUser = useSelector((state) => state.session.user);
  const loggedOut = !sessionUser;

  let sessionLinks;
  if (!loggedOut) {
    sessionLinks = [
      <SongUploadModal key="signup" />,
      <ProfileButton key="profile" user={sessionUser} />,
    ]
  } else {
    sessionLinks = [
        <LoginFormModal key="login"/>,
        <SignupFormModal key="signup"/>
    ];

  }

  return (
    <nav>
      <ul className={loggedOut ? "loggedOutNav" : ""}>
        <li key="logo">
          <img className="navbarLogo" src={logo} />
        </li>
        <li key="home">
          <NavLink className="homeButton" exact to="/">
            Home
          </NavLink>
        </li>
        {isLoaded && sessionLinks}
      </ul>
    </nav>
  );
}

export default Navigation;
