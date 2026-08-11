React Movies
A movie search app built with React, TypeScript, and Vite. It queries The Movie Database (TMDB) API for movies matching a keyword, paginates through the results, and lets you open any result in a modal for more details.

Live demo:

Features
Search movies by keyword via the TMDB API
Paginated results with React Paginate
Server state (fetching, caching, loading/error states) managed with TanStack Query
Responsive grid of movie posters
Modal with backdrop image, overview, release date, and rating
Toast notifications for empty searches and empty results
Tech stack
Vite + React + TypeScript
TanStack Query for data fetching and caching
React Paginate for pagination controls
Axios for HTTP requests
React Hot Toast for notifications
CSS Modules for styling
modern-normalize for cross-browser style resets
Getting started
npm install
Create a .env file in the project root with your TMDB API access token:

VITE_TMDB_TOKEN=your_tmdb_access_token
Then run the dev server:

npm run dev
Available scripts
npm run dev — start the development server
npm run build — type-check and build for production
npm run preview — preview the production build locally
npm run lint — run ESLint
npm run format — format the codebase with Prettier
Project structure
src/
components/ # one folder per component, each with its .tsx and .module.css
services/ # movieService.ts — TMDB API calls
types/ # shared TypeScript types (Movie, FetchMoviesResponse)
main.tsx # QueryClient / QueryClientProvider setup
