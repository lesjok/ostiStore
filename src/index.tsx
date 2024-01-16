import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import reportWebVitals from './reportWebVitals';
import AppRouter from './router/AppRouter';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <Provider store={store}>
          <React.StrictMode>
              <AppRouter />
          </React.StrictMode>
      </Provider>
  </React.StrictMode>
);

reportWebVitals();
