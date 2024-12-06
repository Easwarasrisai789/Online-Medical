import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeNavbar from "./HomeNavbar";
import './Bookinform.css';

function BookingForm() {
    const [appointmentDateTime, setAppointmentDateTime] = useState("");
    const [doctorSpecialty, setDoctorSpecialty] = useState("");
    const [userName, setUserName] = useState("");
    const [reason, setReason] = useState("");
    const [file, setFile] = useState(null); // State to handle the selected file
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

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Get the selected file
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if file is uploaded (optional validation)
        if (!file) {
            alert("Please upload a file.");
            return;
        }

        // Create a form data object to handle file and text fields (if sending to backend)
        const formData = new FormData();
        formData.append("appointmentDateTime", appointmentDateTime);
        formData.append("doctorSpecialty", doctorSpecialty);
        formData.append("userName", userName);
        formData.append("reason", reason);
        formData.append("status", "Pending");
        formData.append("file", file);

        // Navigate to the payment page with form data
        const newBooking = {
            appointmentDateTime,
            doctorSpecialty,
            userName,
            reason,
            fileName: file.name,
            status: "Pending",
        };

        navigate("/payment", { state: { appointmentData: newBooking } });
    };

    return (
        <div>
            <HomeNavbar />
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
                    <label>
                        Upload File:
                        <input
                            type="file"
                            accept="image/*" // Optional: Restrict to image files
                            onChange={handleFileChange}
                            required
                        />
                    </label>
                    <button type="submit">Proceed to Payment</button>
                </form>
            </div>
        </div>
    );
}

export default BookingForm;
