import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import { AppConstants } from './pages/Canvas/data/AppConstants';


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

createOrUpdateLink(`/themes/${AppConstants.primeReactDarkModeTheme}/theme.css`); 

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </React.StrictMode>
);
