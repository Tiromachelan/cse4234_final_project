import React, { useState } from 'react';
import './App.css';
import SignIn from './components/SignIn';
import Register from './components/Register';


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
        <section className="genre-section">
          <h2>Action</h2>
          <div className="movie-cards">
            {/* Example movie card */}
            <div className="movie-card">
              <img
                src="https://via.placeholder.com/150x200"
                alt="Movie Poster"
                className="movie-poster"
              />
              <div className="movie-info">
                <h3>Movie Title</h3>
                <p>Rating: 8.5</p>
                <p>Duration: 2h 10m</p>
                <div className="movie-buttons">
                  <button className="view-btn">View Movie</button>
                  <button className="fav-btn">Add to Favorites</button>
                </div>
              </div>
            </div>
          </div>
          <h2>Drama</h2>
          <div className="movie-cards">
            <div className="movie-card">
              <img
                src="https://via.placeholder.com/150x200"
                alt="Movie Poster"
                className="movie-poster"
              />
              <div className="movie-info">
                <h3>Movie Title</h3>
                <p>Rating: 8.5</p>
                <p>Duration: 2h 10m</p>
                <div className="movie-buttons">
                  <button className="view-btn">View Movie</button>
                  <button className="fav-btn">Add to Favorites</button>
                </div>
              </div>
            </div>
          </div>
        </section>
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
