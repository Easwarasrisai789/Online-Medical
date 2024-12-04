import React, { useState } from 'react';
import './DoctorScreen.css';

function DoctorScreen() {
  const [medicines, setMedicines] = useState([]);
  const [medicineInput, setMedicineInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'Doctor', text: 'Hello, how can I assist you today?' },
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleAddMedicine = () => {
    if (medicineInput) {
      setMedicines([...medicines, medicineInput]);
      setMedicineInput('');
    }
  };

  const handleRemoveMedicine = (medicine) => {
    setMedicines(medicines.filter((med) => med !== medicine));
  };

  const handleSendMessage = () => {
    if (chatInput) {
      // Add the message from the doctor to the chat
      setChatMessages([...chatMessages, { sender: 'Doctor', text: chatInput }]);
      setChatInput('');
    }
  };

  const handleCancelCall = () => {
    console.log('Call canceled'); // Replace with actual call-canceling logic
  };

  return (
    <div className="doctorscreen-container">
      <div className="doctorscreen-video-call">
        <button onClick={handleCancelCall} className="doctorscreen-cancel-call-button">Cancel Call</button>
        <p>Video Call</p>
      </div>

      <div className="doctorscreen-chat-section">
        {/* Medicine checkout area for the doctor only */}
        <div className="doctorscreen-medicine-checkout">
          <h3>Medicine Checkout</h3>
          <div className="doctorscreen-medicine-list">
            {medicines.map((medicine, index) => (
              <div key={index} className="doctorscreen-medicine-item">
                <span>{medicine}</span>
                <button onClick={() => handleRemoveMedicine(medicine)} className="doctorscreen-remove-medicine">Remove</button>
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="Add medicine"
            value={medicineInput}
            onChange={(e) => setMedicineInput(e.target.value)}
            className="doctorscreen-input"
          />
          <button onClick={handleAddMedicine} className="doctorscreen-button">Add Medicine</button>
        </div>

        <div className="doctorscreen-chat-box">
          <h3>Chat</h3>
          <div className="doctorscreen-chat-messages">
            {chatMessages.map((msg, index) => (
              <p key={index} className={msg.sender === 'Doctor' ? 'doctorscreen-doctor-message' : 'doctorscreen-patient-message'}>
                <strong>{msg.sender}:</strong> {msg.text}
              </p>
            ))}
          </div>
          <input
            type="text"
            placeholder="Type a message"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            className="doctorscreen-input"
          />
          <button onClick={handleSendMessage} className="doctorscreen-button">Send</button>
        </div>
      </div>
    </div>
  );
}

export default DoctorScreen;
