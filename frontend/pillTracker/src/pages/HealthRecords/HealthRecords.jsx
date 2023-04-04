import { theme, Button, Form, Space, Avatar, Divider } from "antd";
import ILayout from "../../components/ILayout/ILayout";
import "./HealthRecords.css";
import { UserOutlined } from "@ant-design/icons";
import { useState,useEffect } from "react";

const HealthRecords = () => {
  const base_url = import.meta.env.VITE_REACT_APP_BASE_URL
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // get user details to populate with username etc
  const [user, setUser] = useState()
  useEffect( () => {
    async function fetchUserDetails() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch(`http://${base_url}/api/user_details`, {
            headers: {
              'Authorization': `Token ${token}`,
              'Content-Type': 'application/json'
            }
          });
          if (response.ok) {
            const data = await response.json();
            // console.log(data)
            setUser(data);
          } else {
            alert('Failed to fetch user details');
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        // redirect user to login page if not authenticated
        window.location.href = '/login';
      }
    }
    fetchUserDetails();
  }, []);
  // console.log(user)

  const [healthRecords, setHealthRecords] = useState();
  useEffect ( () => {
    async function fetchHealtRecords() {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`http://${base_url}/api/health_records`, {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const data = await response.json();
          
          setHealthRecords(data);
        } else {
          alert('Failed to fetch health records');
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchHealtRecords()
  }, []);

  return (
    <ILayout>
      {user && healthRecords &&
      <div
        className="site-layout-content"
        style={{
          background: colorBgContainer,
        }}
      >
        <Space direction="vertical" align="center" style={{ width: "100%" }}>
          <Avatar size={64} icon={<UserOutlined />} />
          <span>{user.username}</span>
        </Space>
        <Divider />
        <h2>Latest Health Data</h2>
        <div className="record-list">
        <div className="record-item">
        <div className="record-item">
            <h3>Height:</h3>
            <span>{healthRecords[0].height}</span>
          </div>
          <div className="record-item">
            <h3>Weight:</h3>
            <span>{healthRecords[0].weight}</span>
          </div>
            <h3>Blood Pressure:</h3>
            <span>{healthRecords[0].blood_pressure}</span>
          </div>
          <div className="record-item">
            <h3>Heart rate:</h3>
            <span>{healthRecords[0].heart_rate}</span>
          </div>
          <div className="record-item">
            <h3>Blood sugar:</h3>
            <span>{healthRecords[0].blood_sugar}</span>
          </div>
        </div>
      </div>
    }
    </ILayout>
  );
};
export default HealthRecords;