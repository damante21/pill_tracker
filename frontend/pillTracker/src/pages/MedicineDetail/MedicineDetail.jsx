import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { theme, Form, Button, Input, InputNumber, DatePicker, TimePicker, Typography, Col, Row, Image } from "antd";
import ILayout from "../../components/ILayout/ILayout";
import moment from "moment";
import axios from "axios";
import "./MedicineDetail.css";
import medicineImage from '../../assets/medicine.jpg';

const { Title } = Typography;

function MedicineDetail() {
    const { TextArea } = Input;

    const [form] = Form.useForm();
    const userToken = "Token " + localStorage.getItem("token");

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    // states and params
    let { med_id } = useParams();
    const [medInfo, setMedInfo] = useState({});

    // useEffects and handleChanges
    async function fetchMed() {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/med/${med_id}`, {
                headers: {
                    Authorization: userToken,
                    "Content-Type": "application/json",
                },
            });
            console.log(response);
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
        // if (medInfo) {
        //   form.setFieldsValue({
        //     medication_name: medInfo.medication_name,
        //     medication_notes: medInfo.medication_notes,
        //     dosage: medInfo.dosage,
        //     start_date: moment(`${medInfo.start_date} 00:00:00`),
        //     refill_date: moment(`${medInfo.refill_date} 00:00:00`),
        //     times_per_day: medInfo.times_per_day,
        //     time_of_first_med: moment(`1970-01-01T${medInfo.time_of_first_med}`),
        //     number_of_pills: medInfo.number_of_pills,
        //   });
        // }
    }, []);

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
                        <Col span={12}>
                            <div className="detail-row">
                                <span className="detail-title">Medication Name:</span>
                                <span>{medInfo.medication_name}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-title">Medication Note:</span>
                                <span>{medInfo.medication_notes}</span>
                            </div>
                            <div className="detail-row">
                                <span className="detail-title">Dosage:</span>
                                <span>{medInfo.dosage}</span>
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
                </div>
            </ILayout>
        </div>
    );
}

export default MedicineDetail;
