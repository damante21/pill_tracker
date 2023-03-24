import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  theme,
  Form,
  Button,
  Input,
  InputNumber,
  DatePicker,
  TimePicker,
} from "antd";
import ILayout from "../../components/ILayout/ILayout";
import moment from "moment";
import axios from 'axios'

function EditMedDetailsForm() {

  const { TextArea } = Input;

  const [form] = Form.useForm();
  const userToken = 'Token ' + localStorage.getItem('token')

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // states and params
  let { med_id } = useParams()
  const [medInfo, setMedInfo] = useState()

  // useEffects and handleChanges

  useEffect( () => {
    async function fetchMed(){
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/med/${med_id}`, {
          headers: {
            Authorization: userToken,
            'Content-Type': 'application/json',
          },
        });
        // console.log(response)
        setMedInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMed();
  }, []);
  // console.log(medInfo)
 
  useEffect(() => {
    if (medInfo) {
      form.setFieldsValue({
        medication_name: medInfo.medication_name,
        medication_notes: medInfo.medication_notes,
        dosage: medInfo.dosage,
        start_date: moment(`${medInfo.start_date} 00:00:00`),
        refill_date: moment(`${medInfo.refill_date} 00:00:00`),
        times_per_day: medInfo.times_per_day,
        time_of_first_med: moment(`1970-01-01T${medInfo.time_of_first_med}`),
        number_of_pills: medInfo.number_of_pills,
      });
    }
  }, [medInfo]);

  const onFinish = async (values) => {
    const formattedDate = moment(values.start_date.$d).format("YYYY-MM-DD")
    const formattedRefillDate = moment(values.refill_date.$d).format("YYYY-MM-DD")
    const formattedTime = moment(values.time_of_first_med.$d).format("HH:mm:ss")
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/med/${med_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': userToken
      },
      body: JSON.stringify({
        medication_name: values.medication_name,
        medication_notes: values.medication_notes,
        dosage: values.dosage,
        start_date: formattedDate,
        refill_date: formattedRefillDate,
        times_per_day: values.times_per_day,
        time_of_first_med: formattedTime,
        number_of_pills: values.number_of_pills
      }),
    });
    const result = await response.json();
    // console.log(result)
    if (response.ok) {
      alert('Medicine updated successfully!');
      window.location.reload()
    } else {
        alert('An error occurred while updating medicine. Please check your form inputs.');
      }
    } catch (err) {
      alert('An error occurred while updating medicine.')
      console.error(err)
    }
  }


  return (
    <div>
      {medInfo &&
      <ILayout>
      <div
        className="site-layout-content"
        style={{
          background: colorBgContainer,
        }}
      >
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          style={{ maxWidth: "70vw" }}
        >
          <Form.Item
            name="medication_name"
            label="Medication name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="medication_notes"
            label="Medication notes"
            rules={[{ required: false }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item name="dosage" label="Dosage" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="start_date"
            label="Start date"
            rules={[{ required: true }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="refill_date"
            label="Refill date or End Date"
            rules={[{ required: true }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="times_per_day"
            label="Times per day"
            rules={[{ required: true }]}
          >
           <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            name="time_of_first_med"
            label="Time of first med"
            rules={[{ required: true }]}
          >
            <TimePicker />
          </Form.Item>
          <Form.Item
            name="number_of_pills"
            label="Number of pills in bottle"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </ILayout>
    }
    </div>
  );
}

export default EditMedDetailsForm;