import React from "react";
import ReactDOM, { Container } from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root") as Container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
