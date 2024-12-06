import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserScreen.css';
import LoadingSpinner from './LoadingSpinner'; // Import the LoadingSpinner component

function UserScreen() {
  const [chatMessages, setChatMessages] = useState([
    { sender: 'User', text: 'Hello, I need help with my health today.' },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isLoadingSpinnerVisible, setIsLoadingSpinnerVisible] = useState(false);
  const [isUserOnline, setIsUserOnline] = useState(true); // New state to track user status
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure the user is set as online initially
    setIsUserOnline(true);
    return () => {
      setIsUserOnline(false); // Cleanup on unmount to mark user as offline
    };
  }, []);

  const handleSendMessage = () => {
    if (chatInput) {
      setChatMessages([...chatMessages, { sender: 'User', text: chatInput }]);
      setChatInput('');
    }
  };

  const handleEndSession = () => {
    setIsLoadingSpinnerVisible(true);
    setTimeout(() => {
      setIsLoadingSpinnerVisible(false);
      setIsUserOnline(false); // Set user status to offline when session ends
      navigate('/home');
    }, 4000);
  };

  return (
    <div className="userscreen-container">
      {/* Display loading spinner and message when isLoadingSpinnerVisible is true */}
      {isLoadingSpinnerVisible && (
        <div className="loading-overlay">
          <LoadingSpinner message="Ending session..." />
        </div>
      )}

      {/* Display user status box when isUserOnline is true */}
      {isUserOnline && (
        <div className="user-status-box">
          <p>User is online</p>
        </div>
      )}

      <div className="userscreen-video-call">
        <button onClick={handleEndSession} className="userscreen-end-session-button">End Session</button>
        <p>Video Call</p>
      </div>

      <div className="userscreen-chat-section">
        <div className="userscreen-chat-box">
          <h3>Chat</h3>
          <div className="userscreen-chat-messages">
            {chatMessages.map((msg, index) => (
              <p key={index} className={msg.sender === 'User' ? 'userscreen-user-message' : 'userscreen-doctor-message'}>
                <strong>{msg.sender}:</strong> {msg.text}
              </p>
            ))}
          </div>
          <input
            type="text"
            placeholder="Type a message"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            className="userscreen-input"
          />
          <button onClick={handleSendMessage} className="userscreen-button">Send</button>
        </div>
      </div>
    </div>
  );
}

export default UserScreen;
