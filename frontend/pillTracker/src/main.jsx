import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ConfigProvider } from "antd";
import "./index.css";

const data = {
  borderRadius: 6,
  colorPrimary: "#D0021B",
};

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: data.colorPrimary,
          borderRadius: data.borderRadius,
        },
      }}
    >
      <App />
    </ConfigProvider>
  // </React.StrictMode>
);
