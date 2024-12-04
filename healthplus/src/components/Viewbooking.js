import React, { useEffect, useState } from "react";
import axios from "axios";
import HomeNavbar from "./HomeNavbar";
import "./Viewbooking.css"; // External CSS for styling

function BookingsList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      {/* Include Navbar */}
      <HomeNavbar />

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
