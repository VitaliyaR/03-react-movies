import { useState } from 'react';
import toast from 'react-hot-toast';

import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../Grid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../Error/ErrorMessage';
import MovieModal from '../Modal/Modal';

import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null); // ✅ Стейт для модалки

  const handleSearch = async (query: string) => {
    setMovies([]);
    setError(false);
    setLoading(true);

    try {
      const results = await fetchMovies(query);

      if (results.length === 0) {
        toast.error('No movies found for your request.');
        return;
      }

      setMovies(results);
    } catch (err) {
      setError(true);
      toast.error('Oops! Something went wrong.');
      console.error('Помилка при запиті фільмів:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMovie = (movie: Movie) => {
    console.log('🎬 Обрано фільм:', movie);
    setSelectedMovie(movie); // ✅ Тепер відкриваємо модалку
  };

  const handleCloseModal = () => {
    setSelectedMovie(null); // ✅ Закриваємо модалку
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />

      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage />
      ) : (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </>
  );
}

export default App;

