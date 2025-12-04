// src/components/MovieModal.jsx
import React, { useEffect, useState } from 'react';

const MovieModal = ({ movieId, onClose }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // !!! ЗАМЕНИТЕ 'YOUR_OMDB_API_KEY' НА ВАШ РЕАЛЬНЫЙ API КЛЮЧ !!!
  const API_KEY = '63a51ad0'; 

  useEffect(() => {
    if (!movieId) {
        setMovieDetails(null);
        return;
    }

    const fetchDetails = async () => {
      setLoading(true);
      setError('');
      try {
        // Запрос деталей по ID (i=)
        const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}&plot=full`);
        const data = await res.json();

        if (data.Response === 'True') {
          setMovieDetails(data);
        } else {
          setError(data.Error || 'Не удалось загрузить детали фильма.');
        }
      } catch (err) {
        console.error(err);
        setError('Ошибка сети при загрузке деталей.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
    
  }, [movieId, API_KEY]); 

  // Если нет ID, не показываем модалку
  if (!movieId) return null;

  return (
    // При клике на оверлей, закрываем модалку
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" 
           // Предотвращаем закрытие при клике внутри модалки
           onClick={(e) => e.stopPropagation()}> 
        <button className="modal-close-btn" onClick={onClose}>&times;</button>
        
        {loading && <p className="message">Загрузка деталей...</p>}
        {error && <p className="message error-message">{error}</p>}

        {movieDetails && !loading && !error && (
          <>
            <div className="modal-header">
              <img 
                src={movieDetails.Poster === 'N/A' ? 'https://via.placeholder.com/150x225?text=Нет+Постера' : movieDetails.Poster} 
                alt={movieDetails.Title} 
              />
              <div className="modal-details">
                <h2>{movieDetails.Title} ({movieDetails.Year})</h2>
                <p><strong>Рейтинг IMDb:</strong> {movieDetails.imdbRating}</p>
                <p><strong>Жанр:</strong> {movieDetails.Genre}</p>
                <p><strong>Режиссер:</strong> {movieDetails.Director}</p>
                <p><strong>Актеры:</strong> {movieDetails.Actors}</p>
                <p><strong>Длительность:</strong> {movieDetails.Runtime}</p>
                <p><strong>Дата выхода:</strong> {movieDetails.Released}</p>
              </div>
            </div>
            <div className="modal-plot">
              <h3>Описание:</h3>
              <p>{movieDetails.Plot === 'N/A' ? 'Описание недоступно.' : movieDetails.Plot}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieModal;