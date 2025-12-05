// src/App.jsx - ОСНОВНОЙ ФАЙЛ С ЛОГИКОЙ (Только Поиск по кнопке)
import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieModal from './components/MovieModal';
// GenreMenu удален
import './App.css';

const App = () => {
  // Инициализация запроса: Теперь по умолчанию пустая строка, а не "Netflix"
  const [searchQuery, setSearchQuery] = useState(''); 
  const [currentSearchTerm, setCurrentSearchTerm] = useState(''); // Фактический запрос, по которому идет поиск
  
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  
  const API_KEY = '63a51ad0'; 

  // --- Функция для запроса фильмов (использует currentSearchTerm) ---
  const fetchMovies = useCallback(async (query) => {
    
    let url = `https://www.omdbapi.com/?apikey=${API_KEY}`;
    
    if (query && query.trim() !== '') {
        url += `&s=${query.trim()}`;
    } else {
        setMovies([]);
        setError('');
        return;
    }

    setLoading(true);
    setError('');
    
    try {
      const res = await fetch(url);
      const data = await res.json();
      
      if (data.Response === 'True') {
        setMovies(data.Search);
      } else {
        setMovies([]);
        const errorMsg = data.Error || `Фильм по запросу "${query}" не найден.`;
        setError(errorMsg);
      }
    } catch (err) {
      console.error(err);
      setError('Ошибка загрузки данных. Проверьте подключение к сети.');
    } finally {
      setLoading(false);
    }
  }, [API_KEY]); 

  // --- useEffect для триггера поиска (ЗАПУСКАЕТСЯ ТОЛЬКО при изменении currentSearchTerm) ---
  useEffect(() => {
    // Не запускаем поиск, если строка пуста
    if (currentSearchTerm) {
        fetchMovies(currentSearchTerm);
        // Сохраняем в localStorage только успешный поисковый запрос
        localStorage.setItem('movieSearchQuery', currentSearchTerm);
    } else {
        setMovies([]);
        setError('');
        // Удаляем сохраненный запрос, если строка поиска пуста
        localStorage.removeItem('movieSearchQuery');
    }
  }, [currentSearchTerm, fetchMovies]);

  // --- useEffect для загрузки начального запроса при старте ---
  useEffect(() => {
    const savedQuery = localStorage.getItem('movieSearchQuery');
    if (savedQuery) {
        setSearchQuery(savedQuery); // Отображаем сохраненный запрос в поле
        setCurrentSearchTerm(savedQuery); // Инициируем поиск по сохраненному запросу
    }
  }, []);

  // --- Функции-обработчики ---
  
  const handleInputChange = (query) => {
    setSearchQuery(query); // Обновляем состояние поля ввода
  }
  
  // Функция для запуска поиска (вызывается кнопкой)
  const handleSearchSubmit = () => {
    setCurrentSearchTerm(searchQuery.trim()); // Передаем запрос для запуска useEffect
  }
  
  const handleSelectMovie = (id) => {
    setSelectedMovieId(id);
  }

  return (
    <div className="App">
      <header>
        <h1>🎬 КиноКаталог</h1>
        <SearchBar 
          onInputChange={handleInputChange} // Изменили имя пропса
          onSubmit={handleSearchSubmit}     // Новый пропс для кнопки
          currentQuery={searchQuery}
        />
      </header>

      <div className="main-content-wrapper">
        <main className="movie-list-container">
          {loading && <p className="message">Загрузка...</p>}
          
          {error && <p className="message error-message">{error}</p>}

          {!loading && !error && movies.length > 0 && (
            <MovieList 
              movies={movies} 
              onSelectMovie={handleSelectMovie}
            />
          )}
          
          {/* Сообщение показывается, если поиска не было или он пустой */}
          {!loading && !error && movies.length === 0 && currentSearchTerm.length === 0 && (
            <p className="message">Введите название фильма или сериала для начала поиска.</p>
          )}
        </main>
      </div>

      <MovieModal 
        movieId={selectedMovieId} 
        onClose={() => setSelectedMovieId(null)}
      />
    </div>
  );
};

export default App;
