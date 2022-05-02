import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { setCurrentSong } from "../../store/currentSong";

import "./SingleSong.css"

function SingleSong({ song }) {
  const dispatch = useDispatch();

  return (
    <li className="singleSong"
      onClick={() => dispatch(setCurrentSong(song))}
    >
      <i class="fa-solid fa-circle-play"></i>
      <h3>{song.title}</h3>
      <p>CLick to set current song</p>
    </li>
  );
}

export default SingleSong;
