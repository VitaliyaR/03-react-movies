import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

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
      console.error('❌ Error while fetching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMovie = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} /> {/* ✅ Обов'язковий тостер */}
      <SearchBar onSubmit={handleSearch} /> {/* ✅ Не action, а onSubmit */}

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



