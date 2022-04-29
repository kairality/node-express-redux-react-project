import {Route, Switch} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { useState, useEffect } from 'react';
import { sessionRestoreUser } from './store/session';

import Navigation from './components/Navigation';
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from './components/SignUpFormPage';

function App() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      dispatch(sessionRestoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

  return (
    isLoaded && (
      <>
        <Navigation isLoaded={isLoaded} />
        <h1>Hello from application</h1>
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      </>
    )
  );
}

export default App;
