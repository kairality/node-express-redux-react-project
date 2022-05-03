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
    let newErrors = [];
    const updateSong = await dispatch(
          editSong(song, {title, privPublic, imgFile}),
        );
        if (updateSong) {
          console.log("success!");
          setShowModal(false);
        }
  };

  return (
    <div className="editSongForm">
      <h1>Edit Song!</h1>
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
        <ImagePicker song={song} setImgFile={setImgFile}/>
        <button type="submit">Update Song</button>
      </form>
    </div>
  );
}
