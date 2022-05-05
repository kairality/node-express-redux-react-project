import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useSelector } from "react-redux";
import { uploadSong } from "../../../store/song";
import {useDispatch} from 'react-redux';

const fileTypes = [
  "WAV",
  "FLAC",
  "AIFF",
  "ALAC",
  "OGG",
  "MP3",
  "AAC",
  "AMR",
  "WMA",
];
function SongUploader() {
  const sessionUser = useSelector((state) => state.session.user);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [privPublic, setPrivPublic] = useState(true);
  const [errors, setErrors] = useState([]);

  const handleChange = (file) => {
    setFile(file);
  };

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = [];
    const userId = sessionUser.id;
    const song = await dispatch(uploadSong({ userId, title, privPublic, file }));
  };

  return (
    <div>
      <h1>Upload a song to the swarm!</h1>
      {errors.length > 0 &&
        errors.map((error) => <div key={error}>{error}</div>)}
      <form
        style={{ display: "flex", flexFlow: "column" }}
        onSubmit={handleSubmit}
      >
        <label>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Make Private?
          <input
            type="checkbox"
            value={!privPublic}
            checked={!privPublic}
            onChange={() => setPrivPublic((prev) => !prev)}
          />
        </label>
        <label>
          <FileUploader
            className="newSong"
            handleChange={handleChange}
            name="file"
            types={fileTypes}
          />
        </label>
        <button type="submit">Upload Song</button>
      </form>
    </div>
  );
}

export default SongUploader;
