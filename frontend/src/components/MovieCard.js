import React from "react";
import "./MovieCard.css"; // Your CSS for styling

const MovieCard = ({ title, imageUrl, rating, duration }) => {
  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="movie-card">
      <img src={imageUrl} alt={title} className="movie-poster" />
      <div className="movie-info">
        <h3>{title}</h3>
        <p>Rating: {rating}</p>
        <p>Duration: {formatDuration(duration)}</p>
        <div className="movie-actions">
          <button className="view-btn">View Movie</button>
          <button className="fav-btn">Add to Favorites</button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
