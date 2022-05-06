import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { makeComment } from '../../../store/songComments';


function SongAddComment({song}) {
  const sessionUser = useSelector((state) => state.session.user);
  const playbackTimestamp = useSelector((state) => state.playback.timestamp);
  const currentSongId = useSelector((state) => state.currentSong?.id);
  const [body, setBody] = useState("");
  const [songTimestamp, setSongTimestamp] = useState(0);
  const [frozen, setFrozen] = useState(false);
  const [errors, setErrors] = useState([]);

  const isCurrentSong = currentSongId === song?.id;
  const shouldFreeze = !isCurrentSong || body !== "";

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const data = {
        userId: sessionUser.id,
        songId: song.id,
        body,
        songTimestamp,
     };
     if (data && data.errors) {
         setErrors(data.errors);
         return;
     }
     const comment = await dispatch(makeComment(data));
     setBody("");
     setFrozen(false);
  };


  useEffect(() =>
    {
      if (!frozen) {
          setSongTimestamp(Math.floor(playbackTimestamp));
      }
      if (!isCurrentSong) {
          setSongTimestamp(0);
      }
  },[playbackTimestamp, frozen, isCurrentSong])

  const handleFocus = (e) => {
      setFrozen(true);
  }

  return (
    <form className="commentAddForm" onSubmit={handleSubmit}>
      <div className="commentsInput">
        <input
          type="text"
          name="body"
          placeholder="Leave a comment... "
          value={body}
          onChange={(e) => setBody(e.target.value)}
          onFocus={(e) => setFrozen(true)}
          onBlur={(e) => setFrozen(shouldFreeze)}
        />
        <button type="submit">Comment</button>
      </div>
      <label className="ticker" htmlFor="body">
        Comment at: {songTimestamp} seconds
      </label>
    </form>
  );
}

export default SongAddComment;
