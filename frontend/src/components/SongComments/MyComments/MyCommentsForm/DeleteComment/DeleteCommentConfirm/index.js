import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../../../../../store/songComments";

export default function DeleteCommentConfirm({ comment }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteComment(comment));
  };

  return (
    <div classname="deleteForm">
      <h3>Delete Comment?</h3>
      <button onClick={handleDelete}>Confirm Delete</button>
    </div>
  );
}
