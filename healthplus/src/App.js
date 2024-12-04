import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard'; // Import Dashboard first
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Doctorlogin from './components/Doctorlogin';
import About from './components/About';
import Services from './components/Services';
import Reviews from './components/Reviews';
import DoctorScreen from './components/DoctorScreen';
import PatientScreen from './components/PatientScreen';
import ContactUs from './components/ContactUs';
import DoctorDash from './components/DoctorDash';
import DoctorNavbar from './components/Doctornavbar';
import AppointmentsPage from './components/AppointmentsPage';
import PatientPage from './components/PatientPage';
import Bookingforms from './components/Bookingforms';
import Viewbooking from './components/Viewbooking';
import AppointmentPage from './components/AppointmentsPage';
import PaymentPage from './components/PaymentPage';

import DoctorScheduledAppointments from './components/DoctorScheduledAppointments';



function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} /> {/* Default route */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<Services />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Doctorlogin" element={<Doctorlogin />} />
        <Route path="/about" element={<About />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/DoctorScreen" element={<DoctorScreen />} />
        <Route path="/PatientScreen" element={<PatientScreen />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/DoctorDash" element={<DoctorDash />} />
        <Route path="/DoctorNavbar" element={<DoctorNavbar />} />
        <Route path="/AppointmentPage" element={<AppointmentsPage />} />
        <Route path="/PatientPage" element={<PatientPage />} />
        <Route path="/appointment" element={<Bookingforms />} />
        <Route path="/Bookings" element={<Viewbooking />} />
        <Route path="/AppointmentsPage" element={<AppointmentPage/>} />
        <Route path="/PaymentPage" element={<PaymentPage/>}/>
        
        <Route path="/DoctorScheduledAppointments" element={<DoctorScheduledAppointments/>}/>

        
        
      </Routes>
    </div>
  );
}

export default App;
