import { PlusCircleOutlined } from "@ant-design/icons";
import { Card } from "antd";
import React from "react";

const Add = ({ title, link }) => {
  return (
    <div style={{ marginLeft: "2%" }}>
      <Card
        hoverable
        style={{
          width: 300,
          marginTop: 16,
        }}
        title={title}
        onClick={link}
      >
        <div style={{ flexDirection: "row", justifyContent: "center" }}>
          <PlusCircleOutlined /> Agregar
        </div>
      </Card>
    </div>
  );
};

export default Add;
