import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import HealthRecords from "./pages/HealthRecords/HealthRecords";
import NewMedicine from "./pages/NewMedicine/NewMedicine";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login"
import 'bootstrap/dist/css/bootstrap.min.css';
import EditMedDetailsForm from "./components/EditMed/EditMed";
import MedicineDetail from "./pages/MedicineDetail/MedicineDetail";
import NihDetails from "./components/NihDetails/nih_details";
import MedicationIntakeList from "./components/MedTracking/MedicationIntakeList";
import MedicineDetail from "./pages/MedicineDetail/MedicineDetail";
import DrugInteractionList from "./components/NihDetails/DrugInteractionList";


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
        <Route path="/home/editMedicine/:med_id" element={<EditMedDetailsForm />} />
        <Route path="/home/medicineDetail/:med_id" element={<MedicineDetail />} />
        <Route path="/tracking" element={<MedicationIntakeList />} />
        <Route path="/nih_api" element={<NihDetails />} />
        <Route path="home/drugInteractions" element={<DrugInteractionList />} />
        {/* <Route path="/home/medicineDetail/:med_id" element={<EditMedDetailsForm />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
