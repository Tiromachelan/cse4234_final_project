import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

function MovieRow({genre_search}){
    const [movies, setMovies] = useState([]);
    const formData = {
        genre: genre_search
    };
    useEffect(() => {
        fetch("http://localhost:3000/genres", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        }).then(res => res.json()).then((mv) => setMovies(mv.slice(0, 10)));
      }, []);

    return(                    
        <div className="movie-cards">
            {movies.map(movie => (
                <MovieCard title={movie.title} rating={movie.info.rating} duration={movie.info.running_time_secs} imageUrl={movie.info.image_url}/>)
            )}
        </div>
    )
}

function Movies(){
    const [genres, setGenres] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/genrelist", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then(res => res.json()).then((glist) => setGenres(glist)).catch((e) => console.log(e));
      }, []);
    return(
        <div className = "movies">
            {genres.map((genre_name) => (
                <section className="genre-section">
                    <h2>{genre_name}</h2>
                    <MovieRow genre_search={genre_name}/>
                </section>
            ))}
        </div>
    );
}

export default Movies;