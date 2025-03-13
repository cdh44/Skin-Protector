import React from 'react';
import ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';  // MUI 기본 스타일 우선순위 변경
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>  {/* CSS 파일 우선 적용 */}
      <App />
    </StyledEngineProvider>
  </React.StrictMode>
);

reportWebVitals();
