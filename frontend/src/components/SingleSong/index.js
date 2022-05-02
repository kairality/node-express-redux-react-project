import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { setCurrentSong, removeCurrentSong } from "../../store/currentSong";
import { deleteSong } from "../../store/song";

import "./SingleSong.css"

function SingleSong({ song }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const currentSong = useSelector((state) => state.currentSong);
  const thisIsCurrentSong = song.id === currentSong.id;
  const userOwnsSong = sessionUser.id === song.userId;

  const handleDelete = (e) => {
      e.stopPropagation();
      if (thisIsCurrentSong) {
          dispatch(removeCurrentSong());
      }
      dispatch(deleteSong(song));
  }

  return (
    <li className="singleSong"
      onClick={() => dispatch(setCurrentSong(song))}
    >
      <i class="fa-solid fa-circle-play"></i>
      <h3>{song.title}</h3>
      <p>CLick to set current song</p>
      {userOwnsSong && <button onClick={handleDelete}>Delete</button>}
    </li>
  );
}

export default SingleSong;
