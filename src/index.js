import React from 'react';
import ReactDOM from 'react-dom';
import { AuthContext } from "./Context/AuthContext";
import './App.css';

import App from './App';
ReactDOM.render(
    <AuthContext>
     <App /> 
    </AuthContext>,
  document.getElementById("root")
);
