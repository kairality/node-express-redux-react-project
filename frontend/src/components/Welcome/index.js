import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { useState, useEffect } from 'react';

import "./Welcome.css"
import cicada from "./images/cicada.png";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function Welcome() {

  const sessionUser = useSelector((state) => state.session.user);

  return (
    <>
      {sessionUser && <Redirect to="/songs" />}
      <figure className="splash">
       <img src={cicada} />
        <figcaption className="splashCaption">Catch the buzz on the latest music with SongSwarm</figcaption>
        <div className="splashControl">
          <LoginFormModal />
          <SignupFormModal />
        </div>
      </figure>
    </>
  );
}

export default Welcome;
