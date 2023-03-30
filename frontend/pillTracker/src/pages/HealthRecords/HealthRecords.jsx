import { theme, Button, Form, Space, Avatar, Divider, Col, Row } from "antd";
import ILayout from "../../components/ILayout/ILayout";
import "./HealthRecords.css";
import { UserOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

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
                <div
                    className="site-layout-content"
                    style={{
                        background: colorBgContainer,
                    }}>
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
                                    <h3>Heart rate:</h3>
                                    <span>1</span>
                                </div>
                                <div className="record-item">
                                    <h3>Blood sugar:</h3>
                                    <span>1</span>
                                </div>
                                <div className="record-item">
                                    <h3>Allergies:</h3>
                                    <span>1</span>
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
