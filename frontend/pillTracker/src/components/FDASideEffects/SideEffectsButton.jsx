
import React from "react";
import "../../App.css";
import { Button } from "antd";


const SideEffectsButton = (props) => {
  return (
    <>
      <Button type="primary" onClick={props.onClick}>
        Major Side Effects
      </Button>

      {/* <DrugInteractionList data={props.data} /> */}
    </>
  );
};

export default SideEffectsButton;
