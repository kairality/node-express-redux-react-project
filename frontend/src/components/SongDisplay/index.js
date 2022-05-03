import { useParams } from "react-router-dom";
import { useDispatch, useSelector, useTypedSelector } from "react-redux";
import { useState, useEffect } from "react";
import defaultImg from "../../images/default_album.png";
import { setCurrentSong } from "../../store/currentSong";
import SongDeleteButton from "./SongDeleteButton";
import SongEditButton from "./SongEditButton";

import "./SongDisplay.css"

function SongDisplay() {
  const { id } = useParams();
  const song = useSelector((state) => state.songs[id]);

    const sessionUser = useSelector((state) => state.session.user);
    const currentSongId = useSelector((state) => state.currentSong.id);
    console.log(currentSongId);
    const dispatch = useDispatch();

  useEffect(() => {
      if (!currentSongId && song) {
          dispatch(setCurrentSong(song));
      }
  }, [currentSongId, song]);

    if (!song) {
      return null;
    }

  const userOwnsSong = sessionUser?.id === song?.userId;

   const {
     title,
     imgSrc,
     User: { username },
   } = song;

  return (
    <div className="songDisplay">
      <img src={imgSrc ?? defaultImg} onClick={() => dispatch(setCurrentSong(song))}/>
      <div className="songDisplayDetails">
        <h2>{title}</h2>
        <h3>{username}</h3>
        <div className="songDisplayControls">
          {userOwnsSong && <SongDeleteButton song={song} />}
          {userOwnsSong && <SongEditButton song={song} />}
        </div>
      </div>
    </div>
  );
}

export default SongDisplay;
