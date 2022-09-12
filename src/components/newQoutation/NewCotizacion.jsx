import { Form, Select, Button, Input, Space, Table } from "antd";
import React, { useContext, useEffect, useState, createRef } from "react";
import LogoC from "../../assets/images/logos/LogoC.png";
import LogoG2 from "../../assets/images/logos/LogoG2H.png";
import LogoMuons from "../../assets/images/logos/LogoMuons.png";
import { getColection } from "../../firebase/fireStore";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import "./styles.css";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Notes from "./Notes";
import { useHistory } from "react-router-dom";
import { contextApp } from "../../firebase/context";
import Firma from "./Firma";
import TableNew from "./TableNew";
import Pdf from "react-to-pdf";
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 20,
    },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 4,
    },
  },
};
const ref = createRef();
const NewCotizacion = () => {
  let history = useHistory();
  const { usuario } = useContext(contextApp);
  let initialDate = new Date();
  let temp = new Date(initialDate);
  let ant = 10 * 86399.9; //dias en segundos
  let finalDate = new Date(temp.setSeconds(ant));
  const fecha = format(new Date(), "PPP", { locale: es });
  const [value, setValue] = useState([]);
  const [clientData, setClientData] = useState([]);
  const [getData, setGetData] = useState([]);
  const [getDataHeader, setGetDataHeader] = useState([]);
  const { Option } = Select;
  const onSelect = (value) => {
    setValue(value);
  };
  console.log(getDataHeader);
  const getDatosHeader = async () => {
    const res = await getColection("Usuarios");
    const filter = res.filter((data) => data.data.email === usuario.email);
    setGetDataHeader(filter);
  };
  const getDatos = async () => {
    const res = await getColection("Client");
    setGetData(res);
  };
  const filterData = () => {
    const dataFilter = getData.filter((data) => data.data.client === value);
    setClientData(dataFilter);
  };

  useEffect(() => {
    getDatosHeader();
    getDatos();
    filterData();
  }, [value]);

  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };
  const colums = [
    {
      title: "Ítem",
      dataIndex: "item",
      key: "name",
    },
    {
      title: "Descripción",
      dataIndex: "Descripcion",
      key: "nit",
    },
    {
      title: "Unidad",
      dataIndex: "Unidad",
      key: "adress",
    },
    {
      title: "Cantidad",
      dataIndex: "Cantidad",
      key: "city",
    },
    {
      title: "Costo unitario",
      dataIndex: "cost",
      key: "phone",
    },
    {
      title: "Valor Total",
      dataIndex: "value",
      key: "contact",
    },
  ];
  return (
    <div>
      <main ref={ref} className="container">
        {getDataHeader.map((data) => data.data.company) == "muons" ? (
          <header className="header">
            <div className="header__logos">
              <img src={LogoMuons} alt="Logo G2" />
            </div>

            <div className="header__text">
              <div>Muons S.A.S. NIT: 901.021.817-9</div>
              <div>cg@muons.com.co - mg@muons.com.co</div>
              <div>Cel: 317 501 72 53</div>
              <div>www.muons.com.co </div>
              <div>Bogotá - Colombia Calle 64H # 71 - 33</div>
            </div>
          </header>
        ) : (
          <header className="header">
            <div className="header__logos">
              <img src={LogoG2} alt="Logo G2" />{" "}
              <img src={LogoC} alt="Logo Casadoor" />
            </div>

            <div className="header__text">
              <div>
                Alianza G2 constructores & Casadoor S.A.S. NIT: ____________
              </div>
              <div>
                cg@muons.com.co - gerencia@casadoor.com.co -
                comercial@casadoor.com.co
              </div>
              <div>
                317 501 72 53. - 310 292 79 99 - 310 292 80 00 - 310 679 56 68
              </div>
              <div>www.casadoor.com.co</div>
              <div>Chía - Colombia</div>
            </div>
          </header>
        )}

        <hero className="text">
          <div className="title">Oferta Presupuestal</div>
          <div className="subTitle">20220606_001_Formato para ofertas</div>
        </hero>
        <div className="fecha">{fecha}</div>
        <section className="client">
          <div className="client__data">
            <div className="client__data--title">
              Cliente:{" "}
              <div>
                <Form>
                  <Form.Item noStyle>
                    <Select
                      className="client__form--select"
                      placeholder="Seleccionar:"
                      allowClear
                      onSelect={onSelect}
                      bordered={false}
                    >
                      {(getData || []).map((datos, index) => {
                        return <Option key={index} value={datos.data.client} />;
                      })}
                    </Select>
                  </Form.Item>
                </Form>
              </div>
            </div>
            <div className="client__title">
              Contacto:
              <div className="client__subTitle">
                {clientData.map((res) => res.data.contact)}
              </div>
            </div>
            <div className="client__title">
              Cargo:{" "}
              <div className="client__subTitle">
                {clientData.map((res) => res.data.job)}
              </div>
            </div>
            <div className="client__title">
              Teléfono:{" "}
              <div className="client__subTitle">
                {clientData.map((res) => res.data.phone)}
              </div>
            </div>
            <div className="client__title">
              Correo:{" "}
              <div className="client__subTitle">
                {clientData.map((res) => res.data.email)}
              </div>
            </div>
          </div>
          <div className="client__data">
            <div className="client__title">
              Vigencia:
              <div className="client__subTitle">
                {format(finalDate, "PPP", { locale: es })}
              </div>
            </div>

            <div className="client__title">
              Forma de pago:
              <Form
                name="dynamic_form_item"
                {...formItemLayoutWithOutLabel}
                onFinish={onFinish}
              >
                <Form.List noStyle bordered={false} name="names">
                  {(fields, { add, remove }, { errors }) => (
                    <>
                      {fields.map((field, index) => (
                        <Form.Item
                          bordered={false}
                          required={false}
                          key={field.key}
                          noStyle
                        >
                          <Form.Item
                            {...field}
                            validateTrigger={["onChange", "onBlur"]}
                            noStyle
                            bordered={false}
                          >
                            <Input
                              bordered={false}
                              noStyle
                              style={{
                                width: "60%",
                              }}
                            />
                          </Form.Item>
                          {fields.length > 1 ? (
                            <>
                              <MinusCircleOutlined
                                onClick={() => remove(field.name)}
                              />
                              <PlusOutlined onClick={() => add()} />
                            </>
                          ) : (
                            <PlusOutlined onClick={() => add()} />
                          )}
                        </Form.Item>
                      ))}
                      <Form.Item>
                        {fields.length <= 0 ? (
                          <PlusOutlined onClick={() => add()} />
                        ) : (
                          console.log("otro")
                        )}
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Form>
            </div>
          </div>
        </section>
        <h1 className="contentTitle">Propuesta Económica</h1>

        <section>
          <div className="table">
            <TableNew />
          </div>

          <Form
            name="dynamic_form_nest_item"
            onFinish={onFinish}
            autoComplete="off"
          >
            <section>
              <div className="textNotes">Notas:</div>
              <div>
                <Notes />
              </div>
            </section>
            <Form.Item>
              <section>
                <div>Para mayor información contactar a:</div>
                <div>
                  <Firma />
                </div>
              </section>
            </Form.Item>
          </Form>
        </section>
        <section></section>
      </main>

      <Pdf targetRef={ref} fontStyle="Helvetica" filename="code-example.pdf">
        {({ toPdf }) => (
          <Button type="primary" onClick={toPdf}>
            Generate Pdf
          </Button>
        )}
      </Pdf>
    </div>
  );
};

export default NewCotizacion;
