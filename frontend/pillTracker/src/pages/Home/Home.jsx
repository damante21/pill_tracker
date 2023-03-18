import { theme, Button, Avatar, Space, List } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import "./Home.css";
import ILayout from "../../components/ILayout/ILayout";

const Home = () => {

  const navigate = useNavigate();
  const authToken = localStorage.getItem('token');  

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  

  const menuList = [
    { key: "home", label: "Home" },
    { key: "healthRecords", label: "Health Records" },
  ];

  const listData = [
    {
      title: "test1",
    },
    {
      title: "test2",
    },
    {
      title: "test1",
    },
    {
      title: "test2",
    },
    {
      title: "test1",
    },
    {
      title: "test2",
    },
    {
      title: "test1",
    },
    {
      title: "test2",
    },
  ];

  useEffect( () => {
    if(authToken == null){
      navigate('/login/')
    }
  }, []);

  

  return (
    <ILayout>
      <div
        className="site-layout-content"
        style={{
          background: colorBgContainer,
        }}
      >
        <Space
          direction="vertical"
          size="small"
          style={{
            display: "flex",
          }}
        >
          <h2>Ongoing Course</h2>
          <List
            className="med-list"
            itemLayout="horizontal"
            dataSource={listData}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`https://joesch.moe/api/v1/random?key=${index}`}
                    />
                  }
                  title={<a href="">{item.title}</a>}
                  description="test111"
                />
              </List.Item>
            )}
          />
          <Button
            type="primary"
            onClick={() => {
              navigate("/home/newMedicine");
            }}
          >
            Add medicine
          </Button>
        </Space>
      </div>
    </ILayout>
  );
};
export default Home;
