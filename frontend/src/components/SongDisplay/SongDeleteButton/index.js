import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { Modal } from "../../../context/Modal";

import SongDeleteForm from "./SongDeleteForm";

export default function SongDeleteButton({ song }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className="songDeleteButton" onClick={() => setShowModal(true)}>Delete Song</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SongDeleteForm song={song} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}
