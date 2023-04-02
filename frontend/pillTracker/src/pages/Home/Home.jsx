import { theme, Button, Avatar, Space, List } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import ILayout from "../../components/ILayout/ILayout";
import MedicationIntakeList from "../../components/MedTracking/MedicationIntakeList";
import { Offcanvas } from "react-bootstrap";
import PillCount from "../../components/PillCount/PillCount";
import NihDetails from "../../components/NihDetails/nih_details";
import callBackend from "../../helpers/api_call";

import medIcon from "../../assets/medIcon.jpg"

const Home = () => {

  const [drugData, setDrugData] = useState(null);
  const base_url = import.meta.env.VITE_REACT_APP_BASE_URL

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const authToken = localStorage.getItem("token");

  const [token, setToken] = useState("Token " + authToken);

  // ensure only authenticated users that exist in our db can see page
  const [user, setUser] = useState();
  useEffect(() => {
    async function fetchUserDetails() {
      if (token) {
        try {
          const response = await fetch(`http://${base_url}/api/user_details`, {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          });
          if (response.ok) {
            const data = await response.json();
            // console.log(data)
            setUser(data);
          } else {
            // alert("Failed to fetch user details");
            navigate("/login/")
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        // redirect user to login page if not authenticated
        window.location.href = "/login";
      }
    }
    fetchUserDetails();
  }, []);

  // array of all medication objects to get the names for the api call
  const [meds, setMeds] = useState([]);

  // state to refresh med info (pill count) after tracking component is updated
  const [medicationIntakeUpdated, setMedicationIntakeUpdated] = useState(false);

  if (drugData == null) {
    callBackend().then((response) => {
      response.json().then((data) => {
        setDrugData(data);
      });
    });
  }


  const clickHandler = () => {
    navigate("drugInteractions", { state: drugData });
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuList = [
    { key: "home", label: "Home" },
    { key: "healthRecords", label: "Health Records" },
  ];

  //get all meds, set medicationIntakeUpdated state to false to "listen" for changes in checkboxes
  useEffect(() => {
    async function fetchMeds() {
      try {
        const response = await axios.get(`http://${base_url}/api/med`, {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        });

        setMeds(response.data);
        setMedicationIntakeUpdated(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMeds();
  }, [token, medicationIntakeUpdated]);

  return (
    <ILayout>
      {meds && (
        <>
          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Tracking List</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <MedicationIntakeList
                medicationIntakeUpdated={medicationIntakeUpdated}
                setMedicationIntakeUpdated={setMedicationIntakeUpdated}
              />
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
              <span>
                <Button type="primary" onClick={handleShow}>
                  Daily Medication Tracking List
                </Button>{" "}
                <Button
                  type="primary"
                  onClick={() => {
                    navigate("/home/newMedicine");
                  }}
                >
                  Add medicine
                </Button> {' '}
                <NihDetails onClick={clickHandler} data={drugData} />
              </span>
              <List
                className="med-list"
                itemLayout="horizontal"
                dataSource={meds}
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta
                      title={
                        <a href={`/home/medicineDetail/${item.id}`}>
                          {item.medication_name}
                        </a>
                      }
                      description={item.medication_notes}
                    />
                    <PillCount pillCount={item.number_of_pills} />
                  </List.Item>
                )}
              />
            </Space>
          </div>
        </>
      )}
    </ILayout>
  );
};
export default Home;
