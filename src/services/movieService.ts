import axios from 'axios';
import type { Movie } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3/search/movie';

const config = {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
};

interface MovieApiResponse {
  results: Movie[];
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get<MovieApiResponse>(BASE_URL, {
    ...config,
    params: {
      query,
      language: 'en-US',
      include_adult: false,
    },
  });

  return response.data.results;
};

