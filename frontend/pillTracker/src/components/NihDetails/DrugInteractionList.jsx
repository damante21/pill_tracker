import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../App.css";
import { Breadcrumb, Button, List, Avatar } from "antd";
import ILayout from "../../components/ILayout/ILayout";
import moment from "moment";
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
              dataSource={data.drug_interactions}
              renderItem={(item, index) => (
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

          {/* {data && (
               <ul>
                 {data.drug_interactions.map((item) => (
                   <>
                     <h3>Drugs and Interactions</h3>
                     <li key={item.drug_1}>
                       Drug 1: {item.drug_1_name} : RXCUI: {item.drug_1}
                     </li>
                     <li key={item.drug_2}>
                       Drug 2: {item.drug_2_name} : RXCUI: {item.drug_2}
                     </li>
                     <li key={item.description}>
                       Description of drug interaction: {item.description}
                     </li>
                     <li key={item.severity}>Severity: {item.severity}</li>
                   </>
                 ))}
               </ul>
             )} */}
        </ILayout>
      )}
    </>
  );
};

export default DrugInteractionList;
