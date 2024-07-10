import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './tailwind.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import { DispatchProvider } from './utils/DispatchProvider';
import reducer from './redux/reducers';
import { initialState } from './utils/reducer';
import { StateProvider } from './utils/StateProvider';

const root = document.createElement("div")
root.className = "container"
document.body.appendChild(root)
const rootDiv = ReactDOM.createRoot(root);
rootDiv.render(
  <React.StrictMode>
    <Provider store={store}>
      <StateProvider initialState={initialState} reducer={reducer} >
        <DispatchProvider>
          <App />
        </DispatchProvider>
      </StateProvider>
    </Provider>
  </React.StrictMode>
);
