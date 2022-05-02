import {Redirect, Route, Switch} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useState, useEffect } from 'react';
import { sessionRestoreUser } from './store/session';
import { genSongs } from './store/song';

import Navigation from './components/Navigation';
import Welcome from './components/Welcome';
import SongUploader from './components/SongUploader';
import HomeView from './components/HomeView';
import SwarmPlayer from './components/SwarmPlayer';

function App() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);


    useEffect(() => {
      dispatch(sessionRestoreUser()).then(() => setIsLoaded(true));
      dispatch(genSongs());
    }, [dispatch]);

   const sessionUser = useSelector((state) => state.session.user);


  return (
    isLoaded && (
      <>
        <Navigation isLoaded={isLoaded} />
        <Switch>
          <Route path="/welcome">
            <Welcome user={sessionUser} />
          </Route>
          <Route path="/songs">
            {sessionUser ?  <></>: <Redirect to="/welcome" />}
            <h1>Welcome, {sessionUser?.username}</h1>
            <SongUploader />
            <HomeView />
          </Route>
        </Switch>
        {sessionUser ? <SwarmPlayer /> : <></>}
      </>
    )
  );
}

export default App;
