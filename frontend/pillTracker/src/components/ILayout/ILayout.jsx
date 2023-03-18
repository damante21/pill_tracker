import { Layout, Menu, theme, Avatar } from "antd";
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
          mode="horizontal"
          selectedKeys={[location.pathname.split("/")[1]]}
          items={menuList}
          onClick={handleClickMenuItem}
        />
        <div>
          <Avatar
            style={{ cursor: "pointer" }}
            size={"large"}
            icon={<UserOutlined />}
          />
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
