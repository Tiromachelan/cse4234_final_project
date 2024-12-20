// frontend/src/components/UserAccount.js

import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import UserContext from './User';

function UserAccount() {
  const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState('');

  const fetchFavoritedMovies = () => {
    fetch('/favorited', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then(res => {
        if (res.status === 401) {
          setMessage('You are not logged in.');
          return [];
        }
        return res.json();
      })
      .then(data => {
        if (data.error) {
          setMessage('Error fetching favorites.');
        } else {
          setMovies(data);
        }
      })
      .catch(error => {
        console.error(error);
        setMessage('An error occurred.');
      });
  };

  useEffect(() => {
    fetchFavoritedMovies();
  }, []);

  if (message) {
    return <p>{message}</p>;
  }

  if (movies.length === 0) {
    return <p>You have not favorited any movies yet.</p>;
  }

  return (
    <div className="movies-grid">
      {movies.map(movie => (
        <MovieCard
          key={movie._id}
          title={movie.title}
          imageUrl={movie.info.image_url}
          rating={movie.info.rating}
          duration={movie.info.running_time_secs}
          isFavorited={true}
          onFavoriteToggle={fetchFavoritedMovies}
        />
      ))}
    </div>
  );
}

export default UserAccount;
