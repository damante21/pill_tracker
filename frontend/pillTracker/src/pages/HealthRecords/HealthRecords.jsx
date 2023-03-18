import { theme, Button,Form } from "antd";
import ILayout from "../../components/ILayout/ILayout";
import "./HealthRecords.css";

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
      ></div>
    </ILayout>
  );
};
export default HealthRecords;
