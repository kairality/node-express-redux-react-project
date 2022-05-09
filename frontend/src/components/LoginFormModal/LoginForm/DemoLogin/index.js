import React, { useState, useEffect } from "react";
import { loginUser } from "../../../../store/session";
import { useDispatch } from "react-redux";

export default function DemoLogin({ setErrors }) {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);

  // this is here due to past issues with classmates being trolls
  // during presentation time.
  useEffect(() => {
    const demoSetting = process.env.REACT_APP_DEMO_LOGIN_ENABLED;
    if (demoSetting === "false") {
      setDisabled(true);
      setErrors([
        "Demo Login is currently disabled by the site administrator!",
      ]);
    }
  }, [setDisabled, setErrors]);

  const demoLogin = (e) => {
    e.preventDefault();
    setErrors([]);
    const credential = process.env.REACT_APP_DEMO_USER;
    const password = process.env.REACT_APP_DEMO_USER_PW;
    return dispatch(loginUser({ credential, password })).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  return (
    <button className="demoLogin" disabled={disabled} onClick={demoLogin}>
      Demo Login
    </button>
  );
}
