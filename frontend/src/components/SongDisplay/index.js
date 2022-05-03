import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import defaultImg from "../../images/default_album.png";
  import { deleteSong } from "../../store/song";
import SongDeleteButton from "./SongDeleteButton";
import SongEditButton from "./SongEditButton";

function SongDisplay() {
  const { id } = useParams();
  const song = useSelector((state) => state.songs[id]);
  const sessionUser = useSelector((state) => state.session.user);

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
      <img src={imgSrc ?? defaultImg} />
      {title}
      {username}
      {userOwnsSong && <SongDeleteButton song={song} />}
      {userOwnsSong && <SongEditButton song={song} />}
    </div>
  );
}

export default SongDisplay;
