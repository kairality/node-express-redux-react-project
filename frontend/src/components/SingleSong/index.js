import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { setCurrentSong, removeCurrentSong } from "../../store/currentSong";
import defaultImg from "../../images/default_album.png";

import "./SingleSong.css"

function SingleSong({ song }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const currentSong = useSelector((state) => state.currentSong);
  const thisIsCurrentSong = song.id === currentSong.id;
  const userOwnsSong = sessionUser.id === song.userId;
  const [isLoading, setIsLoading] = useState(true);



  const {title, imgSrc} = song;
  const songUser = song?.User;
  const username = songUser?.username;

  return (
    <li
      className="singleSong"
      onClick={() => {
        dispatch(setCurrentSong(song));
        history.push(`/songs/${song.id}`);
      }}
    >
      <img className="songTileImg" src={song.imgSrc ?? defaultImg} />
      <div className="songTileDetail">
        <h3>{title}</h3>
        <p>{username}</p>
      </div>
    </li>
  );
}

export default SingleSong;
