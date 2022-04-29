import {Redirect, Route, Switch} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useState, useEffect } from 'react';
import { sessionRestoreUser } from './store/session';

import Navigation from './components/Navigation';
import Welcome from './components/Welcome';

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
            {sessionUser ? <h1>Welcome, {sessionUser.username}</h1> : <Redirect to="/welcome" />}
          </Route>
        </Switch>
      </>
    )
  );
}

export default App;
