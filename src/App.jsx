import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Dashboard from './Pages/Dashbaord.jsx';
import CreateTicket from './Pages/CreateTicket.jsx';
import UpdateTicket from './Pages/UpdateTicket.jsx';
import Signup from './Pages/SignUp.jsx';   
import Login from './Pages/Login.jsx'; 
import TicketDetails from "./components/TicketDetails.jsx"; 
 

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className=" bg-gradient-to-rfrom-[#3D52A0] via-[#7091E6] to-[#EDE8F5] p-4 min-h-screen">
        <Routes>
          {/* <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/signUp" element={<Signup />} />
          <Route path="/login" element={<Login />} />  */}
          <Route path="/dashboard" element={<Dashboard />  }/>
          <Route path="/view/:id" element={<TicketDetails />  }/>
          <Route path="/update/:id" element={<UpdateTicket /> }/>
          <Route path="/create" element={<CreateTicket /> }/>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
