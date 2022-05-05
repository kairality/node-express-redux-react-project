import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import defaultAvatar from "../../../images/default_avatar.png";

import { tsFormat } from "../../../utils/timestamputils";

import "./SingleSongComment.css";

function SingleSongComment({ song, comment }) {
  const sessionUser = useSelector((state) => state.session.user);
  const ts = comment.songTimestamp;
  return (
    <div className={`singleSongComment`}>
      <img className="commentAvatar" src={defaultAvatar} />
      <div className="songCommentDetails">
        <div className="songCommentHead">
          <h3>{comment?.User?.username}</h3>
          <span className={`songCommentTs${ts ? "" : " hidden"}`}>
            {ts < 60 ? `at ${ts} seconds` : tsFormat(ts)}
          </span>
        </div>
        {comment?.body}
      </div>
    </div>
  );
}

export default SingleSongComment;
