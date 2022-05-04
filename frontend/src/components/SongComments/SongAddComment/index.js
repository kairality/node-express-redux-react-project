import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { makeComment } from '../../../store/songComments';


function SongAddComment({song}) {
  const sessionUser = useSelector((state) => state.session.user);
  const playbackTimestamp = useSelector((state) => state.playback.timestamp);
  const [body, setBody] = useState("");
  const [songTimestamp, setSongTimestamp] = useState(0);
  const [frozen, setFrozen] = useState(false);
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = [];
    const data = {
        userId: sessionUser.id,
        songId: song.id,
        body,
        songTimestamp,
     };
     const comment = await dispatch(makeComment(data));
     setBody("");
     setFrozen(false);
  };

  useEffect(() => {
      if(!frozen) {
          setSongTimestamp(Math.floor(playbackTimestamp));
      }
  },[playbackTimestamp])

  const handleFocus = (e) => {
      setFrozen(true);
  }

  return (
    <div>
      <form
        style={{ display: "flex", flexFlow: "row" }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="body">Comment at: {songTimestamp} seconds</label>
        <input
            type="text"
            name="body"
            placeholder="Leave a comment... "
            value={body}
            onChange={(e) => setBody(e.target.value)}
            onFocus={(e) => setFrozen(true)}
            onBlur={(e) => setFrozen(body !== "")}
        />
        <button type="submit">Comment</button>
      </form>
    </div>
  );
}

export default SongAddComment;
