// src/components/SearchBar.jsx
import React from 'react';

// Изменили пропсы: onInputChange для ввода, onSubmit для кнопки
const SearchBar = ({ onInputChange, onSubmit, currentQuery }) => {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(); // Вызываем функцию поиска при отправке формы (Enter)
  };

  const handleChange = (e) => {
    onInputChange(e.target.value); // Обновляем состояние ввода в App.jsx
  }

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '800px' }}>
        <input
          type="text"
          className="search-bar-input"
          placeholder="Найти фильм, сериал..."
          value={currentQuery} 
          onChange={handleChange}
          style={{ flexGrow: 1, maxWidth: 'none' }} 
        />
        <button 
          type="submit" 
          className="search-button"
          // Кнопка тоже вызывает onSubmit
          style={{
            padding: '12px 25px',
            border: '2px solid var(--accent-color)',
            borderRadius: '25px',
            backgroundColor: 'var(--accent-color)',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '1em',
            transition: 'background-color 0.2s',
            flexShrink: 0
          }}
        >
          Поиск
        </button>
      </form>
    </div>
  );
};

export default SearchBar;