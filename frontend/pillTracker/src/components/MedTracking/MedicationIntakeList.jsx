import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { InputGroup, ListGroup } from 'react-bootstrap'

function MedicationIntakeList(props) {
  const base_url = import.meta.env.VITE_REACT_APP_BASE_URL
  // get full current date to track if med was missed and check it every 5 min
  const [currentDate, setCurrentDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState('');
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 5 * 60 * 1000); // Update every 5 minutes
    return () => clearInterval(intervalId);
  }, []);

  //get all the day's intakes using date as parameter
  const [intakes, setIntakes] = useState([]);

  const [token, setToken] = useState('Token ' + localStorage.getItem('token'))

  // set today's date in calendar, formatted for API use
  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setFormattedDate(formattedDate);
  }, [currentDate]);
  
  useEffect(() => {
    if (formattedDate) {
      fetchIntakes();
    }
  }, [formattedDate]);

  const fetchIntakes = async () => {
    try {
      const response = await axios.get(`http://${base_url}/api/med_tracker?date=${formattedDate}`, {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });
  
      const updatedIntakes = [];
  
      for (const intake of response.data) {
        const medicationResponse = await axios.get(`http://${base_url}/api/med/${intake.medication}`, {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        });
  
        const medicationName = medicationResponse.data.medication_name;
  
        updatedIntakes.push({ ...intake, medicationName });
      }
  
      setIntakes(updatedIntakes);
    } catch (error) {
      console.error(error)
    }
  };
  
  //handle checkbox for whether or not med was taken - put request to intake DRF
  //also sets medicationIntakeUpdated state to true and triggers refresh of home page med list
  const handleCheckboxChange = async (event, intakeId, medication) => {
    const isChecked = event.target.checked;
    const updatedIntake = { taken: isChecked };
    try {
      await axios.put(`http://${base_url}/api/med_tracker/${intakeId}/`, updatedIntake)
      setIntakes(
        intakes.map((intake) =>
          intake.id === intakeId ? { ...intake, taken: isChecked } : intake
        )
      )
      updatePillCount(medication, event.target.checked)
      props.setMedicationIntakeUpdated(true);
    } catch (error) {
      console.error(error)
    }
  };
  
  //Updates the pill count of the medication from the intake. 
  const updatePillCount = async (medication, isChecked) =>{
    try{
      await axios.get(`http://${base_url}/api/med/${medication}`)
      .then((response) => {
        const data = {
          'id': response.data['id'],
          'total_quantity': response.data['total_quantity']
        }
        if(isChecked){
          data['total_quantity'] = data['total_quantity'] + response.data['intake_quantity'];
        }else{
          data['total_quantity'] = data['total_quantity'] - response.data['intake_quantity'];
        }
        axios.put(`http://${base_url}/api/med/${medication}`, data)
        .then((response) => {
        })
      })
    }catch (error) {
      console.error(error)
    }
  }

  // handle color scheme change based on missing pill - maybe make it more noticeable
  // determine is intake time has been passed
  function isMissed(intake) {
    const dueTime = new Date(intake.date + 'T' + intake.time);
    // console.log(currentDate > dueTime)
    return currentDate > dueTime;
  }
  
  // assign text color based on if intake was missed and taken is false
  function getCheckboxColor(intake) {
    if (isMissed(intake) && !intake.taken) {
      return 'text-danger';
    } else {
      return 'text-success';
    }
  }

  //map intakes grouped by medicine and put check boxes next to it
  return (
    <div>
      <h2>Daily Medication List</h2>
      <input
        type="date"
        value={formattedDate}
        onChange={(event) => setFormattedDate(event.target.value)}
      />
      <ListGroup>
      {intakes.map((intake) => (
    <ListGroup.Item key={intake.id}>
        <InputGroup>
        <InputGroup.Checkbox
          checked={intake.taken}
          onChange={(event) => handleCheckboxChange(event, intake.id, intake.medication)}
        />
        <InputGroup.Text className={getCheckboxColor(intake)} style={{ textAlign: 'left' }}>{intake.time}<br/> {intake.medicationName}</InputGroup.Text>
        </InputGroup>
    </ListGroup.Item>
  ))}
      </ListGroup>
    </div>
  )
}


export default MedicationIntakeList;