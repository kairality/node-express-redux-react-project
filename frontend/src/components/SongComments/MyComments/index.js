import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { Modal } from "../../../context/Modal";

import MyCommentsForm from "./MyCommentsForm";

export default function MyComments({ song }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>My Comments</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <MyCommentsForm setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}
