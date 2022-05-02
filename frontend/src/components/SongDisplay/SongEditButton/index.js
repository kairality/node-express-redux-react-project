import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeCurrentSong } from "../../../store/currentSong";
import { deleteSong } from "../../../store/song";

export default function SongEditButton({ song }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentSong = useSelector((state) => state.currentSong);
  const thisIsCurrentSong = song.id === currentSong.id;

  const handleEdit = (e) => {
    e.stopPropagation();
    console.log("Placeholder");
  };

  return <button onClick={handleEdit}>Edit Song</button>;
}
