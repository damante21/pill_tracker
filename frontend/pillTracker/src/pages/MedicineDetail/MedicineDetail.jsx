import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { theme, Form, Button, Input, InputNumber, DatePicker, TimePicker, Typography, Col, Row, Image } from "antd";
import { Offcanvas } from 'react-bootstrap'
import ILayout from "../../components/ILayout/ILayout";
import moment from "moment";
import axios from "axios";
import "./MedicineDetail.css";
import medicineImage from '../../assets/medicine.jpg';
import EditMedicationForm from "../../components/EditMed/EditMed";

const { Title } = Typography;

function MedicineDetail() {

    //offcanvas states
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const { TextArea } = Input;

    const [form] = Form.useForm();
    const userToken = "Token " + localStorage.getItem("token");

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    // states and params
    let { med_id } = useParams();
    const [medInfo, setMedInfo] = useState({});
    const [isMedicineUpdated, setIsMedicineUpdated] = useState(false);

    // useEffects and handleChanges
    async function fetchMed() {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/med/${med_id}`, {
                headers: {
                    Authorization: userToken,
                    "Content-Type": "application/json",
                },
            });
            // console.log(response);
            setMedInfo(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchMed();
    }, []);
    // console.log(medInfo)

    useEffect(() => {
        if (isMedicineUpdated) {
            fetchMed();
            setIsMedicineUpdated(false);
        }
    }, [isMedicineUpdated, med_id]);

    return (
        <div>
            <ILayout>
                <div
                    className="site-layout-content"
                    style={{
                        background: colorBgContainer,
                    }}>
                    <Title level={2}>Medicine Details</Title>
                    <Row>
                    <Offcanvas show={show} onHide={handleClose}>
                        <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Edit Medication</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                        <EditMedicationForm med_id={med_id} setIsMedicineUpdated={setIsMedicineUpdated}/>
                        </Offcanvas.Body>
                    </Offcanvas>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <div className="detail-row">
                            <Button onClick={handleShow}>
                                Edit Medication
                            </Button>
                            </div>
                            <div className="detail-row">
                                <span className="detail-title">Medication Name:</span>
                                <span>{medInfo.medication_name}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-title">Dosage:</span>
                                <span>{medInfo.dosage}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-title">Amount of Medication to Take:</span>
                                <span>{medInfo.intake_quantity}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-title">Medication Note:</span>
                                <span>{medInfo.medication_notes}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-title">Start Date:</span>
                                <span>{medInfo.start_date}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-title">Refill Date:</span>
                                <span>{medInfo.refill_date}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-title">Times Per Day:</span>
                                <span>{medInfo.times_per_day}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-title">Times Of First Medicine:</span>
                                <span>{medInfo.time_of_first_med}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-title">Number Of Pills:</span>
                                <span>{medInfo.number_of_pills}</span>
                            </div>
                        </Col>
                        <Col span={12}>
                            <Image width={300} src={medicineImage} />
                        </Col>
                    </Row>
                    <div>
                    <hr/>
                    Upcoming intakes associated w medicine??
                    </div>
                </div>
            </ILayout>
        </div>
    );
}

export default MedicineDetail;