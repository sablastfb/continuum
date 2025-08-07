import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PrimeReactProvider } from "primereact/api";
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/vela-blue/theme.css'; // Dark blue theme

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <PrimeReactProvider value={{ unstyled: false, pt: {} }}>
      <App />
    </PrimeReactProvider>
  </React.StrictMode>
);
