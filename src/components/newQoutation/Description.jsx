import { Form } from "antd";
import React, { useEffect, useState } from "react";

const Description = ({ onRemove }) => {
  const [valores, setValores] = useState(0);
  const [muons, setMuons] = useState();
  const [porcentual, setPorcentual] = useState(0);
  const [proveedor, setProveedor] = useState({});
  console.log(proveedor);
  const [datos, setDatos] = useState({
    description: "",
    unidad: "",
    cantidad: "",
    costoUnitario: 0,
    valorTotal: 0,
  });

  const calculo = (porcentaje, valor) => {
    const res = porcentaje * valor;
    return setMuons(res);
  };
  const enviarDatos = (e) => {
    e.preventDefault();
    console.log("enviando datos..." + datos);
  };

  const handleInputChange = (event) => {
    // console.log(event.target.name)
    // console.log(event.target.value)
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };
  const porcentajeChange = (event) => {
    setPorcentual({
      [event.target.name]: event.target.value,
    });
  };
  const proveedorChange = (event) => {
    setProveedor({
      [event.target.name]: Number(event.target.value),
    });
  };
  useEffect(() => {
    calculo(Number(porcentual.porcentaje), proveedor.costProveedor);
  }, [porcentual, proveedor]);

  return (
    <div>
      <input
        type="number"
        placeholder="Porcentaje"
        className="form-control"
        step="0.01"
        onChange={porcentajeChange}
        name="porcentaje"
      ></input>
      <form onFinishFailed={enviarDatos}>
        <input
          type="textarea"
          placeholder="Descripción"
          className="form-control"
          onChange={handleInputChange}
          name="description"
        ></input>
        <input
          type="text"
          placeholder="Unidad"
          className="form-control"
          onChange={handleInputChange}
          name="unidad"
        ></input>
        <input
          type="number"
          placeholder="Cantidad"
          name="cantidad"
          onChange={handleInputChange}
        />

        <input
          type="number"
          placeholder="Costo Unitario"
          name="costoUnitario"
          defaultValue={muons}
          onChange={handleInputChange}
        />
        <input
          type="number"
          placeholder="Valor Total"
          name="valorTotal"
          onChange={handleInputChange}
        />
        <input
          type="number"
          placeholder="Costo proveedor"
          name="costProveedor"
          onChange={proveedorChange}
        />
        <div style={{ diplay: "flex", flexDirection: "row" }}>
          <div style={{ color: "red" }}> Costo Muons:</div>
          <div style={{ color: "grey" }}>{muons}</div>
        </div>
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
        <button onClick={onRemove}>Eliminar</button>
      </form>

      <div>{muons}</div>
    </div>
  );
};

export default Description;
