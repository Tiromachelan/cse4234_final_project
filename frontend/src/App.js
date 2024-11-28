import React, { useState } from 'react';
import './App.css';
import SignIn from './components/SignIn';
import Register from './components/Register';
import Movies from './components/Movies';


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("register");

  const openModal = (contentType) => {
    setModalContent(contentType);
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div className="App">
      {/* Header Section */}
      <header className="App-header">
        <div className="logo">NETFITZ</div>
        <div className="header-right">
          <button className="register-btn" onClick={() => openModal("register")}>
            Register
          </button>
          <span className="welcome-msg">Welcome, user</span>
        </div>
      </header>

      {/* Main Content Section */}
      <main>
        <Movies/>
      </main>

      {/* Modal Section */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>
              ×
            </button>
            {modalContent === "register" ? <Register /> : <SignIn />}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
