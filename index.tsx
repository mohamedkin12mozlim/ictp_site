
import React from 'react';
import ReactDOM from 'react-dom/client';
//import { HashRouter } from 'react-router-dom';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import { LanguageProvider } from './LanguageContext';
import { ThemeProvider } from './ThemeContext';
import { SpeedInsights } from '@vercel/speed-insights/next';


const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <App />
          <SpeedInsights />
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>
);
