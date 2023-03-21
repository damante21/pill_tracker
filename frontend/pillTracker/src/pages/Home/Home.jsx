import { theme, Button, Avatar, Space, List } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios'
import "./Home.css";
import ILayout from "../../components/ILayout/ILayout";

const Home = () => {

  const navigate = useNavigate();
  const authToken = localStorage.getItem('token');  
  
  const [token, setToken] = useState('Token ' + authToken)
  const [meds, setMeds] = useState([])

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  

  const menuList = [
    { key: "home", label: "Home" },
    { key: "healthRecords", label: "Health Records" },
  ];

  // const listData = [
  //   {
  //     title: "test1",
  //   },
  //   {
  //     title: "test2",
  //   },
  //   {
  //     title: "test1",
  //   },
  //   {
  //     title: "test2",
  //   },
  //   {
  //     title: "test1",
  //   },
  //   {
  //     title: "test2",
  //   },
  //   {
  //     title: "test1",
  //   },
  //   {
  //     title: "test2",
  //   },
  // ];
  
  useEffect( () => {
    async function fetchMeds(){
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/med`, {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        });
        // console.log(response)
        setMeds(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMeds();
  }, []);

  useEffect( () => {
    if(authToken == null){
      navigate('/login/')
    }
  }, []);

  console.log(meds)

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
            dataSource={meds}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`https://joesch.moe/api/v1/random?key=${item.id}`}
                    />
                  }
                  title={<a href="">{item.medication_name}</a>}
                  description={item.medication_notes}
                />
                <div>
                  <p>Number of pills left</p>
                  <p>{item.number_of_pills}</p>
                </div>
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
