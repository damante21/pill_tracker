import { Layout, Menu, theme, Avatar, Dropdown, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";

const { Header, Content } = Layout;
import "./ILayout.css";
import { useState } from "react";
import ILogo from "../ILogo/ILogo";

const ILayout = (props) => {
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { children } = props;
  const menuList = [
    { key: "home", label: "Home" },
    { key: "healthReference", label: "Health Reference" },
  ];

  const handleClickMenuItem = ({ item, key, keyPath, domEvent }) => {
    navigate(`/${key}`);
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    navigate("/login/");
  };

  return (
    <Layout className="layout">
      <Header
        style={{
          background: colorBgContainer,
          display: "flex",
          justifyContent: "space-between",
          width: "100%", // set the width to 100%
          padding: "0 30px", // add some padding to the left and right
        }}>
        <ILogo />
        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={[location.pathname.split("/")[1]]}
          items={menuList}
          onClick={handleClickMenuItem}
          style={{ flexGrow: 1, marginLeft: 10 }} // set the flex grow property to allow the menu to expand
        >
          {menuList.map((item) => (
            <Menu.Item key={item.key}>{item.title}</Menu.Item>
          ))}
        </Menu>
        <div>
          <Button onClick={handleLogoutClick}>Logout</Button>
        </div>
      </Header>
      <Content className="content"
        style={{
          padding: "0 30px"
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};
export default ILayout;
