import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import EmailProvider from "./context/EmailContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <EmailProvider>
      <App />
    </EmailProvider>
  </BrowserRouter>
);
