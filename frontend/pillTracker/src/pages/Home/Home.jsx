import { theme, Button, Table, Space, List } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import ILayout from "../../components/ILayout/ILayout";
import MedicationIntakeList from "../../components/MedTracking/MedicationIntakeList";
import { Offcanvas } from "react-bootstrap";
import PillCount from "../../components/PillCount/PillCount";
import NihDetails from "../../components/NihDetails/NihDetails";
import callBackend from "../../helpers/api_call";
import DeleteMedicine from "../../components/DeleteMed/DeleteMed";

const Home = () => {
  const base_url = import.meta.env.VITE_REACT_APP_BASE_URL
  const [drugData, setDrugData] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const authToken = localStorage.getItem("token");

  const [token, setToken] = useState("Token " + authToken);

  const columns = [
    {
      title: 'Medication Name',
      dataIndex: 'medication_name',
      render: (text, record) => <a href={`/home/medicineDetail/${record.id}`}>{text}</a>,
    },
    {
      title: 'Notes',
      dataIndex: 'medication_notes',
    },
    {
      title: 'Quantity Remaining',
      dataIndex: 'total_quantity',
      render: (text) => <PillCount pillCount={text} />,
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: (text) => <DeleteMedicine med_id={text} />,
    },
  ];
  
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

  const data = meds.map((item, index) => ({
    key: index,
    id: item.id,
    medication_name: item.medication_name,
    medication_notes: item.medication_notes,
    total_quantity: item.total_quantity,
  }));

  // state to refresh med info (pill count) after tracking component is updated
  const [medicationIntakeUpdated, setMedicationIntakeUpdated] = useState(false);

  if (drugData == "") {
    try {
      callBackend().then((response) => {
        response.json().then((data) => {
          setDrugData(data);
        });
      });
    } catch {
      console.log("there are no drug interactions");
    }
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

  useEffect(() => {
    if (authToken == null) {
      navigate("/login/");
    }
  }, []);

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
                </Button>{" "}
                {drugData && (
                  <NihDetails onClick={clickHandler} data={drugData} />
                )}
              </span>
              <Table
                className="med-list"
                columns={columns}
                dataSource={data}
                pagination={false}
              />;
            </Space>
          </div>
        </>
      )}
    </ILayout>
  );
};
export default Home;
