import { theme, Button, Avatar, Space, List } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios'
import "./Home.css";
import ILayout from "../../components/ILayout/ILayout";
import MedicationIntakeList from "../../components/MedTracking/MedicationIntakeList";
import { Offcanvas } from "react-bootstrap";

const Home = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Tracking List</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <MedicationIntakeList medicationIntakeUpdated={medicationIntakeUpdated} setMedicationIntakeUpdated={setMedicationIntakeUpdated} />
        </Offcanvas.Body>
      </Offcanvas>
      
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
          <span><Button type="primary" onClick={handleShow}>
        Daily Medication Tracking List
      </Button>
      <Button
            type="primary"
            onClick={() => {
              navigate("/home/newMedicine");
            }}
          >
            Add medicine
          </Button></span>
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
                  <p>Number of pills left: {item.number_of_pills}</p>
                </div>
              </List.Item>
            )}
          />
        </Space>
      </div>
      </>
    }
    </ILayout>
  );
};
export default Home;
