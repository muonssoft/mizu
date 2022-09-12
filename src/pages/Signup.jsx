import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { withRouter } from "react-router";
import { socialLogin, UserRegister } from "../firebase/auth";
import Cargando from "../components/Cargando";
import { GoogleOutlined } from "@ant-design/icons";
import FirebaseApp from "../firebase/context";

const Signup = ({ setsignup, history }) => {
    const googleAuthProvider = new FirebaseApp.auth.GoogleAuthProvider();
  const [loading, setLoading] = useState(false);
  const handleSignUp = async (values) => {
    setLoading(true);
    const { email, password, name, lastname } = values;
    const res = await UserRegister({ email, password, name, lastname });
    if (res.isError) {
      message.error(res.message);
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <Form className="login-form" onFinish={handleSignUp}>
      <Form.Item>
        <h1>Registro</h1>
      </Form.Item>
      {loading && <Cargando />}
      <Form.Item
        className="aligin-center"
        label="Nombre"
        name="name"
        rules={[
          {
            required: true,
            message: "Por favor ingrese su nombre!",
          },
        ]}
      >
        <Input placeholder="Nombre" />
      </Form.Item>
      <Form.Item
        className="aligin-center"
        label="Apellido"
        name="lastname"
        rules={[
          {
            required: true,
            message: "Por favor ingrese su apellido!",
          },
        ]}
      >
        <Input placeholder="Apellido" />
      </Form.Item>
      <Form.Item
        className="aligin-center"
        label="Correo"
        name="email"
        rules={[
          {
            required: true,
            message: "Por favor ingrese su correo!",
          },
        ]}
      >
        <Input placeholder="Correo" />
      </Form.Item>
      <Form.Item
        className="aligin-center"
        label="Contraseña"
        name="password"
        rules={[
          {
            required: true,
            message: "Por favor ingrese su contraseña!",
          },
        ]}
      >
        <Input.Password placeholder="Contraseña" type="password" />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          style={{ marginRight: 10 }}
        >
          Registrate
        </Button>
        O{" "}
        <Button onClick={() => setsignup(false)} type="link">
          Ingresa ahora!
        </Button>
      </Form.Item>
      <Button
                      type="ghost"
                      htmlType="button"
                      icon={<GoogleOutlined />}
                      style={{ width: "100%" }}
                      onClick={() => socialLogin(googleAuthProvider)}
                    >
                      Registrase con Goolge
                    </Button>
    </Form>
  );
};

export default withRouter(Signup);
