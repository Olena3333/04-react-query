import axios from 'axios';
import type { FetchMoviesResponse } from '../types/movie';

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = 'https://themoviedb.org';

const movieInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TMDB_TOKEN}`,
    Accept: 'application/json',
  },
});

interface FetchMoviesParams {
  query: string;
  page: number;
}


export const fetchMovies = async ({ query, page }: FetchMoviesParams): Promise<FetchMoviesResponse> => {
  const response = await movieInstance.get<FetchMoviesResponse>('/search/movie', {
    params: {
      query,
      page,
      include_adult: false,
      language: 'en-US',
    },
  });
  return response.data;
};