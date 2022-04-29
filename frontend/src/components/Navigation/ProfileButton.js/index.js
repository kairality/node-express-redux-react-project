// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../store/session";

function ProfileButton({ user }) {

  const dispatch = useDispatch();
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

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  return (
    <>
      <button onClick={openMenu}>
        <i class="fa-solid fa-address-card"></i>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={handleLogout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
