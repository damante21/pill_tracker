import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import HealthRecords from "./pages/HealthRecords/HealthRecords";
import NewMedicine from "./pages/NewMedicine/NewMedicine";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login"
import WalgreensAPI from "./pages/WalgreensRefill/Walgreens";
import MedicationIntakeList from "./components/MedTracking/MedicationIntakeList";


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
        <Route path="/walgreens" element={<WalgreensAPI />} />
        <Route path="/tracking" element={<MedicationIntakeList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
