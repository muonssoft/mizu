import { Button, Form, Input, InputNumber, Row } from "antd";
import React, { useEffect, useState } from "react";

const FormQoutation = ({ porcentajes, onRemove }) => {
  console.log(porcentajes);
  const [proveedor, setProveedor] = useState({});
  const [porcentual, setPorcentual] = useState(0);
  const [valores, setValores] = useState();
  const [valorTotalData, setvalorTotalData] = useState();
  console.log(valores);
  const [muons, setMuons] = useState();

  const [data, setData] = useState({});
  console.log("...." + data.porcentaje + data.unidad);
  // const onFinish = async (values) => {
  //   await setData(values);
  //   // await patients();
  //   // history.push("/patient");
  // };
  const proveedorChange = (event) => {
    setProveedor({
      [event.target.name]: Number(event.target.value),
    });
  };
  const calculo = (porcentaje, valor) => {
    const res = porcentaje * valor;
    return setMuons(res);
  };
  const porcentajeChange = (event) => {
    setPorcentual({
      [event.target.name]: Number(event.target.value),
    });
  };
  const valorTotalChange = (event) => {
    setPorcentual({
      [event.target.name]: Number(event.target.value),
    });
  };
  const valorTotal = (cant, costU) => {
    const res = cant * costU;
    return setValores(res);
  };
  const updateState = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value });
    console.log(value);
  };

  useEffect(() => {
    calculo(Number(porcentual.porcentaje), Number(proveedor.costProveedor));
    valorTotal(Number(data.cantidad), Number(data.costoUnitario));
  }, [data, proveedor, porcentual]);

  const currency = function (number) {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(number);
  };
  console.log(currency(muons));
  return (
    <>
      <Row>
        <Form onChange={updateState} layout={"horizontal"}>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <Form.Item
              onChange={porcentajeChange}
              key={1}
              label="Porcentaje"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <input
                type="number"
                step="0.01"
                name="porcentaje"
                defaultValue={porcentajes}
              />
            </Form.Item>
            <Form.Item
              onChange={proveedorChange}
              label="Costo proveedor"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <input
                type="number"
                placeholder="Costo proveedor"
                name="costProveedor"
              />
            </Form.Item>
            <div style={{ display: "flex" }}>
              <div>Costo Muons:</div> <div>{currency(muons)}</div>
            </div>
          </div>
          <Form.Item
            // onChange={updateState}
            label="Descripción"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea name="description" />
          </Form.Item>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <Form.Item
              // onChange={updateState}
              label="Unidad"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input name="unidad" />
            </Form.Item>
            <Form.Item
              label="Cantidad"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <input type="number" name="cantidad" />
            </Form.Item>
            <Form.Item
              label="Costo unidario"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber
                // type="number"
                name="costoUnitario"
                placeholder="Costo Unitario"
                defaultValue={muons}
              />
            </Form.Item>
            <Form.Item
              label="Valor total"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <input type="number" name="total" defaultValue={valores} />
            </Form.Item>

            {/* <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ marginRight: 10 }}
              >
                Guardar
              </Button>
            </Form.Item> */}
          </div>
        </Form>
      </Row>
      <button onClick={onRemove}>Eliminar</button>
    </>
  );
};

export default FormQoutation;
