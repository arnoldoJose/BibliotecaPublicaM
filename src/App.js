import React, {useContext} from 'react'

import { BrowserRouter as Router , Route, Switch,Redirect } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css";
import './Css/estilonav.css';

import { CRMAuthContext } from './Context/AuthContext'


import CardBook from "./Components/CardBook";
import MisLoans from './Components/MisLoans';
import Login from './Components/Login';
import Register from './Components/Register';

function App() {
 const { auth } = useContext(CRMAuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/BibliotecaPublicaM" component={CardBook} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/registrate" component={Register} />
        {!auth.auth ? (<Redirect to="/login" />) 
        : (<Route exact path="/loans" component={MisLoans} />)
        }
      </Switch>
    </Router>
  );}

export default App;
