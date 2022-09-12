import React, { useEffect, useState } from "react";
import { getColection } from "../../firebase/fireStore";

const Firma = () => {
  const [getData, setGetData] = useState([]);
  const getDatos = async () => {
    const res = await getColection("Usuarios");
    setGetData(res);
  };
  useEffect(() => {
    getDatos();
  }, []);
  return (
    <div>
      <div>
        {getData.map((res) => res.data.name)}{" "}
        {getData.map((res) => res.data.lastname)}
      </div>
      <div>{getData.map((res) => res.data.cargo)}</div>
      <div>{getData.map((res) => res.data.email)}</div>
      <div>{getData.map((res) => res.data.phone)}</div>
    </div>
  );
};

export default Firma;
