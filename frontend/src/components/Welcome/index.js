import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useState, useEffect } from 'react';

function Welcome({user}) {

  return (
    <>
      {user ? <Redirect to="/" /> : <h1>Welcome, please log in or sign up!</h1>}
    </>
  );
}

export default Welcome;
