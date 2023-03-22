import { Layout, Menu, theme, Avatar, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";

const { Header, Content } = Layout;
import "./ILayout.css";
import { useState } from "react";

const ILayout = (props) => {
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { children } = props;
  const menuList = [
    { key: "home", label: "Home" },
    { key: "healthRecords", label: "Health Records" },
  ];

  const handleClickMenuItem = ({ item, key, keyPath, domEvent }) => {
    navigate(`/${key}`);
  };

  

  return (
    <Layout className="layout">
      <Header
        style={{
          background: colorBgContainer,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Menu
          theme="light"
          style={{ flex: 1 }}
          mode="horizontal"
          selectedKeys={[location.pathname.split("/")[1]]}
          items={menuList}
          onClick={handleClickMenuItem}
        />
        <div>
          <Avatar
            style={{ cursor: "pointer", marginRight: 10 }}
            size={"large"}
            icon={<UserOutlined />}
          />
          <span>Jack</span>
        </div>
      </Header>
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};
export default ILayout;
