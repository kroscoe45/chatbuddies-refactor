// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

// Import global styles
import './styles/reset.css';
import './styles/variables.css';
import './styles/global.css';
import './styles/typography.css';
import './styles/util-styling.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);