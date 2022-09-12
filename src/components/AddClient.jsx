import React, { useState } from "react";
import { Form, Input, Button, message, InputNumber } from "antd";
import ButtonAdd from "../components/ButtonAdd";
import { createSet, getColection } from "../firebase/fireStore";
import { generarId } from "../utils/generarld";
import { useHistory } from "react-router-dom";

const AddClient = () => {
  let history = useHistory();
  const newClient = async (values) => {
    const { client, nit, adress, city, phone, contact, job, email } = values;
    const response = await getColection("Client");
    const getdata = response.filter(
      (item) => item.data.client === client || item.data.nit === nit
    );
    if (getdata.length > 0) {
      message.error("El cliente ya esta creado");
    } else {
      const res = await createSet(
        "Client",
        { client, nit, adress, city, phone, contact, job, email },
        generarId()
      );
      message.success("Cliente creado");
      history.push("/clientes");
      if (res.isError) {
        message.error(res.message);
      }
    }
  };

  const data = (value) => {
    console.log(value);
  };
  return (
    <div>
      <Form layout="vertical" onFinish={newClient}>
        <Form.Item
          name="client"
          label="Cliente"
          rules={[
            {
              required: true,
              message: "Ingrese nombre de cliente!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="nit"
          label="Nit / Cédula"
          rules={[
            {
              required: true,
              message: "Ingrese Nit sin número de verificación!",
            },
          ]}
        >
          <InputNumber
            style={{
              width: "100%",
              borderRadius: 5,
            }}
          />
        </Form.Item>
        <Form.Item
          name="adress"
          label="Dirección"
          rules={[{ required: true, message: "Ingrese dirección!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="city"
          label="Ciudad"
          rules={[{ required: true, message: "Ingrese ciudad!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Teléfono"
          rules={[
            {
              type: "number",
              required: true,
              message: "Ingrese un número válido!",
            },
          ]}
        >
          <InputNumber
            style={{
              width: "100%",
              borderRadius: 5,
            }}
          />
        </Form.Item>
        <Form.Item
          name="contact"
          label="Nombre de contacto"
          rules={[
            {
              required: true,
              message: "Ingrese nombre de contacto!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="job"
          label="Cargo"
          rules={[
            {
              required: true,
              message: "Ingrese cargo!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="aligin-center"
          label="Correo"
          name="email"
          rules={[
            {
              type: "email",

              required: true,
              message: "Ingrese correo válido!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ marginRight: 10 }}
          >
            Guardar
          </Button>
          <Button
            type="primary"
            className="login-form-button"
            style={{ marginRight: 10 }}
            onClick={() => history.push("/clientes")}
          >
            Volver
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddClient;
