import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { Modal } from "../../../../../context/Modal";

import DeleteCommentConfirm from "./DeleteCommentConfirm";

export default function DeleteComment({ comment }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Delete Song</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteCommentConfirm comment={comment} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}
