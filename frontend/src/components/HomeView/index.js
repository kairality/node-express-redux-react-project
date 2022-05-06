import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import SingleSong from "../SingleSong";
import SwarmPlayer from "../SwarmPlayer";
import SongDisplay from "../SongDisplay";

import "./HomeView.css"

function HomeView() {
  const sessionUser = useSelector((state) => state.session.user);
  const songs = useSelector((state) => state.songs);
  const currentSong = useSelector((state) => state.currentSong);
  console.log(currentSong.id && "hello");
  return (
    <Switch>
      <Route path="/songs" exact>
        <div className="alsoCrying" />
        <div className="wrapper">
          <h1>All Songs</h1>
          <ul className="songsList">
            {Object.values(songs).map((song) => {
              return <SingleSong song={song} key={song.id} />;
            })}
          </ul>
        </div>
        <div className="crying" />
      </Route>
      <Route path="/songs/:id">
        <div className="alsoCrying" />
        <div className="wrapper">
          <SongDisplay />
        </div>
        <div className="crying" />
      </Route>
    </Switch>
  );
}

export default HomeView;
