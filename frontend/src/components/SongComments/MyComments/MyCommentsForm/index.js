import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import SingleSongComment from "../../SingleSongComment";
import DeleteComment from "./DeleteComment";

import "./MyCommentsForm.css";

function MyCommentsForm({ song }) {
  const sessionUser = useSelector((state) => state.session.user);
  const songComments = useSelector((state) => state.songComments.comments);
  const playbackTime = useSelector((state) => state.playback.timestamp);
  const handleFilter = (comment) => comment.userId === sessionUser.id;
  const filteredComments = Object.values(songComments).filter((comment) =>
    handleFilter(comment)
  );
  const placeholder =
    <div className="noComment">
        <h3> You haven't commented on this song!</h3>
    </div>;
  const showPlaceholderOnly = filteredComments.length === 0;
  return (
    <div className="myComments">
      {showPlaceholderOnly ? (
        placeholder
      ) : (
        <ul className="songCommentsContainer">
          {Object.values(filteredComments).map((comment) => {
            return (
              <li className="commentDelete" key={comment.id}>
                <SingleSongComment song={song} comment={comment} />
                <DeleteComment comment={comment} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default MyCommentsForm;
