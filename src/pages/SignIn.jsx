import React, { useContext, useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
  message,
} from "antd";
import signinbg from "../assets/images/img-signin.jpg";
import logo from "../assets/images/logo.svg";
import { InstagramOutlined, GoogleOutlined } from "@ant-design/icons";
import { loginGoogle, loginMail } from "../firebase/auth";
import FirebaseApp, { contextApp } from "../firebase/context";
import Signup from "./Signup";
import Cargando from "../components/Cargando";
function onChange(checked) {
  console.log(`switch to ${checked}`);
}
const { Title } = Typography;
const { Header, Footer, Content } = Layout;
const googleAuthProvider = new FirebaseApp.auth.GoogleAuthProvider();
export const SignIn = ({ history }) => {
  const [signup, setsignup] = useState(false);
  const { usuario } = useContext(contextApp);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (usuario) {
      history.push("/");
    }
  }, [history, usuario]);

  const onLogin = async (values) => {
    setLoading(true);
    const { email, password } = values;
    const res = await loginMail({ email, password });
    history.push("/");
    if (res.isError) {
      message.error(res.message);
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <>
      <Layout className="layout-default layout-signin">
        <Header>
          <div className="header-col header-brand">
            <a href="https://muons.com.co/">
              <img
                src={logo}
                alt="logo muons e"
                height={"auto"}
                width={"100%"}
              />
            </a>
          </div>
          <div className="header-col header-nav"></div>
          <div className="header-col header-btn">
            <Button type="primary">Ver proyectos</Button>
          </div>
        </Header>
        <Content className="signin">
          <Row gutter={[24, 0]} justify="space-around">
            <Col
              xs={{ span: 24, offset: 0 }}
              lg={{ span: 6, offset: 2 }}
              md={{ span: 12 }}
            >
              <Title className="" level={2}>
                Sistema de facturación{" "}
              </Title>

              {loading && <Cargando />}
              {!signup ? (
                <Form onFinish={onLogin} layout="vertical" className="row-col">
                  <Form.Item>
                    <h1>Ingreso</h1>
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

                  <Form.Item
                    name="remember"
                    className="aligin-center"
                    valuePropName="checked"
                  >
                    <Switch defaultChecked onChange={onChange} />
                    Recordarme
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%" }}
                      onClick={loginMail}
                    >
                      Iniciar sesión
                    </Button>
                  </Form.Item>
                  <div className="header-col header-btn">
                    <Button
                      type="ghost"
                      htmlType="button"
                      icon={<GoogleOutlined />}
                      style={{ width: "100%" }}
                      onClick={() => loginGoogle(googleAuthProvider)}
                    >
                      Iniciar sesión con Goolge
                    </Button>
                  </div>
                  <p className="font-semibold text-muted">
                    ¿Aún no tiene cuenta?{" "}
                    <Button onClick={() => setsignup(true)} type="link">
                      Registrate Ahora!
                    </Button>
                  </p>
                </Form>
              ) : (
                <Signup setsignup={setsignup} />
              )}
            </Col>
            <Col
              className="sign-img"
              style={{ padding: 12 }}
              xs={{ span: 12 }}
              lg={{ span: 12 }}
              md={{ span: 12 }}
            >
              <img src={signinbg} alt="" />
            </Col>
          </Row>
        </Content>
        <Footer>
          <Menu mode="horizontal">
            <Menu.Item>
              <a
                href="https://muons.com.co/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Muons
              </a>
            </Menu.Item>
            <Menu.Item>
              <a
                href="https://msoft.com.co/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Msoft
              </a>
            </Menu.Item>
            <Menu.Item>
              <a
                href="https://mtools.com.co/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mtools
              </a>
            </Menu.Item>
            <Menu.Item>
              <a
                href="https://yohago.com.co/"
                target="_blank"
                rel="noopener noreferrer"
              >
                YoHago
              </a>
            </Menu.Item>
            <Menu.Item>
              <a
                href="https://casadoor.com.co/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Casadoor
              </a>
            </Menu.Item>
          </Menu>
          <Menu mode="horizontal" className="menu-nav-social">
            <Menu.Item>
              <a
                href="https://www.instagram.com/muons.co/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {<InstagramOutlined />}
              </a>
            </Menu.Item>
          </Menu>
          <p className="copyright">
            {" "}
            Copyright © 2022{" "}
            <a
              href="https://www.msoft.com.co"
              target="_blank"
              rel="noopener noreferrer"
            >
              Muons e
            </a>{" "}
          </p>
        </Footer>
      </Layout>
    </>
  );
};
