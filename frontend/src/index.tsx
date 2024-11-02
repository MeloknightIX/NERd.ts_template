import React from "react";
import ReactDOM, { Container } from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { DataProvider } from "./utils/DataContext";

ReactDOM.createRoot(document.getElementById("root") as Container).render(
  <React.StrictMode>
    <DataProvider>
      <App />
    </DataProvider>
  </React.StrictMode>
);

const serviceWorkerOptIn = false;

if (serviceWorkerOptIn && "serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./service-worker.js")
    .then(() => console.log("Service Worker: registered"))
    .catch(() => console.log("Service Worker: failed to register"));
}
