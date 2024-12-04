import React from 'react';
// Correct import assuming both files are in the same directory
import './doctordash.css'; // Styles for DoctorDash
import DoctorNavbar from './Doctornavbar'; 

const DoctorDash = () => {
    const recentActivities = [
        'Reviewed John Doe’s medical reports.',
        'Completed a video call with Jane Smith.',
        'Prescribed medication for Michael Johnson.',
    ];

    const upcomingAppointments = [
        { patient: 'Alice Brown', time: '9:00 AM', status: 'Pending' },
        { patient: 'Bob White', time: '10:30 AM', status: 'Confirmed' },
        { patient: 'Claire Adams', time: '2:00 PM', status: 'Pending' },
    ];

    const quickStats = {
        totalPatients: 120,
        activeCalls: 2,
        pendingAppointments: 3,
    };

    return (
        <div className="doctor-dash-container">
            <DoctorNavbar /> {/* Add the DoctorNavbar component */}
            <div className="doctor-dash-welcome-message">
                <h1>Welcome to Doctor Dashboard</h1>
            </div>

            <div className="doctor-dash-dashboard-stats">
                <div className="doctor-dash-quick-stats">
                    <h2>Quick Stats</h2>
                    <ul>
                        <li><strong>Total Patients:</strong> {quickStats.totalPatients}</li>
                        <li><strong>Active Calls:</strong> {quickStats.activeCalls}</li>
                        <li><strong>Pending Appointments:</strong> {quickStats.pendingAppointments}</li>
                    </ul>
                </div>
            </div>

            <div className="doctor-dash-recent-activities">
                <h2>Recent Activities</h2>
                <ul>
                    {recentActivities.map((activity, index) => (
                        <li key={index}>{activity}</li>
                    ))}
                </ul>
            </div>

            <div className="doctor-dash-appointments">
                <h2>Upcoming Appointments</h2>
                {upcomingAppointments.map((appointment, index) => (
                    <div key={index} className={`doctor-dash-appointment-card ${appointment.status.toLowerCase()}`}>
                        <p><strong>Patient:</strong> {appointment.patient}</p>
                        <p><strong>Time:</strong> {appointment.time}</p>
                        <p><strong>Status:</strong> {appointment.status}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorDash;
