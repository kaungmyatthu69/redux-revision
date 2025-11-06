import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store/index.ts'

createRoot(document.getElementById("root")!).render(
  //if use StrictMode  , will render twice times in dev
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
