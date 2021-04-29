import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store'
import {ModalProvider} from './context/Modal'
import {UpdootProvider} from './context/updoot'

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <UpdootProvider>
      <ModalProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </ModalProvider>
    </UpdootProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
