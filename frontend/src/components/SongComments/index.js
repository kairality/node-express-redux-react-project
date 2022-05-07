import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import SingleSongComment from "./SingleSongComment";
import SongAddComment from "./SongAddComment";

import { tsFormat } from "../../utils/timestamputils";

import "./SongComments.css";
import MyComments from "./MyComments";

function SongComments({ song }) {
  const sessionUser = useSelector((state) => state.session.user);
  const songComments = useSelector((state) => state.songComments.comments);
  const playbackTime = useSelector((state) => state.playback.timestamp);
  const currentSong = useSelector((state) => state.currentSong);
  const isCurrentSong = currentSong?.id === song?.id;


  const commentFilter = (comment) => {
    const ts = comment.songTimestamp ?? 0;
    if (!isCurrentSong) {
      return ts < 10;
    }
    return playbackTime >= ts && playbackTime <= ts + 15;
  };
  let filteredComments = Object.values(songComments)
    .filter((comment) => commentFilter(comment))
    .sort((a, b) => b.songTimestamp - a.songTimestamp);
  // if (filteredComments.length > 10) {
  //   const myComments = filteredComments.filter(comment => comment?.userId === sessionUser?.id);
  //   const newComments = filteredComments.filter(comment => Date(comment.createdAt) >= Date.now() - 1000 * 60 * 60);
  //   const filtLength = myComments.length + newComments.length;
  //   const pullComments = filteredComments.slice(0, (12-filtLength));
  //   filteredComments = [...myComments, ...newComments, ...pullComments].sort(
  //     (a, b) => b.songTimestamp - a.songTimestamp
  //   );
  // }
  return (
    <div className="commentMain">
      <div className="commentAdd">
        <SongAddComment song={song} />
      </div>
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
