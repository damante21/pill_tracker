import React from "react";
import { useState } from "react";
import callBackend from "../../helpers/api_call";
import "../../App.css";
import DrugInteractionList from "./DrugInteractionList";
import { Button } from "antd";
import ILayout from "../../components/ILayout/ILayout";
import moment from "moment";

const NihDetails = (props) => {
  return (
    <>
      <Button type="primary" onClick={props.onClick}>
        Drug Interactions
      </Button>
      {/* <DrugInteractionList data={props.data} /> */}
    </>
  );
};

export default NihDetails;
