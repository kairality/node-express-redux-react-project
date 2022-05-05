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
  const playbackTime = useSelector((state) => state.playback.timestamp);

    const sessionUser = useSelector((state) => state.session.user);
    const currentSongId = useSelector((state) => state.currentSong.id);
    const dispatch = useDispatch();

  // if there is no current song set when we load a song view, go ahead and set it!
  // this will activate the Swarm Player!
  // but, we do let people load up the song view without interrupting the current song playing.
  useEffect(() => {
      if (!currentSongId && song) {
          dispatch(setCurrentSong(song));
      }
  }, [currentSongId, song]);

    // load the song's comments from the database
    useEffect(() => {
      dispatch(genComments(song));
      // running genComments as playback time updates allows people to load new eligible comments
      // from other people listening to the same song at the same time
      // in essence, this is now Twitch chat, may God have mercy on my soul.
    }, [dispatch, song, playbackTime]);

    const comments = useSelector((state) => state.songComments);

    // bail out early if we're here and there's no song for whatever reason
    // doing this now avoids having to deal with a bunch of conditional chaining headaches
    if (!song || !sessionUser) {
      return null;
    }

  const userOwnsSong = sessionUser.id === song.userId;

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
