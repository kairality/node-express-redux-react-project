import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { editSong } from "../../../store/song";
import ImagePicker from "./ImagePicker";

import "./EditSongForm.css";

export default function EditSongForm({song, setShowModal}) {
  const sessionUser = useSelector((state) => state.session.user);
  const [imgFile, setImgFile] = useState(null);
  const [title, setTitle] = useState(song?.title)
  const [privPublic, setPrivPublic] = useState(song?.public);
  const [errors, setErrors] = useState([]);

  const handleChange = (file) => {
    setImgFile(file);
  };

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const updateSong = await dispatch(
      editSong(song, { title, privPublic, imgFile })
    ).catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
      if (updateSong && errors.length === 0) {
        setShowModal(false);
      }
  };

  return (
    <div className="editSongForm">
      <form className="songUploadForm" onSubmit={handleSubmit}>
        <h1>Edit Song!</h1>
        <div className="formGroup">
          <label htmlFor="title">Change your song's title:</label>
          <input
            id="editSongTitleInput"
            type="text"
            name="title"
            placeholder="Title"
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
        <ImagePicker song={song} setImgFile={setImgFile} />
        <button type="submit">Update Song</button>
      </form>
      {errors.length > 0 &&
        errors.map((error) => <div key={error}>{error}</div>)}
    </div>
  );
}
