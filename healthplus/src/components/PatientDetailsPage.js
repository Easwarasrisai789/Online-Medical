import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DoctorNavbar from '../components/Doctornavbar';
import LoadingSpinner from './LoadingSpinner';
import './Viewbooking.css';

function PatientDetailsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoadingSpinnerVisible, setIsLoadingSpinnerVisible] = useState(false);
  const [spinnerMessage, setSpinnerMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/api/bookings');
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleJoinSession = (bookingId) => {
    setIsLoadingSpinnerVisible(true);
    setSpinnerMessage('Joining session...');
    setTimeout(() => {
      setIsLoadingSpinnerVisible(false);
      navigate('/doctorscreen', { state: { bookingId } });
    }, 4000);
  };

  return (
    <div>
      <DoctorNavbar />
      {isLoadingSpinnerVisible && (
        <div className="loading-overlay">
          <LoadingSpinner message={spinnerMessage} />
        </div>
      )}
      <div className="bookings-container">
        <h2 className="bookings-heading">Patient Details</h2>
        {loading ? (
          <p>Loading bookings...</p>
        ) : bookings.length > 0 ? (
          <table className="bookings-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date & Time</th>
                <th>Specialty</th>
                <th>Patient Name</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{new Date(booking.appointmentDateTime).toLocaleString()}</td>
                  <td>{booking.doctorSpecialty}</td>
                  <td>{booking.userName}</td>
                  <td>{booking.reason}</td>
                  <td>{booking.status}</td>
                  <td>
                    {booking.status === 'Accepted' && (
                      <button onClick={() => handleJoinSession(booking.id)}>Join Session</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </div>
  );
}

export default PatientDetailsPage;
