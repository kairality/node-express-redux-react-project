import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useState, useEffect } from 'react';

function Welcome() {

  const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
      {sessionUser ? <Redirect to="/songs" /> : <h1>Welcome, please log in or sign up!</h1>}
    </>
  );
}

export default Welcome;
