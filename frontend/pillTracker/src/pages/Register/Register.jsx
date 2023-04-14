import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Form, Button, Input } from "antd";
import ILogo from "../../components/ILogo/ILogo";

export default function Register() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { Header, Content } = Layout;

  const onFinish = (e) => {
    const data = {
      username: username,
      email: email,
      password: password,
    };
    sendData(data);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const sendData = (data) => {
    const base_url = import.meta.env.VITE_REACT_APP_BASE_URL;
    axios
      .post(`http://${base_url}/api/register/`, data)
      .then((res) => {
        // Handle successful response
        navigate("/login/");
      })
      .catch((err) => {
        // Handle error
        console.error(err);
        alert("An error occurred. Please try again later.");
      });
  };

  function loginButtonClick(e) {
    e.preventDefault();
    navigate("/Login/");
  }

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: 50 }}>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
          <ILogo />
          <h2 style={{ marginLeft: 10 }}>Register</h2>
        </div>
        <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
          <Form.Item label="Username" name="username" rules={[{ required: true, message: "Please input your username!" }]}>
            <Input onChange={handleUsernameChange} />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please input your username!" }]}>
            <Input onChange={handleEmailChange} />
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
          <span>Already have an account?</span>
          <Button type="link" onClick={loginButtonClick}>
            Login
          </Button>
        </div>
      </Content>
    </Layout>
  );
}
