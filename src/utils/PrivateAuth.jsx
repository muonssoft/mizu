import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { contextApp } from "../firebase/context";

const PrivateAuth = () => {
  let history = useHistory();
  const { usuario } = useContext(contextApp);
  useEffect(() => {
    if (usuario === null) {
      history.push("/login");
      window.location.reload(true);
    }
  }, [history, usuario]);
};

export default PrivateAuth;
