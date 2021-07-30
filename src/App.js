import React, {useContext} from 'react'

import { BrowserRouter as Router , Route, Switch,Redirect } from 'react-router-dom';


import './Css/estilonav.css';

import CardBook from "./Components/CardBook";
import MisLoans from './Components/MisLoans';
import Login from './Components/Login';
import Register from './Components/Register';

import { CRMAuthContext } from './Context/AuthContext'
import { Provider } from './Context/Provider';
import { ProviderBook } from './Context/CheckStatus';
//categories quitar tambien



function App() {
 const { auth } = useContext(CRMAuthContext);
  return (
    <Router>
      <Provider>
        <ProviderBook>
          <Switch>
            <Route exact path="/bibliotecapublicam" component={CardBook} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/registrate" component={Register} />
            {!auth.auth ? (
              <Redirect to="/login" />
            ) : (
              <Route exact path="/loans" component={MisLoans} />
            )}
          </Switch>
        </ProviderBook>
      </Provider>
    </Router>
  );}

export default App;
