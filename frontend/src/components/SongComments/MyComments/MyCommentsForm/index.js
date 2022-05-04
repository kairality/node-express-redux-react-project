import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import SingleSongComment from "../../SingleSongComment";
import DeleteComment from "./DeleteComment";

function MyCommentsForm({ song }) {
  const sessionUser = useSelector((state) => state.session.user);
  const songComments = useSelector((state) => state.songComments.comments);
  const playbackTime = useSelector((state) => state.playback.timestamp);
  const handleFilter = (comment) => comment.userId = sessionUser.id;
  const filteredComments = Object.values(songComments).filter((comment) =>
    handleFilter(comment)
  );
  return (
    <div className="myComments">
      <ul className="songCommentsContainer">
        {Object.values(filteredComments).map((comment) => {
          console.log(comment);
          return (
            <div className="commentDelete" key={comment.id}>
              <SingleSongComment
                song={song}
                comment={comment}
              />
              <DeleteComment comment={comment} />
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default MyCommentsForm;
