import React from 'react';
import ReactDOM from 'react-dom';
import { AuthContext } from "./Context/AuthContext";
import { Provider } from "./Context/Provider";
import { ProviderBook } from "./Context/CheckStatus";
import './App.css';

import App from './App';
ReactDOM.render(
  <AuthContext>
    <Provider>
      <ProviderBook>
        <App />
      </ProviderBook>
    </Provider>
  </AuthContext>,
  document.getElementById("root")
);
