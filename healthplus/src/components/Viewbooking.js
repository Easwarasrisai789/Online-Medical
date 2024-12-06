import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import for navigation
import HomeNavbar from "./HomeNavbar";
import LoadingSpinner from "./LoadingSpinner"; // Import the new LoadingSpinner component
import "./Viewbooking.css"; // External CSS for styling

function BookingsList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoadingSpinnerVisible, setIsLoadingSpinnerVisible] = useState(false);
  const [spinnerMessage, setSpinnerMessage] = useState(''); // State for the spinner message
  const navigate = useNavigate(); // Initialize navigate function

  // Fetch bookings on component load
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/bookings");
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Function to handle navigating to the DoctorScreen with a delay and loading spinner
  const handleJoinSession = (bookingId) => {
    setIsLoadingSpinnerVisible(true); // Show the loading spinner
    setSpinnerMessage("Joining session..."); // Set the spinner message
    setTimeout(() => {
      setIsLoadingSpinnerVisible(false); // Hide the spinner after 4 seconds
      navigate("/UserScreen", { state: { bookingId } }); // Navigate after 4 seconds
    }, 4000); // Delay time set to 4 seconds (4000 milliseconds)
  };

  return (
    <div>
      {/* Include Navbar */}
      <HomeNavbar />

      {/* Display loading spinner and message when isLoadingSpinnerVisible is true */}
      {isLoadingSpinnerVisible && (
        <div className="loading-overlay">
          <LoadingSpinner message={spinnerMessage} /> {/* Pass the custom message */}
        </div>
      )}

      {/* Bookings Content */}
      <div className="bookings-container">
        <h2 className="bookings-heading">All Bookings</h2>
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
                <th>Actions</th> {/* New column for the action link */}
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.appointmentDateTime}</td>
                  <td>{booking.doctorSpecialty}</td>
                  <td>{booking.userName}</td>
                  <td>{booking.reason}</td>
                  <td>{booking.status}</td>
                  <td>
                    {booking.status === "Accepted" && (
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

export default BookingsList;
