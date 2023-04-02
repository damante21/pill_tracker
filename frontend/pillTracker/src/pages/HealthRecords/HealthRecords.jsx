import { theme, Typography, Button, Form, Space, Avatar, Divider, Col, Row, Image } from "antd";
import ILayout from "../../components/ILayout/ILayout";
import "./HealthRecords.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import heartRateImage from "../../assets/heartRate.jpg";
import bodyTemperatureImage from "../../assets/bodyTemperature.jpg";
import bloodSugarImage from "../../assets/bloodSugar.jpg";
import bloodPressureImage from "../../assets/bloodPressure.jpg";

const { Title } = Typography;
const HealthRecords = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  // get user details to populate with username etc - later feature
  // verify user exists within our db
  const [user, setUser] = useState();
  useEffect(() => {
    async function fetchUserDetails() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/user_details`, {
            headers: {
              Authorization: `Token ${token}`,
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
  // console.log(user)

  return (
    <ILayout>
      {user && (
        <div className="site-layout-content">
          <Row>
            <Col>
              <Title level={2}>Health Reference</Title>
              <Title style={{marginBottom:20}} level={5}>Here are the references of  average health metrics, the age, gender, and time of the day may affect each of the data. Please follow the doctor’s advice. </Title>

              <div className="record-list">
                <div className="record-item">
                  <Image width={50} src={heartRateImage} />
                  <h3>Heart Rate</h3>
                  <span>60-100bpm</span>
                </div>
                <div className="record-item">
                  <Image width={50} src={bloodSugarImage} />
                  <h3>Blood Sugar:</h3>
                  <span>80-130mg/dL</span>
                </div>
                <div className="record-item">
                  <Image width={50} src={bodyTemperatureImage} />
                  <h3>Body Temperature</h3>
                  <span>97-99F</span>
                </div>
                <div className="record-item">
                  <Image width={50} src={bloodPressureImage} />
                  <h3>Blood Pressure</h3>
                  <span>less than 120/80 mmHg</span>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </ILayout>
  );
};
export default HealthRecords;