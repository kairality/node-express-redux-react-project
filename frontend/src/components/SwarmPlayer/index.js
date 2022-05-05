import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useImperativeHandle } from "react";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { setTimestamp, resetTimestamp, tickTimestamp } from "../../store/playback";

import SingleSong from "../SingleSong";

import "./SwarmPlayer.css";

function SwarmPlayer() {
  const currentSong = useSelector((state) => state.currentSong);
  const dispatch = useDispatch();

  if(!currentSong.id) {
    return null;
  }

  const audioList = [
      {name: currentSong.title,
        singer: currentSong.userId,
        musicSrc: currentSong.src,
      },
  ];

  const startPlaying = (e) => {
    dispatch(resetTimestamp());
  }

  const whileListening = (e) => {
    dispatch(setTimestamp(e.target.currentTime));
  }

  const afterSeeking = (e) => {
    dispatch(setTimestamp(e.target.currentTime));
  }

  return (
    <div className="swarmPlayer">
      <AudioPlayer
        autoPlay
        src={currentSong.src}
        onPlay={startPlaying}
        onListen={whileListening}
        onSeeked={afterSeeking}
        customAdditionalControls={[<SingleSong song={currentSong} size={"small"} />]}
      />
    </div>
  );
}

export default SwarmPlayer
