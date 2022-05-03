import React, {useState, useEffect} from 'react';
import defaultImg from "../../../../images/default_album.png";
import { FileUploader } from 'react-drag-drop-files';



export default function ImagePicker({song, setImgFile}) {
    const [image, setImage] = useState(null);
    const [previewImg, setPreviewImg] = useState(song.imgSrc ?? defaultImg);

    const types = ["JPG", "JPEG", "PNG", "GIF"];


    useEffect(() => {
       console.log(image);
       if (image) {
            const imgURL = URL.createObjectURL(image);
            setPreviewImg(imgURL);
            setImgFile(image);
       }
    },[image])


    return (
      <>
        <FileUploader
          className="setSongImg"
          handleChange={(file) => setImage(file)}
          name="imgFile"
          types={types}
        />
        <img src={previewImg} />
      </>
    );
}
