import React, { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useSelector } from "react-redux";
import { uploadSong } from "../../../store/song";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import "./SongUpload.css";
import { setCurrentSong } from "../../../store/currentSong";

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
function SongUploader({ setShowModal }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [privPublic, setPrivPublic] = useState(true);
  const [errors, setErrors] = useState([]);
  const [disabledUploading, setDisabledUploading] = useState(false);

  const history = useHistory();

  const typeArea = (
    <span className="fileTypes">Accepted Types: {fileTypes.join(", ")}</span>
  );

  const dropArea = (
    <div className="dropArea">
      <i class="fa-solid fa-file-arrow-up iEmpty"></i>
      <span>Drag & Drop or Click to Select a File</span>
      {typeArea}
    </div>
  );

  const dropAreaErrored = (
    <div className="dropArea ">
      <i class="fa-solid fa-file-circle-xmark iError"></i>
      <span className="fileError">Unable to upload that file.</span>
      {typeArea}
    </div>
  );

  const [dropChild, setDropChild] = useState(dropArea);

  const handleChange = (file) => {
    setFile(file);
    setErrors([]);
    if (!title) {
      const tentativeTitle = file.name.split(".").slice(0, -1).join(".");
      setTitle(tentativeTitle);
    }
  };

  useEffect(() => {
    const dropAreaFilled = (
      <div className="dropArea">
        <i class="fa-solid fa-file-circle-check iFilled"></i>
        <span className="fileName">{file?.name}</span>
      </div>
    );
    if (file) {
      setDropChild(dropAreaFilled);
    }
  }, [file, title]);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = [];
    if (!file) {
      newErrors.push(
        "Sorry, only famous American composer John Cage can get away with an empty song"
      );
      return setErrors(newErrors);
    }

    const userId = sessionUser.id;
    setDisabledUploading(true);
    const song = await dispatch(
      uploadSong({ userId, title, privPublic, file })
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
    if (song && errors.length === 0) {
      setShowModal(false);
      // dispatch(setCurrentSong(song));
      history.push(`/songs/${song.id}`);
    }
  };

  const handleTypeError = (e) => {
    const newErrors = [
      ...errors,
      "That file extension is not audio or it's too hip for us!",
    ];
    setErrors(newErrors);
    setDropChild(dropAreaErrored);
    setFile(null);
    return "That file extension is not audio or it's too hip for us!";
  };

  return (
    <div>
      <form className="songUploadForm" onSubmit={handleSubmit}>
        <h1>Upload a song to the swarm!</h1>
        <div className="formGroup">
          <label htmlFor="title">Title of your masterpiece</label>
          <input
            id="songTitleInput"
            type="text"
            name="title"
            placeholder="Enter a song title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="privPublic">Make it Private? </label>
          <input
            className="songPrivateCheckbox"
            type="checkbox"
            name="privPublic"
            value={!privPublic}
            checked={!privPublic}
            onChange={() => setPrivPublic((prev) => !prev)}
          />
        </div>
        <div className="formGroup">
          <FileUploader
            children={[dropChild]}
            className="newSong"
            onTypeError={handleTypeError}
            handleChange={handleChange}
            name="file"
            types={fileTypes}
          />
        </div>
        <button disabled={disabledUploading} type="submit">
          {disabledUploading ? "Uploading ..." : "Upload to the Swarm"}
        </button>
      </form>
      <ul class="uploadErrors">
        {errors.length > 0 &&
          errors.map((error) => <li key={error}>{error}</li>)}
      </ul>
    </div>
  );
}

export default SongUploader;
