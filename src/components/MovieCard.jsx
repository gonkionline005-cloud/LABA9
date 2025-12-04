// src/components/MovieCard.jsx
import React from 'react';

const MovieCard = ({ movie, onSelect }) => {
  // Проверка постера: если N/A, показываем заглушку
  const posterUrl = movie.Poster === 'N/A' 
    ? 'https://via.placeholder.com/300x450?text=Нет+Постера' 
    : movie.Poster;

  return (
    <div className="movie-card" 
         // ПРИ НАЖАТИИ ВЫЗЫВАЕМ onSelect с ID фильма
         onClick={() => onSelect(movie.imdbID)}>
      <img 
        src={posterUrl} 
        alt={`Постер фильма ${movie.Title}`} 
        // Обработка ошибки загрузки изображения
        onError={(e) => {
          e.target.onerror = null; 
          e.target.src = 'https://via.placeholder.com/300x450?text=Постер+Недоступен';
        }}
      />
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </div>
    </div>
  );
};

export default MovieCard;