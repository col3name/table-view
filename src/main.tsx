import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

import App from './App'

import {StoreProvider} from "./app/stores";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <StoreProvider>
          <App />
      </StoreProvider>
  </StrictMode>,
)
