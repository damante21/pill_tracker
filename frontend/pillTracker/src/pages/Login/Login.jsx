import React, {useState} from 'react'
import  { useNavigate  } from 'react-router-dom'
import { Layout, Form, Button, Input, Menu, theme, Avatar, Dropdown } from "antd";


export default function Login(){

    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const navigate = useNavigate();
    const { Header, Content } = Layout;

    async function onFinish(e) {
        e.preventDefault()
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/api-token-auth`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: username,
              password: password
            })
          });
          if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            window.location.href = '/'
          } else {
            localStorage.removeItem('token');
            alert('Login failed');
          }
        } catch (error) {
          alert('Something went wrong.')
          console.error(error);
        } 
      }

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    function registerButtonClick(e){
      e.preventDefault()
      navigate('/register/')
    }

    return(
      <Layout>
        <Content>
        <h2 style={{right: '100px'}}>Log in</h2>
        <Form 
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        >
          <Form.Item
            label='Username'
            name='username'
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password/>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form><br/>
          <p>Need an account?</p>
          <Button type="primary" onClick={registerButtonClick}>Register</Button>
      </Content>
      </Layout>



    )
}