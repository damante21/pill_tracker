import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { InputGroup, ListGroup } from 'react-bootstrap'

function MedicationIntakeList(props) {
  
  // get current date to track if med was missed
  const [currentDate, setCurrentDate] = useState(new Date());
  console.log(currentDate)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 5 * 60 * 1000); // Update every 5 minutes
    return () => clearInterval(intervalId);
  }, []);


  //get all the day's intakes using date as parameter
  const [intakes, setIntakes] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [token, setToken] = useState('Token ' + localStorage.getItem('token'))
  
  useEffect(() => {
    fetchIntakes()
  }, [date]);

  const fetchIntakes = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/med_tracker?date=${date}`, {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });
  
      const updatedIntakes = [];
  
      for (const intake of response.data) {
        const medicationResponse = await axios.get(`http://127.0.0.1:8000/api/med/${intake.medication}`, {
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
  // console.log(intakes)
  
  //handle checkbox for whether or not med was taken - put request to intake DRF
  //also sets medicationIntakeUpdated state to true and triggers refresh of home page med list
  const handleCheckboxChange = async (event, intakeId, medication) => {
    const isChecked = event.target.checked;
    const updatedIntake = { taken: isChecked };
    try {
      await axios.put(`http://127.0.0.1:8000/api/med_tracker/${intakeId}/`, updatedIntake)
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
      await axios.get(`http://127.0.0.1:8000/api/med/${medication}`)
      .then((response) => {
        const data = {
          'id': response.data['id'],
          'user': response.data['user'],
          'number_of_pills': response.data['number_of_pills']
        }
        if(isChecked){
          data['number_of_pills'] = data['number_of_pills'] + 1;
        }else{
          data['number_of_pills'] = data['number_of_pills'] - 1;
        }
        // console.log(data)
        axios.put(`http://127.0.0.1:8000/api/med/${medication}`, data)
        .then((response) => {
        })
      })
    }catch (error) {
      console.error(error)
    }
  }

  // handle color scheme change based on missing pill
  // determine is intake time has been passed
  function isMissed(intake) {
    const dueTime = new Date(intake.date + 'T' + intake.time);
    console.log(currentDate > dueTime)
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
      <h2>Medication Tracking</h2>
      <input
        type="date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
      />
      <ListGroup>
      {intakes.map((intake) => (
    <ListGroup.Item key={intake.id}>
        <InputGroup>
        <InputGroup.Checkbox
          checked={intake.taken}
          onChange={(event) => handleCheckboxChange(event, intake.id, intake.medication)}
        />
        <InputGroup.Text className={getCheckboxColor(intake)}>{intake.time} - {intake.medicationName}</InputGroup.Text>
        </InputGroup>
    </ListGroup.Item>
  ))}
      </ListGroup>
    </div>
  )
}


export default MedicationIntakeList;