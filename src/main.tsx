// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

// Import global styles
import '@styles/base/reset.css';
import '@styles/theme/variables.css';
import '@styles/base/global.css';
import '@styles/tokens/typography.css';
import './styles/util-styling.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);