import axios, { AxiosResponse } from 'axios';
import { Movie } from '../types/movie';

const API_URL = 'https://api.themoviedb.org/3/search/movie';

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  if (!query.trim()) return [];

  try {
    const response: AxiosResponse<{ results: Movie[] }> = await axios.get(API_URL, {
      params: { query },
      headers: {
        Authorization: import.meta.env.VITE_TMDB_TOKEN,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error('Помилка при запиті фільмів:', error);
    return [];
  }
};
