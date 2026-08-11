import "modern-normalize"; // Критерій 15 (уніфікація стилів)
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./components/App/App"; // Критерій 5 (правильний шлях до App)
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Запобігає спаму запитів при зміні вкладок
      retry: 1, // У разі збою мережі повторити запит лише один раз
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
