// frontend/src/App.js

import React, { useState, useContext } from 'react';
import './App.css';
import SignIn from './components/SignIn';
import Register from './components/Register';
import Movies from './components/Movies';
import UserAccount from './components/UserAccount';
import UserContext, { UserProviderWrapper } from './components/User';

function App() {
  const { cookies, setCookie, removeCookie } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("register");
  const [view, setView] = useState('movies'); // 'movies' or 'userAccount'

  const acceptWarn = () => {
    setCookie("warn", "warned");
  };

  const openModal = (contentType) => {
    setModalContent(contentType);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle sign out
  const handleSignOut = () => {
    fetch('/signout', {
      method: 'GET',
      credentials: 'include',
    })
      .then(() => {
        removeCookie('session-cookie');
        setView('movies');
      })
      .catch(error => console.error(error));
  };

  const isLoggedIn = cookies['session-cookie'];

  return (
    <div className="App">
      {/* Header Section */}
      <header className="App-header">
        <div className="logo" onClick={() => setView('movies')}>NETFITZ</div>
        <div className="header-right">
          {!isLoggedIn && (
            <>
              <button className="register-btn" onClick={() => openModal("register")}>
                Register
              </button>
              <button className="register-btn" onClick={() => openModal("signin")}>
                Sign In
              </button>
            </>
          )}
          {isLoggedIn && (
            <>
              <button className="register-btn" onClick={() => setView('userAccount')}>
                My Account
              </button>
              <button className="register-btn" onClick={handleSignOut}>
                Sign Out
              </button>
            </>
          )}
        </div>
      </header>

      {/* Main Content Section */}
      <main>
        {view === 'movies' && <Movies />}
        {view === 'userAccount' && <UserAccount />}
      </main>

      {/* Modal Section */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>
              ×
            </button>
            {modalContent === "register" && <Register closeModal={closeModal} />}
            {modalContent === "signin" && <SignIn closeModal={closeModal} />}
          </div>
        </div>
      )}

      {/* Cookie Consent Banner */}
      {!(cookies.warn === "warned") && (
        <div className="warning-box">
          <h2>This website uses cookies</h2>
          <button className="warning-button" onClick={acceptWarn}>X</button>
        </div>
      )}
    </div>
  );
}

export default function AppWrapper() {
  return (
    <UserProviderWrapper>
      <App />
    </UserProviderWrapper>
  );
}
