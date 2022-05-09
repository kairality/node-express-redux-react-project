// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../store/session";
import { useHistory } from "react-router-dom";
import { genSongs } from "../../../store/song";

import defaultAvatar from "../../../images/default_album.png";

import "./ProfileButton.css"
import { setCurrentSong } from "../../../store/currentSong";

function ProfileButton({ user }) {

  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logoutUser());
    await dispatch(setCurrentSong({}));
    await dispatch(genSongs({}));
    history.push("/");
  };

  return (
    <>
      <div className="profile-top" onClick={openMenu}>
        <div className="profileControls">
          <img className="avatar" src={defaultAvatar} />
          <span className="userInfo">{user?.username}</span>
          <i className="fa-solid fa-circle-chevron-down"></i>
        </div>
        {showMenu && (
          <ul className="profile-dropdown">
            <li>
              <button onClick={handleLogout}>
                <i className="fa-solid fa-person-through-window"></i>
                <span>Log Out</span>
              </button>
            </li>
          </ul>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
