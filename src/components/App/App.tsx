import { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import ReactPaginateImport from "react-paginate";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import css from "./App.module.css";

// Нормалізація дефолтного експорту react-paginate для різних режимів збірки Vite
const ReactPaginate =
  (ReactPaginateImport as unknown as { default?: typeof ReactPaginateImport })
    .default ?? ReactPaginateImport;

export default function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // Логіка запитів через хуки TanStack Query
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["movies", query, page],
    queryFn: () => fetchMovies({ query, page }),
    enabled: query.trim() !== "",
    placeholderData: keepPreviousData,
  });

  // Тост-сповіщення при порожньому результаті. Залежності виправлені!
  useEffect(() => {
    if (isSuccess && data?.results.length === 0 && query !== "") {
      toast.error("No movies found for your request.");
    }
  }, [isSuccess, data, query]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1); // При новому пошуку повертаємося на першу сторінку
  };

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const movies = data?.results ?? [];
  const totalPages = data ? Math.min(data.total_pages, 500) : 0; // Обмеження серверу TMDB

  return (
    <div className={css.app}>
      <Toaster position="top-center" />
      <SearchBar onSubmit={handleSearch} />

      <main className={css.main}>
        {isLoading && <Loader />}

        {isError && <ErrorMessage />}

        {!isLoading && !isError && movies.length > 0 && (
          <MovieGrid movies={movies} onSelect={handleSelect} />
        )}

        {/* Пагінація має рендеритися лише тоді, коли кількість сторінок більша ніж 1 */}
        {!isLoading && !isError && totalPages > 1 && (
          <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={({ selected }) => {
              setPage(selected + 1);
              window.scrollTo({ top: 0, behavior: "smooth" }); // Покращення UX
            }}
            forcePage={page - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
            nextLabel="→"
            previousLabel="←"
          />
        )}
      </main>

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}
