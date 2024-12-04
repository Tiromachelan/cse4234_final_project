// frontend/src/components/Movies.js

import React, { useState, useEffect, useRef } from 'react';
import MovieCard from './MovieCard';

function MovieRow({ genre_search, favoritedMovies, refreshFavorites }) {
  const [movies, setMovies] = useState([]);
  const formData = {
    genre: genre_search
  };

  // reference for the move row container
  const movieRowRef = useRef(null); 

  useEffect(() => {
    fetch("/genres", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then(res => res.json()).then((mv) => setMovies(mv.slice(0, 10)));
  }, [genre_search]);

  // Scroll left
  const scrollLeft = () => {
    if (movieRowRef.curent) {
      movieRowRef.current.scrollBy({
        // Scroll 200px left
        left: -200,
        behavior: 'smooth'
      });
    }
  };

  // Scroll right
  const scrollRight = () => {
    if (movieRowRef.current) {
      movieRowRef.current.scrollBy({
        // Scroll 200px right
        left: 200,
        behavior: 'smooth'
      });
    }
  };


  return (
    <div className="movie-row-container" style={{ position: 'relative' }}>
      {/* Left Arrow */}
      <div className="carousel-arrows left-arrow" onClick={scrollLeft}>
        &lt;
      </div>

      <div className="movie-cards" ref={movieRowRef}>
        {movies.map(movie => (
          <MovieCard
            key={movie._id}
            title={movie.title}
            rating={movie.info.rating}
            duration={movie.info.running_time_secs}
            imageUrl={movie.info.image_url}
            isFavorited={favoritedMovies.includes(movie.title)}
            onFavoriteToggle={refreshFavorites}
          />
        ))}
      </div>

      {/* Right Arrow */}
      <div className="carousel-arrows right-arrow" onClick={scrollRight}>
        &gt;
      </div>
    </div>
  );
}

function Movies() {
  const [genres, setGenres] = useState([]);
  const [favoritedMovies, setFavoritedMovies] = useState([]);

  const fetchFavoritedMovies = () => {
    fetch('/favorited', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    })
      .then(res => {
        if (res.status === 401) {
          setFavoritedMovies([]);
          return [];
        }
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          const titles = data.map(movie => movie.title);
          setFavoritedMovies(titles);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetch("/genrelist", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then(res => res.json()).then((glist) => setGenres(glist)).catch((e) => console.log(e));

    fetchFavoritedMovies();
  }, []);

  return (
    <div className="movies">
      {genres.map((genre_name) => (
        <section className="genre-section" key={genre_name}>
          <h2>{genre_name}</h2>
          <MovieRow
            genre_search={genre_name}
            favoritedMovies={favoritedMovies}
            refreshFavorites={fetchFavoritedMovies}
          />
        </section>
      ))}
    </div>
  );
}

export default Movies;
