import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useImperativeHandle } from "react";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import "./SwarmPlayer.css";

function SwarmPlayer() {
  const currentSong = useSelector((state) => state.currentSong);

  const audioList = [
      {name: currentSong.title,
        singer: currentSong.userId,
        musicSrc: currentSong.src,
      },
  ];

  return (
    <div className="swarmPlayer">
      <AudioPlayer
        autoPlay
        src={currentSong.src}
        onPlay={(e) => console.log("onPlay")}
      />
    </div>
  );
}

export default SwarmPlayer
