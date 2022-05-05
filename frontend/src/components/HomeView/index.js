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
  return (
    <Switch>
      <Route path="/songs" exact>
        <ul className="songsList">
          {Object.values(songs).map(song => {
              return (
                  <SingleSong song={song} key={song.id} />
              )
          })}
      </ul>
      </Route>
      <Route path="/songs/:id">
        <SongDisplay />
      </Route>
    </Switch>

  );
}

export default HomeView;
