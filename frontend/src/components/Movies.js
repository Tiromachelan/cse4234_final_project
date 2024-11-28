import React from 'react';
import MovieCard from './MovieCard';

function formData(genre_name){
    const temp = {
        "genre": genre_name
    };
    return temp;
}
function MovieRow({genre_search}){
    const movieData = fetch("http://localhost:3000/genres", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData(genre_search)),
    }).then(resp => resp.json);
    return(<p>{typeof movieData}</p>)

    return(                    
        <div className="movie-cards">
            {movieData.map((movie, index) => (
                <MovieCard key={index} title={movie.title} rating={movie.rating} duration={movie.duration} imageUrl={movie.imageUrl}/>)
            )}
        </div>
    )
}

function Movies(){
    const genres = ["Action", "Drama"];
    return(
        <div className = "movies">
            {genres.map((genre_name) => (
                <section className="genre-section">
                    <h2>{genre_name}</h2>

                </section>
            ))}
        </div>
    );
}

export default Movies;