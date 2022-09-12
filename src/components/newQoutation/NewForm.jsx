import { Form, Input, InputNumber } from "antd";
import React, { useState } from "react";
import Description from "./Description";
import FormQoutation from "./FormQoutation";
import TestFormHook from "./TestFormHook";

const NewForm = () => {
  const [data, setData] = useState();
  console.log("..." + data);
  const onChange = (e) => {
    console.log(e.target.value);
    setData(Number(e.target.value));
    // await patients();
    // history.push("/patient");
  };
  return (
    <div>
      <Description />
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
      <FormQoutation porcentajes={data} />
      <TestFormHook />
    </div>
  );
};

export default NewForm;
