import { theme, Button, Form, Space, Avatar, Divider, Col, Row, Image } from "antd";
import ILayout from "../../components/ILayout/ILayout";
import "./HealthRecords.css";
import { UserOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import heartRateImage from "../../assets/heartRate.jpg";
import bodyTemperatureImage from "../../assets/bodyTemperature.jpg";
import bloodSugarImage from "../../assets/bloodSugar.jpg";
import allergiesImage from "../../assets/allergies.jpg";

const HealthRecords = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // get user details to populate with username etc
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
            alert("Failed to fetch user details");
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
            <Col span={12}>
              <div className="user-info">
                <Avatar size={64} icon={<UserOutlined />} />
                <div className="user-info-item">{user.username}</div>
                <div className="user-info-item">{user.email}</div>
              </div>
            </Col>
            <Col span={12}>
              <div className="record-list">
                <div className="record-item">
                  <Image width={50} src={heartRateImage} />
                  <h3>Heart Rate</h3>
                  <span>80bpm</span>
                </div>
                <div className="record-item">
                  <Image width={50} src={bloodSugarImage} />
                  <h3>Blood Sugar:</h3>
                  <span>100mg/dL</span>
                </div>
                <div className="record-item">
                  <Image width={50} src={bodyTemperatureImage} />
                  <h3>Body Temperature</h3>
                  <span>99.6°F</span>
                </div>
                <div className="record-item">
                  <Image width={50} src={allergiesImage} />
                  <h3>Allergies</h3>
                  <span>Peanuts</span>
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
