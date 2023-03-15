import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MedicationIntakeList() {

  //get all the day's intakes using date as parameter
  const [intakes, setIntakes] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  
  useEffect(() => {
    fetchIntakes()
  }, [date]);

  const fetchIntakes = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/med_tracker?date=${date}`)
      setIntakes(response.data)
    } catch (error) {
      console.error(error)
    }
  };

  //handle checkbox for whether or not med was taken - put request to intake DRF
  const handleCheckboxChange = async (event, intakeId) => {
    const isChecked = event.target.checked;
    const updatedIntake = { taken: isChecked };
    try {
      await axios.put(`http://127.0.0.1:8000/api/med_tracker/${intakeId}/`, updatedIntake)
      setIntakes(
        intakes.map((intake) =>
          intake.id === intakeId ? { ...intake, taken: isChecked } : intake
        )
      )
    } catch (error) {
      console.error(error)
    }
  };


  //map intakes grouped by medicine and put check boxes next to it
  return (
    <div>
      <input
        type="date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
      />
      <ul>
        {intakes.map((intake) => (
          <li key={intake.id}>
            <label>
              <input
                type="checkbox"
                checked={intake.taken}
                onChange={(event) => handleCheckboxChange(event, intake.id)}
              />
              {intake.medication.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}


export default MedicationIntakeList;