import { theme, Button, Table, Space, List } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import ILayout from "../../components/ILayout/ILayout";
import MedicationIntakeList from "../../components/MedTracking/MedicationIntakeList";
import { Offcanvas } from "react-bootstrap";
import PillCount from "../../components/PillCount/PillCount";
import NihDetailsButton from "../../components/NihDetails/NihDetailsButton";
import SideEffectsButton from "../../components/FDASideEffects/SideEffectsButton";
import callBackend from "../../helpers/api_call";
import DeleteMedicine from "../../components/DeleteMed/DeleteMed";
import EditMedicationForm from "../../components/EditMed/EditMed";

const Home = () => {
  const base_url = import.meta.env.VITE_REACT_APP_BASE_URL
  const [drugData, setDrugData] = useState("");
  const [sideEffectData, setSideEffectData] = useState("")

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showEdit, setShowEdit] = useState(false);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = (med_id) => {
    setSelectedMedId(med_id);
    setShowEdit(true);
  };
  const [selectedMedId, setSelectedMedId] = useState(null);
  const [isMedicineUpdated, setIsMedicineUpdated] = useState(false);

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
          // console.log(data)
          setDrugData(data['drug_interactions']);
          setSideEffectData(data["drug_side_effects"]);
        });
      });
      
    } catch {
      console.log("there are no drug interactions");
    }
  }

  const interactionsClickHandler = () => {
    navigate("drugInteractions", { state: drugData });
  };
  const sideEffectsClickHandler = () => {
    navigate("sideEffects", { state: sideEffectData });
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
        setIsMedicineUpdated(false)
      } catch (error) {
        console.log(error);
      }
    }
    fetchMeds();
  }, [token, medicationIntakeUpdated, isMedicineUpdated]);

  useEffect(() => {
    if (authToken == null) {
      navigate("/login/");
    }
  }, []);

  let interactionsDisp = drugData ? (
    <NihDetailsButton onClick={interactionsClickHandler} data={drugData} />
  ) : (
    <Button type="primary" style={{ background: "grey", borderColor: "grey" }}>
      Drug Interactions
    </Button>
  );{
    (" ");
  }


  let effectsDisp = sideEffectData ? (
    <SideEffectsButton
      onClick={sideEffectsClickHandler}
      data={sideEffectData}
    />
  ) : (
    <Button type="primary" style={{ background: "grey", borderColor: "grey" }}>
      Major Side Effects
    </Button>
  );
  {
    (" ");
  }

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
          <Offcanvas show={showEdit} onHide={handleCloseEdit}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Edit Medication</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <EditMedicationForm
                med_id={selectedMedId}
                setIsMedicineUpdated={setIsMedicineUpdated}
                handleCloseEdit={handleCloseEdit}
              />
            </Offcanvas.Body>
          </Offcanvas>
          <div
            className="site-layout-content"
            style={{
              background: colorBgContainer,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                height: "100vh",
              }}
            >
              <Space
                direction="vertical"
                size="small"
                style={{
                  display: "flex",
                  maxWidth: "100vh",
                }}
              >
                <h2>Ongoing Course</h2>
                <span>
                  <span style={{ padding: "2px" }}>
                    <Button type="primary" onClick={handleShow}>
                      Daily Medication Tracking List
                    </Button>
                  </span>
                  <span style={{ padding: "2px" }}>
                    <Button
                      type="primary"
                      onClick={() => {
                        navigate("/home/newMedicine");
                      }}
                    >
                      Add medicine
                    </Button>
                    <span style={{ padding: "2px", minWidth: "150px" }}></span>
                    {interactionsDisp}
                    <span style={{ padding: "2px", minWidth: "150px" }}></span>
                    {effectsDisp}
                  </span>
                  <span style={{ padding: "2px", minWidth: "150px" }}></span>
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
                        description={
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              alignItems: "center",
                            }}
                          >
                            {item.medication_notes ? (
                              <div style={{ flex: 0.5, padding: "5px" }}>
                                {item.medication_notes}
                              </div>
                            ) : (
                              <div style={{ flex: 0.5 }}></div>
                            )}
                            <div style={{ flex: 0.25, padding: "5px" }}>
                              <PillCount pillCount={item.total_quantity} />
                            </div>
                            <div style={{ flex: 0.25, textAlign: "left" }}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Button
                                  type="primary"
                                  onClick={() => handleShowEdit(item.id)}
                                >
                                  Edit
                                </Button>
                                <span style={{ marginRight: "5px" }}></span>
                                <DeleteMedicine med_id={item.id} />
                              </div>
                            </div>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Space>
            </div>
          </div>
        </>
      )}
    </ILayout>
  );
};
export default Home;
