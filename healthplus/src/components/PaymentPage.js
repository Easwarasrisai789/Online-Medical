import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function PaymentPage() {
  const { bookingId } = useParams();
  const [paymentStatus, setPaymentStatus] = useState("Pending");
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      // Simulate payment process
      const status = "Paid"; // Assume successful payment for now
      await axios.put(`http://localhost:8080/api/bookings/${bookingId}/payment-status`, null, {
        params: { paymentStatus: status },
      });
      alert("Payment successful!");
      setPaymentStatus(status);
      navigate("/appointments");
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Payment Page</h2>
      <p>Booking ID: {bookingId}</p>
      <p>Payment Status: {paymentStatus}</p>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
}

export default PaymentPage;
