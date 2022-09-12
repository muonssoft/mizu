import React, { useEffect, useState } from "react";
import { Table, message, Space, Switch } from "antd";
import Add from "../components/Add.jsx";
import { useHistory } from "react-router-dom";
import { getColection } from "../firebase/fireStore";
import TableNew from "../components/newQoutation/TableNew";

const Client = () => {
  let history = useHistory();
  const [clients, setClients] = useState("");
  console.log(clients);
  const data = async () => {
    const res = await getColection("Client");
    const filtro = res.map((item) => item.data);
    setClients(filtro);
    if (res.isError) {
      message.error(res.message);
    }
  };
  useEffect(() => {
    data();
  }, []);

  const colums = [
    {
      title: "Cliente",
      dataIndex: "client",
      key: "client",
    },
    {
      title: "Nit/Cédula",
      dataIndex: "nit",
      key: "nit",
    },
    {
      title: "Dirección",
      dataIndex: "adress",
      key: "adress",
    },
    {
      title: "Ciudad",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Teléfono",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Contacto",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Cargo",
      dataIndex: "job",
      key: "job",
    },
    {
      title: "Correo",
      dataIndex: "email",
      key: "email",
    },
  ];

  return (
    <div>
      <Add
        title="Nuevo cliente"
        link={() => {
          history.push("/newClient");
        }}
      />
      <div>
        <br />
      </div>
      <Table columns={colums} dataSource={clients} />
    </div>
  );
};

export default Client;
