import React, { useContext, useEffect } from "react";
import Add from "../components/Add";
import { useHistory } from "react-router-dom";
import { contextApp } from "../firebase/context";
const Inicio = () => {
  let history = useHistory();
  const { usuario } = useContext(contextApp);
  useEffect(() => {
    if (usuario === null) {
      history.push("/login");
      window.location.reload(true);
    }
  }, [history, usuario]);
  return (
    <div>
      <Add
        title="Nueva cotización"
        link={() => {
          history.push("/newCotizacion");
        }}
      />
    </div>
  );
};

export default Inicio;
