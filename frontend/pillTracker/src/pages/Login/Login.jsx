import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Form, Button, Input, message } from "antd";
import ILogo from "../../components/ILogo/ILogo";

export default function Login() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const { Header, Content } = Layout;

  async function onFinish(e) {
    try {
      const base_url = import.meta.env.VITE_REACT_APP_BASE_URL;
      // console.log(base_url);
      const response = await fetch(`http://${base_url}/api/api-token-auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        window.location.href = "/";
      } else {
        localStorage.removeItem("token");
        message.error("Login failed");
      }
    } catch (error) {
      message.error("Something went wrong.");
      console.error(error);
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  function registerButtonClick(e) {
    e.preventDefault();
    navigate("/register/");
  }

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: 50 }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
          <ILogo />
          <h2 style={{ marginLeft: 10 }}>Log in</h2>
        </div>
        <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
          <Form.Item label="Username" name="username" rules={[{ required: true, message: "Please input your username!" }]}>
            <Input onChange={handleUsernameChange} />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please input your password!" }]}>
            <Input.Password onChange={handlePasswordChange} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <br />
        <div style={{ display: "flex", alignItems: "center" }}>
          <span>Need an account?</span>
          <Button type="link" onClick={registerButtonClick}>
            Register
          </Button>
        </div>
      </Content>
    </Layout>
  );
}
