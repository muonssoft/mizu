import { Button, Form } from "antd";
import React, { useState } from "react";
import Description from "./Description";
import FormQoutation from "./FormQoutation";

const defaultState = {
  description: "",
  unidad: "",
  cantidad: 0,
  costoUnitario: 0,
  valorTotal: 0,
};

function Row({ onChange, onRemove, nombre, email, telefono, area }) {
  return (
    <div>
      <input
        value={nombre}
        onChange={(e) => onChange("nombre", e.target.value)}
        placeholder="Nombre del contacto"
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => onChange("email", e.target.value)}
      />
      <input
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => onChange("telefono", e.target.value)}
      />
      <input
        placeholder="Área o Sector"
        value={area}
        onChange={(e) => onChange("area", e.target.value)}
      />
      <button onClick={onRemove}>Eliminar</button>
    </div>
  );
}

const AddItem = () => {
  const [data, setData] = useState();
  console.log("..." + data);
  const onChange = (e) => {
    console.log(e.target.value);
    setData(Number(e.target.value));
    // await patients();
    // history.push("/patient");
  };
  const [rows, setRows] = useState([defaultState]);
  console.log(rows);
  const handleOnChange = (index, name, value) => {
    const copyRows = [...rows];
    copyRows[index] = {
      ...copyRows[index],
      [name]: value,
    };
    setRows(copyRows);
  };

  const handleOnAdd = () => {
    setRows(rows.concat(defaultState));
  };

  const handleOnRemove = (index) => {
    const copyRows = [...rows];
    copyRows.splice(index, 1);
    setRows(copyRows);
  };
  const total = rows
    .map((res) => res.costoUnitario)
    .reduce((prev, curr) => prev + curr, 0);
  console.log(total);
  return (
    <div>
      <Form>
        <Form.Item
          label="Porcentaje General"
          onChange={onChange}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <input name="porcentaje" type="number" step="0.01" />
        </Form.Item>
      </Form>
      {rows.map((row, index) => (
        <FormQoutation
          porcentajes={data}
          {...row}
          onChange={(name, value) => handleOnChange(index, name, value)}
          onRemove={() => handleOnRemove(index)}
          key={index}
        />
      ))}
      <Button type="primary" onClick={handleOnAdd}>
        Agregar
      </Button>
      {rows.map((res) => res.valorTotal).reduce((prev, curr) => prev + curr, 0)}
    </div>
  );
};
export default AddItem;
