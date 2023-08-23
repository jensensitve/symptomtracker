import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import LoginUser from './components/LoginUser';
import RegisterUser from "./components/RegisterUser";
import DashboardUser from "./components/DashboardUser";
import GetAllUsers from "./components/AllUsers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Andere Routen hier */}
        <Route path="/" element={<DashboardUser />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/getUsers" element={<GetAllUsers />} />
       
        {/* Weitere Routen hier */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
