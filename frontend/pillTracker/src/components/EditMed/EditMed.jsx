import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { message } from 'antd'
import { Form, Button } from 'react-bootstrap'

const EditMedicationForm = (props) => {

  const navigate = useNavigate();
  const base_url = import.meta.env.VITE_REACT_APP_BASE_URL

  const userToken = 'Token ' + localStorage.getItem('token')
  const [medicationData, setMedicationData] = useState()
  const [formData, setFormData] = useState({
    medication_name: '',
    medication_notes: '',
    dosage: '',
    intake_quantity: '',
    start_date: '',
    refill_date: '',
    times_per_day: 1,
    time_of_first_med: '',
    total_quantity: 0,
  });

  useEffect( () => {
    async function fetchMed(){
      try {
        const response = await axios.get(`http://${base_url}/api/med/${props.med_id}`, {
          headers: {
            Authorization: userToken,
            'Content-Type': 'application/json',
          },
        });
        // console.log(response)
        setMedicationData(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMed();
  }, [props, userToken]);

  useEffect(() => {
    if (medicationData) {
      setFormData({ ...medicationData, medication_notes: medicationData.medication_notes || '' });
    }
  }, [medicationData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch(`http://${base_url}/api/med/${props.med_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': userToken
      },
      body: JSON.stringify({
        medication_name: formData.medication_name,
        medication_notes: formData.medication_notes,
        dosage: formData.dosage,
        intake_quantity: formData.intake_quantity,
        start_date: formData.start_date,
        refill_date: formData.refill_date,
        times_per_day: formData.times_per_day,
        time_of_first_med: formData.time_of_first_med,
        total_quantity: formData.total_quantity
      }),
    });
    const result = await response.json();
    // console.log(result)
    if (response.ok) {
      props.setIsMedicineUpdated(true)
      message.success('Medicine updated successfully!');
    } else {
      message.error('An error occurred while updating medicine. Please check your form inputs.');
      }
    } catch (err) {
      message.error('An error occurred while updating medicine.')
      console.error(err)
    }
  }

  return (
    <Form onSubmit={onSubmit}>
    <Form.Group className="mb-3" controlId="medication_name">
      <Form.Label>Medication Name</Form.Label>
      <Form.Control
        type="text"
        name="medication_name"
        value={formData.medication_name}
        onChange={handleChange}
        required
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="dosage">
      <Form.Label>Dosage Strength</Form.Label>
      <Form.Control
        type="text"
        name="dosage"
        value={formData.dosage}
        onChange={handleChange}
        required
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="intake_quantity">
      <Form.Label>Dosage Amount (per dose in pills, mL, etc.)</Form.Label>
      <Form.Control
        type="number"
        name="intake_quantity"
        value={formData.intake_quantity}
        onChange={handleChange}
        required
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="medication_notes">
      <Form.Label>Medication Notes</Form.Label>
      <Form.Control
        type="text"
        name="medication_notes"
        value={formData.medication_notes}
        onChange={handleChange}
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="start_date">
      <Form.Label>Start Date</Form.Label>
      <Form.Control
        type="date"
        name="start_date"
        value={formData.start_date}
        onChange={handleChange}
        required
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="refill_date">
      <Form.Label>Refill Date</Form.Label>
      <Form.Control
        type="date"
        name="refill_date"
        value={formData.refill_date}
        onChange={handleChange}
        required
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="times_per_day">
      <Form.Label>Times Per Day</Form.Label>
      <Form.Control
        type="number"
        name="times_per_day"
        value={formData.times_per_day}
        onChange={handleChange}
        required
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="time_of_first_med">
      <Form.Label>Time of First Medication</Form.Label>
      <Form.Control
        type="time"
        name="time_of_first_med"
        value={formData.time_of_first_med}
        onChange={handleChange}
        required
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="total_quantity">
      <Form.Label>Total Quantity in Container (in pills, mL, etc.)</Form.Label>
      <Form.Control
        type="number"
        name="total_quantity"
        value={formData.total_quantity}
        onChange={handleChange}
        required
      />
    </Form.Group>

    <Button variant="danger" type="submit">
      Submit
    </Button>
  </Form>
  );
};

export default EditMedicationForm;