import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import HealthRecords from "./pages/HealthRecords/HealthRecords";
import NewMedicine from "./pages/NewMedicine/NewMedicine";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login"
import MedicationIntakeList from "./components/MedTracking/MedicationIntakeList";
import 'bootstrap/dist/css/bootstrap.min.css';
import NihDetails from "./components/nih_details";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/healthRecords" element={<HealthRecords />} />
        <Route path="/home/newMedicine" element={<NewMedicine />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/tracking" element={<MedicationIntakeList />} />
        <Route path="/nih_api" element={<NihDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
