import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import defaultAvatar from "../../../images/default_avatar.png";

import "./SingleSongComment.css";

function SingleSongComment({ song, comment }) {
  const sessionUser = useSelector((state) => state.session.user);
  return (
    <li className={`singleSongComment`}>
      <img className="commentAvatar" src={defaultAvatar} />
      <div className="songCommentDetails">
        <h3>{comment?.User?.username}</h3>
        {comment?.body}
      </div>
    </li>
  );
}

export default SingleSongComment;
