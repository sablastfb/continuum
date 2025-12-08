import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PrimeReactProvider } from 'primereact/api';


const themeLinkId = 'theme-link';
const createOrUpdateLink = (themePath: string) => {
  let link = document.getElementById(themeLinkId) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.id = themeLinkId;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  link.href = themePath;
};

createOrUpdateLink(`https://unpkg.com/primereact/resources/themes/lara-dark-blue/theme.css`); 

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </React.StrictMode>
);
