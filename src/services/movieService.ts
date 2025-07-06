import axios from 'axios';
import type { Movie } from '../types/movie';

interface MovieApiResponse {
  results: Movie[];
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const url = 'https://api.themoviedb.org/3/search/movie';
  const token = import.meta.env.VITE_TMDB_TOKEN;

  const response = await axios.get<MovieApiResponse>(url, {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.results;
};

