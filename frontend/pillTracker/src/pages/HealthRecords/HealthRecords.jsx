import { theme, Button, Form, Space, Avatar, Divider, Typography } from "antd";
import ILayout from "../../components/ILayout/ILayout";
import "./HealthRecords.css";
import { UserOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Paragraph } = Typography;

const HealthRecords = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [username, setUserName] = useState("Jack");
    const [heartRete, setHeartRete] = useState("1");
    const [bloodSugar, setBloodSugar] = useState("1");
    const [Allergies, setAllergies] = useState("1");

    return (
        <ILayout>
            <div
                className="site-layout-content"
                style={{
                    background: colorBgContainer,
                }}>
                <Space direction="vertical" align="center" style={{ width: "100%" }}>
                    <Avatar size={64} icon={<UserOutlined />} />
                    <Paragraph editable={{ onChange: setUserName }}>{username}</Paragraph>
                </Space>
                <Divider />
                <div className="record-list">
                    <div className="record-item">
                        <h3>Heart rate:</h3>
                        <Paragraph editable={{ onChange: setHeartRete }}>{heartRete}</Paragraph>
                    </div>
                    <div className="record-item">
                        <h3>Blood sugar:</h3>
                        <Paragraph editable={{ onChange: setBloodSugar }}>{bloodSugar}</Paragraph>
                    </div>
                    <div className="record-item">
                        <h3>Allergies:</h3>
                        <Paragraph editable={{ onChange: setAllergies }}>{Allergies}</Paragraph>
                    </div>
                </div>
            </div>
        </ILayout>
    );
};
export default HealthRecords;
