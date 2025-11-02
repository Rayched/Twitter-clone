import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { StrictMode } from 'react';
import "./styles/global.css"

const Root = createRoot(
  document.getElementById("root") as HTMLDivElement
);

Root.render(
  <StrictMode>
    <App />
  </StrictMode>
);