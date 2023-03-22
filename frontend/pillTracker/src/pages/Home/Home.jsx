import { theme, Button, Avatar, Space, List } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios'
import "./Home.css";
import ILayout from "../../components/ILayout/ILayout";
import MedicationIntakeList from "../../components/MedTracking/MedicationIntakeList";

const Home = () => {

  const navigate = useNavigate();
  const authToken = localStorage.getItem('token');  
  
  const [token, setToken] = useState('Token ' + authToken)
  const [meds, setMeds] = useState([])

  // state to refresh med info (pill count) after tracking component is updated
  const [medicationIntakeUpdated, setMedicationIntakeUpdated] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  
  
  const menuList = [
    { key: "home", label: "Home" },
    { key: "healthRecords", label: "Health Records" },
  ];
  
  //get all meds, set medicationIntakeUpdated state to false to "listen" for changes in checkboxes
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
        setMedicationIntakeUpdated(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMeds();
  }, [token, medicationIntakeUpdated]);

  useEffect( () => {
    if(authToken == null){
      navigate('/login/')
    }
  }, []);

  // console.log(meds)

  return (
    <ILayout>
      {meds &&
      <>
      <MedicationIntakeList medicationIntakeUpdated={medicationIntakeUpdated} setMedicationIntakeUpdated={setMedicationIntakeUpdated} />
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
      </>
    }
    </ILayout>
  );
};
export default Home;
