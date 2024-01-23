import { BrowserRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { StrictMode } from 'react'
import { App } from './App'
import React from 'react'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)

reportWebVitals()
