import React from 'react';
import { useState } from "react";
import callBackend from '../../helpers/api_call';
import "../../App.css";


const NihDetails = () => {

   const [data, setData] = useState(null);

   const clickHandler = () => {
       callBackend().then((response) => {
       response.json().then((data) => {
         setData(data)
       });;
   })
}

   if (data) {
     console.log(data.drug_interactions[1])
   }

   return (
     <div>
       <button onClick={clickHandler}>call backend</button>
       {data && (
         <ul>
           {data.drug_interactions.map((item) => (
           <>
             <h3>Drugs and Interactions</h3>
               <li>Drug: {item.drug_1_name} : {item.drug_1}</li>
               <li>Drug: {item.drug_2_name} : {item.drug_2}</li>
               <li>Description of drug interaction: {item.description}</li>
               <li>Severity: {item.severity}</li>
               </>)
            )}
            {/* <>
            {data.drug_info.map((item) => (
           <>
               <h3>Drugs and RXCUI</h3>
               <li>Drug Name: {item.name}</li>
               <li>Drug RXCUI: {item.rxcui}</li>
              
             </>)
           )} 
           </> */}
       
         </ul>
       )}
     </div>
   );
}



export default NihDetails;
