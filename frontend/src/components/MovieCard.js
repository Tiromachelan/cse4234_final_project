// frontend/src/components/MovieCard.js

import React, { useContext } from "react";
import "./MovieCard.css";
import UserContext from '../User';

const MovieCard = ({ title, imageUrl, rating, duration }) => {
  const { cookies } = useContext(UserContext);
  const isLoggedIn = cookies['session-cookie'];

  const handleAddToFavorites = () => {
    fetch('/favorite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Include cookies in the request
      body: JSON.stringify({ title })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert('Error adding to favorites: ' + data.error);
        } else {
          alert('Added to favorites!');
        }
      })
      .catch(error => console.error(error));
  };

  const formatDuration = (seconds) => {
    if (!seconds) return 'N/A';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="movie-card">
      <img src={imageUrl} alt={title} className="movie-poster" />
      <div className="movie-info">
        <h3>{title}</h3>
        <p>Rating: {rating || 'N/A'}</p>
        <p>Duration: {formatDuration(duration)}</p>
        <div className="movie-actions">
          <button className="view-btn">View Movie</button>
          <button
            className="fav-btn"
            onClick={handleAddToFavorites}
            disabled={!isLoggedIn}
          >
            {isLoggedIn ? 'Add to Favorites' : 'Login to Favorite'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
