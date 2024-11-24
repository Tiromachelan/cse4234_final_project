import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* Header Section */}
      <header className="App-header">
        <div className="logo">NETFITZ</div>
        <div className="header-right">
          <button className="register-btn">Register</button>
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
            {/* Add more movie cards here for ACTION*/}
          </div>
          <h2>Drama</h2>
          <div className="movie-cards">
            {/* Example movie card for DRAMA */}
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
            {/* Add more Drama movie cards here for DRAMA */}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
