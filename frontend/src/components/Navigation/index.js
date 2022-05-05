import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import SongUploadModal from "../SongUploadModal";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

import logo from "./images/navbarlogo.png";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = [
      <SongUploadModal />,
      <ProfileButton user={sessionUser} />,
    ]
  } else {
    sessionLinks = [
        <LoginFormModal />,
        <SignupFormModal />
    ];

  }

  return (
    <nav>
      <ul>
        <li>
          <img className="navbarLogo" src={logo} />
        </li>
        <li>
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
