import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import SingleSongComment from "./SingleSongComment"
import SongAddComment from "./SongAddComment";

import "./SongComments.css"


function SongComments({song}) {
  const sessionUser = useSelector((state) => state.session.user);
  const songComments = useSelector((state) => state.songComments.comments);
  const playbackTime = useSelector((state) => state.playback.timestamp);
  const handleFilter = (comment) => {
      const ts = comment.songTimestamp ?? 0;
      return playbackTime >= ts && playbackTime <= ts + 15;
  }
  const filteredComments = songComments.filter(comment => handleFilter(comment));
  return (
    <div className="commentMain">
      <SongAddComment />
      <ul className="songCommentsContainer">
        {Object.values(filteredComments).map((comment) => {
          return (
            <SingleSongComment song={song} key={comment.id} comment={comment} />
          );
        })}
      </ul>
    </div>
  );
}

export default SongComments;
