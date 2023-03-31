import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../App.css";
import { Breadcrumb, Button, List, Avatar } from "antd";
import ILayout from "../../components/ILayout/ILayout";
import moment from "moment";


const DrugInteractionList = (props) => {


const location = useLocation()
const data = location.state



//   if (location.pathname == '/home/drugInteractions') {data = window.sessionStorage.getItem(data); console.log(data)}
   

   // const click = props.click
   // // const data = props.data
   // const beenClicked = props.beenClicked

  
   // if (props.passDown) {
   //    const passDown = props.passDown
   // }
   // console.log(data)
   // let display;
   // if (beenClicked) {
   //    display = (<h1>true</h1>)
   // }
   // else {
   //    display = (<h1>false</h1>)
   // }
   // data = props.data ? props.data : null


   //   <>
   //     <ILayout>
   //       <Breadcrumb style={{ margin: "16px 0" }}>
   //         <Breadcrumb.Item>Home</Breadcrumb.Item>
   //         <Breadcrumb.Item>New Medicine</Breadcrumb.Item>
   //       </Breadcrumb>
   //       <div>
   //         {data && (
   //           <ul>
   //             {data.drug_interactions.map((item) => (
   //               <>
   //                 <h3>Drugs and Interactions</h3>
   //                 <li key={item.drug_1}>
   //                   Drug 1: {item.drug_1_name} : RXCUI: {item.drug_1}
   //                 </li>
   //                 <li key={item.drug_2}>
   //                   Drug 2: {item.drug_2_name} : RXCUI: {item.drug_2}
   //                 </li>
   //                 <li key={item.description}>
   //                   Description of drug interaction: {item.description}
   //                 </li>
   //                 <li key={item.severity}>Severity: {item.severity}</li>
   //               </>
   //             ))}
   //           </ul>
   //         )}
   //       </div>
   //     </ILayout>
   //   </>

   // const drugButton = (props) => {
   //    return (
   //       <Button type="primary" onClick={click}>
   //     Drug Interactions
   //   </Button>
   //    )
   // }

   // const interactionPage = (props) => {
   //    return (
   //       <>
   //     <ILayout>
   //       <Breadcrumb style={{ margin: "16px 0" }}>
   //         <Breadcrumb.Item>Home</Breadcrumb.Item>
   //         <Breadcrumb.Item>New Medicine</Breadcrumb.Item>
   //       </Breadcrumb>
   //       <div>
   //         {data && (
   //           <ul>
   //             {data.drug_interactions.map((item) => (
   //               <>
   //                 <h3>Drugs and Interactions</h3>
   //                 <li key={item.drug_1}>
   //                   Drug 1: {item.drug_1_name} : RXCUI: {item.drug_1}
   //                 </li>
   //                 <li key={item.drug_2}>
   //                   Drug 2: {item.drug_2_name} : RXCUI: {item.drug_2}
   //                 </li>
   //                 <li key={item.description}>
   //                   Description of drug interaction: {item.description}
   //                 </li>
   //                 <li key={item.severity}>Severity: {item.severity}</li>
   //               </>
   //             ))}
   //           </ul>
   //         )}
   //       </div>
   //     </ILayout>
   //   </>
   //    )
   // }
   //  : 
   //   <Button type="primary" onClick={click}>
   //     Drug Interactions
   //   </Button>
   // ;
   // let display;
   // if (beenClicked === true) {
   //    display = 
   // }
   return (
     <>
       {location.pathname == "/home/drugInteractions" && (
         <ILayout>
           <Breadcrumb style={{ margin: "16px 0" }}>
             <Breadcrumb.Item>Home</Breadcrumb.Item>
             <Breadcrumb.Item>New Medicine</Breadcrumb.Item>
           </Breadcrumb>
           <h5>Drugs and Interactions</h5>
           <List
             className="med-list"
             itemLayout="horizontal"
             dataSource={data.drug_interactions}
             renderItem={(item, index) => (
               <List.Item>
                 <li key={item.drug_1}>{item.drug_1_name}</li>
                 <li key={item.drug_2}>{item.drug_2_name}</li>
                 <li key={item.description}>
                   Description of drug interaction: {item.description}
                 </li>
                 <li key={item.severity}>Severity: {item.severity}</li>
               </List.Item>
             )}
           />

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
   }

export default DrugInteractionList