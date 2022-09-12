import React, { useEffect, useState } from "react";
import { Form, Select, Input, Space } from "antd";
import { getColection } from "../../firebase/fireStore";
import "./styles.css";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
function Notes() {
  const [value, setValue] = useState([]);
  const [getData, setGetData] = useState([]);
  const onSelect = (value) => {
    setValue(value);
  };
  const { Option } = Select;
  const getDatos = async () => {
    const res = await getColection("Notas");
    setGetData(res);
  };

  useEffect(() => {
    getDatos();
  }, [value]);
  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };
  return (
    <div className="notes">
      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.List name="users">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{
                    display: "flex",
                    marginBottom: -20,
                  }}
                  align="baseline"
                  wrap
                  size={[8, 8]}
                >
                  <Form.Item {...restField} name={[name, "Item"]}>
                    <Select
                      className="notes"
                      placeholder="Seleccionar:"
                      allowClear
                      onSelect={onSelect}
                      bordered={false}
                    >
                      {(getData || []).map((datos, index) => {
                        return <Option key={index} value={datos.data.title} />;
                      })}
                    </Select>
                  </Form.Item>
                  <PlusOutlined onClick={() => add()} />
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}

              {fields.length <= 0 ? (
                <PlusOutlined
                  className="dynamic-delete-button"
                  onClick={() => add()}
                />
              ) : (
                <div></div>
              )}
            </>
          )}
        </Form.List>
      </Form>
    </div>
  );
}

export default Notes;
