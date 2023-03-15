import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MedicationIntakeList from '../components/MedicationIntakeList'

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/tracking" element={<MedicationIntakeList />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
