import React from "react";
import ReactDOM, { Container } from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { DataProvider } from "./components/DataContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as Container).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <DataProvider>
        <App />
      </DataProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

const serviceWorkerOptIn = false;

if (serviceWorkerOptIn && "serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./service-worker.js")
    .then(() => console.info("service worker: registered"))
    .catch(() => console.info("service worker: failed to register"));
}
