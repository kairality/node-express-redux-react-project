import {Redirect, Route, Switch} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useState, useEffect } from 'react';
import { sessionRestoreUser } from './store/session';

import Navigation from './components/Navigation';
import Welcome from './components/Welcome';
import SongUploader from './components/SongUploader';

function App() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);


    useEffect(() => {
      dispatch(sessionRestoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    const sessionUser = useSelector((state) => state.session.user);

    console.log(sessionUser);



  return (
    isLoaded && (
      <>
        <Navigation isLoaded={isLoaded} />
        <Switch>
          <Route path="/welcome">
            <Welcome user={sessionUser} />
          </Route>
          <Route path="/" exact>
            {sessionUser ?  <></>: <Redirect to="/welcome" />}
            <h1>Welcome, {sessionUser?.username}</h1>
            <SongUploader />
          </Route>
        </Switch>
      </>
    )
  );
}

export default App;
