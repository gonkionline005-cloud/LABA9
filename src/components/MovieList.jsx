// src/components/MovieList.jsx
import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies, onSelectMovie }) => {
  if (!movies || movies.length === 0) {
    return null; 
  }

  return (
    <div className="movie-grid">
      {movies.map(movie => (
        <MovieCard 
          key={movie.imdbID} 
          movie={movie} 
          onSelect={onSelectMovie} // Передаем функцию дальше
        />
      ))}
    </div>
  );
};

export default MovieList;