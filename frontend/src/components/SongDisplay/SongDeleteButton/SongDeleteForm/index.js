import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeCurrentSong } from "../../../../store/currentSong";
import { deleteSong } from "../../../../store/song";

export default function SongDeleteForm({song, setShowModal}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentSong = useSelector((state) => state.currentSong);
  const thisIsCurrentSong = song.id === currentSong.id;

  const handleDelete = (e) => {
    e.stopPropagation();
    if (thisIsCurrentSong) {
      dispatch(removeCurrentSong());
    }
    dispatch(deleteSong(song));
    setShowModal(false);
    history.push("/songs");
  };

  return (
    <div classname="deleteForm">
      <h3>Delete Song?</h3>
      <button onClick={handleDelete}>Confirm Delete</button>
    </div>
  );
}
