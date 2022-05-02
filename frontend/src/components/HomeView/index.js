import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import SingleSong from "../SingleSong";
import SwarmPlayer from "../SwarmPlayer";

function HomeView() {
  const sessionUser = useSelector((state) => state.session.user);
  const songs = useSelector((state) => state.songs);
  return (
    <>
      <SwarmPlayer />
      <ul>
          {Object.values(songs).map(song => {
              return (
                  <SingleSong song={song} key={song.id} />
              )
          })}
      </ul>
    </>
  );
}

export default HomeView;
