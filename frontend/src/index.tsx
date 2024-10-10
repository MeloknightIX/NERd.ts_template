import React from "react";
import ReactDOM, { Container } from "react-dom/client";
import "./styles/index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as Container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./service-worker.js")
    .then(() => console.log("Service Worker: registered"))
    .catch(() => console.log("Service Worker: failed to register"));
}
