
import React from "react";
import "../../App.css";
import { Button } from "antd";


const NihDetailsButton = (props) => {
  return (
    <>
      <Button type="primary" onClick={props.onClick}>
        Drug Interactions
      </Button>
      {/* <DrugInteractionList data={props.data} /> */}
    </>
  );
};

export default NihDetailsButton;
