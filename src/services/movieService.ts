import axios from 'axios';
import type { Movie } from '../types/movie';

const BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface FetchMoviesResponse {
    results: Movie[];
    page: number;
    total_pages: number;
    total_results: number;
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
    const response = await axios.get<FetchMoviesResponse>(`${BASE_URL}/search/movie`, {
        params: {
            query,
        },
        headers: {
            Authorization: `Bearer ${TMDB_TOKEN}`,
        },
    });

    return response.data.results;
};