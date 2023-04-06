import React from "react";
import { useLocation } from "react-router-dom";
import "../../App.css";
import { Breadcrumb, List } from "antd";
import ILayout from "../../components/ILayout/ILayout";
import { theme } from "antd";

const DrugInteractionList = (props) => {
  const location = useLocation();
  const data = location.state;

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      {location.pathname == "/home/drugInteractions" && (
        <ILayout>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>New Medicine</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-content"
            style={{
              background: colorBgContainer,
            }}
          >
            <h5>Drugs and Interactions</h5>
            <List
              className="med-list"
              itemLayout="horizontal"
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <ul>
                    <li key={item.drug_1}>
                      {item.drug_1_name.charAt(0).toUpperCase() +
                        item.drug_1_name.slice(1)}
                    </li>
                    <li key={item.drug_2}>
                      {item.drug_2_name.charAt(0).toUpperCase() +
                        item.drug_2_name.slice(1)}
                    </li>
                    <li key={item.description}>
                      Description of drug interaction: {item.description}
                    </li>
                    <li key={item.severity}>
                      Severity:{" "}
                      {item.severity.charAt(0).toUpperCase() +
                        item.severity.slice(1)}
                    </li>
                  </ul>
                </List.Item>
              )}
            />
          </div>
        </ILayout>
      )}
    </>
  );
};

export default DrugInteractionList;
