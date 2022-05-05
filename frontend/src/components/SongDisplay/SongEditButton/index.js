import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';

import { Modal } from "../../../context/Modal";

import EditSongForm from "../EditSongForm"

export default function SongEditButton({ song }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentSong = useSelector((state) => state.currentSong);
  const [showModal, setShowModal] = useState(false);
  const thisIsCurrentSong = song.id === currentSong.id;

    return (
      <>
        <button className="songEditButton" onClick={() => setShowModal(true)}>Edit Song</button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <EditSongForm song={song} setShowModal={setShowModal}/>
          </Modal>
        )}
      </>
    );
}
