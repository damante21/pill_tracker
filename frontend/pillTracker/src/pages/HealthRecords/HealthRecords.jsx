import { theme, Button, Form, Space, Avatar, Divider } from "antd";
import ILayout from "../../components/ILayout/ILayout";
import "./HealthRecords.css";
import { UserOutlined } from "@ant-design/icons";

const HealthRecords = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <ILayout>
      <div
        className="site-layout-content"
        style={{
          background: colorBgContainer,
        }}
      >
        <Space direction="vertical" align="center" style={{ width: "100%" }}>
          <Avatar size={64} icon={<UserOutlined />} />
          <span>Jack</span>
        </Space>
        <Divider />
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
      </div>
    </ILayout>
  );
};
export default HealthRecords;
