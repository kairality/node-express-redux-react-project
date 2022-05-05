import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { Modal } from "../../context/Modal";

import SongUploader from "./SongUploader";

export default function SongUploadModal() {

  const sessionUser = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);

  if (!sessionUser) {
      return null;
  }

  return (
    <>
      <button onClick={() => setShowModal(true)}>Upload</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SongUploader />
        </Modal>
      )}
    </>
  );
}
