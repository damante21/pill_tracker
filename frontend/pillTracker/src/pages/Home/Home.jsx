import { theme, Button, Avatar, Space, List } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios'
import "./Home.css";
import ILayout from "../../components/ILayout/ILayout";
import MedicationIntakeList from "../../components/MedTracking/MedicationIntakeList";
import { Offcanvas } from "react-bootstrap";
import PillCount from "../../components/PillCount/PillCount";

const Home = () => {

  const base_url = import.meta.env.VITE_REACT_APP_BASE_URL
  
  // for offcanvas feature
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // navigations and tokens
  const navigate = useNavigate();
  const authToken = localStorage.getItem('token');   
  const [token, setToken] = useState('Token ' + authToken)

  // array of all medication objects to get the names for the api call
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
        const response = await axios.get(`http://${base_url}/api/med`, {
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

  // kick back to login screen if no user token
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
      </Button> <Button
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
                  title={<a href={`/home/medicineDetail/${item.id}`}>{item.medication_name}</a>}
                  description={item.medication_notes}
                />
                <PillCount pillCount={item.number_of_pills} />
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
