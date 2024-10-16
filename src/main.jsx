import React from 'react';
import { createRoot } from 'react-dom/client';
import 'remixicon/fonts/remixicon.css';
import App from './App';
import './i18n';
import './styles/index.css';
import 'flowbite';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
