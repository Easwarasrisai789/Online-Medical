import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HomeNavbar from "./HomeNavbar"; // Import the extracted HomeNavbar
import './Bookinform.css';

function BookingForm() {
    const [appointmentDateTime, setAppointmentDateTime] = useState("");
    const [doctorSpecialty, setDoctorSpecialty] = useState("");
    const [userName, setUserName] = useState("");
    const [reason, setReason] = useState("");
    const navigate = useNavigate();

    const specialties = [
        "General Physician",
        "Cardiologist",
        "Dermatologist",
        "Orthopedist",
        "Pediatrician",
        "Neurologist",
        "Gynecologist",
        "Psychiatrist",
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newBooking = {
            appointmentDateTime,
            doctorSpecialty,
            userName,
            reason,
            status: "Pending",
        };

        try {
            await axios.post("http://localhost:8080/api/bookings", newBooking, {
                headers: { "Content-Type": "application/json" },
            });
            alert("Appointment requested successfully!");
            navigate("/confirmation");
        } catch (error) {
            console.error("Error booking appointment:", error);
            alert("Failed to book appointment. Try again later.");
        }
    };

    return (
        <div>
            <HomeNavbar /> {/* Add the navbar at the top */}
            
            <div className="form-container">
                <h2>Book an Appointment</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Date and Time:
                        <input
                            type="datetime-local"
                            value={appointmentDateTime}
                            onChange={(e) => setAppointmentDateTime(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Doctor Specialty:
                        <select
                            value={doctorSpecialty}
                            onChange={(e) => setDoctorSpecialty(e.target.value)}
                            required
                        >
                            <option value="" disabled>
                                Select a specialty
                            </option>
                            {specialties.map((specialty, index) => (
                                <option key={index} value={specialty}>
                                    {specialty}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Patient Name:
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Reason:
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Book Appointment</button>
                </form>
            </div>
        </div>
    );
}

export default BookingForm;
