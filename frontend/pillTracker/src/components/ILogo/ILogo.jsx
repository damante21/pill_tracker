import { Image } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import logomage from "../../assets/logo.jpg";
import "./ILogo.css";

const ILogo = () => {
  return (
    <div>
      <Image width={50} src={logomage} preview={false} />
    </div>
  );
};
export default ILogo;
