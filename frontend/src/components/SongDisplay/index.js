import { useParams } from "react-router-dom";
import { useDispatch, useSelector, useTypedSelector } from "react-redux";
import { useState, useEffect } from "react";
import defaultImg from "../../images/default_album.png";
import { setCurrentSong } from "../../store/currentSong";
import { genComments } from "../../store/songComments";
import SongDeleteButton from "./SongDeleteButton";
import SongEditButton from "./SongEditButton";
import SongComments from "../SongComments";


import "./SongDisplay.css"

function SongDisplay() {
  const { id } = useParams();
  const song = useSelector((state) => state.songs[id]);

    const sessionUser = useSelector((state) => state.session.user);
    const currentSongId = useSelector((state) => state.currentSong.id);
    const dispatch = useDispatch();

  useEffect(() => {
      if (!currentSongId && song) {
          dispatch(setCurrentSong(song));
      }
  }, [currentSongId, song]);

    useEffect(() => {
    dispatch(genComments(song));
    }, [dispatch, song]);

    const comments = useSelector((state) => state.songComments);
    console.log(comments);

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
        <SongComments song={song}/>
        <div className="songDisplayControls">
          {userOwnsSong && <SongDeleteButton song={song} />}
          {userOwnsSong && <SongEditButton song={song} />}
        </div>
      </div>
    </div>
  );
}

export default SongDisplay;
